import * as _ from 'lodash';

interface IBuilderAppConfig {
  name: string;
  repository: string;
  imageStreamTag: any;
}

export class BuilderAppService {
  public makeAPIObjects(config: IBuilderAppConfig) {
    let ports = this.getPorts(config.imageStreamTag);
    let firstPort = _.first(ports);

    return [
      this.makeImageStream(config),
      this.makeBuildConfig(config),
      this.makeDeploymentConfig(config, ports),
      this.makeService(config, firstPort),
      this.makeRoute(config, firstPort)
    ];
  }

  public getPorts(imageStreamTag: any) {
    let image = imageStreamTag.image;
    let portSpec = _.get(image, 'dockerImageMetadata.Config.ExposedPorts') ||
                   _.get(image, 'dockerImageMetadata.ContainerConfig.ExposedPorts', []);
    return this.parsePortsFromSpec(portSpec);
  }

  // Map image ports to k8s structure.
  private parsePortsFromSpec(portSpec: any) {
    let ports = [];
    _.each(portSpec, function(value: any, key: string){
      let parts = key.split("/");
      if (parts.length === 1) {
        parts.push("tcp");
      }

      let containerPort = parseInt(parts[0], 10);
      if (isNaN(containerPort)) {
        this.Logger.warn("Container port " + parts[0] + " is not a number");
      } else {
        ports.push({
          containerPort: containerPort,
          protocol: parts[1].toUpperCase()
        });
      }
    });

    return ports;
  }

  private getAnnotations() {
    return {
      "openshift.io/generated-by": "OpenShiftWebConsole"
    };
  }

  private getLabels(config: IBuilderAppConfig) {
    return {
      app: config.name
    };
  }

  private getPortName(port: any) {
    // Use the same naming convention as the CLI.
    return (port.containerPort + '-' + port.protocol).toLowerCase();
  }

  private makeRoute(config: IBuilderAppConfig, port: any) {
    return {
      kind: "Route",
      apiVersion: "v1",
      metadata: {
        name: config.name,
        labels: this.getLabels(config),
        annotations: this.getAnnotations()
      },
      spec: {
        to: {
          kind: "Service",
          name: config.name
        },
        // The service created by `makeService` uses the same port as the container port.
        port: {
          // Use the port name, not the number for targetPort. The router looks
          // at endpoints, not services, when resolving ports, so port numbers
          // will not resolve correctly if the service port and container port
          // numbers don't match.
          targetPort: this.getPortName(port)
        },
        wildcardPolicy: 'None'
      }
    };
  }

  private makeService(config: IBuilderAppConfig, port: any) {
    return {
      kind: "Service",
      apiVersion: "v1",
      metadata: {
        name: config.name,
        labels: this.getLabels(config),
        annotations: this.getAnnotations()
      },
      spec: {
        selector: {
          deploymentconfig: config.name
        },
        ports: [{
          port: port.containerPort,
          targetPort: port.containerPort,
          protocol: port.protocol,
          name: this.getPortName(port)
        }]
      }
    };
  }

  private makeDeploymentConfig(config: IBuilderAppConfig, ports: any[]) {
    return {
      apiVersion: "v1",
      kind: "DeploymentConfig",
      metadata: {
        name: config.name,
        labels: this.getLabels(config),
        annotations: this.getAnnotations()
      },
      spec: {
        replicas: 1,
        selector: {
          deploymentconfig: config.name
        },
        triggers: [{
          type: "ImageChange",
          imageChangeParams: {
            automatic: true,
            containerNames: [
              config.name
            ],
            from: {
              kind: "ImageStreamTag",
              name: config.name + ":latest"
            }
          }
        }, {
          type: "ConfigChange"
        }],
        template: {
          metadata: {
            labels: _.assign({
              deploymentconfig: config.name
            }, this.getLabels(config))
          },
          spec: {
            containers: [{
              name: config.name,
              image: config.name + ":latest",
              ports: ports,
              env: []
            }]
          }
        }
      }
    };
  }

  private makeBuildConfig(config: IBuilderAppConfig) {
    return {
      apiVersion: "v1",
      kind: "BuildConfig",
      metadata: {
        name: config.name,
        labels: this.getLabels(config),
        annotations: this.getAnnotations()
      },
      spec: {
        output: {
          to: {
            kind: "ImageStreamTag",
            name: config.name + ":latest"
          }
        },
        source: {
          git: {
            ref: "master",
            uri: config.repository
          },
          type: "Git"
        },
        strategy: {
          type: "Source",
          sourceStrategy: {
            from: {
              kind: "ImageStreamTag",
              name: config.imageStreamTag.metadata.name,
              namespace: config.imageStreamTag.metadata.namespace
            },
            env: []
          }
        },
        // TODO: Add webhooks, need to generate secret.
        triggers: [{
          type: "ImageChange",
          imageChange: {}
        }, {
          type: "ConfigChange"
        }]
      }
    };
  }

  private makeImageStream(config: IBuilderAppConfig) {
    return {
      apiVersion: "v1",
      kind: "ImageStream",
      metadata: {
        name: config.name,
        labels: this.getLabels(config),
        annotations: this.getAnnotations()
      }
    };
  }
}
