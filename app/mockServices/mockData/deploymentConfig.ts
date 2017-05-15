export const deploymentConfigData = [
  {
    "metadata": {
      "name": "mongodb",
      "namespace": "ups-test",
      "selfLink": "/oapi/v1/namespaces/ups-test/deploymentconfigs/mongodb",
      "uid": "f71f3b60-3979-11e7-b7b1-daa75955eb53",
      "resourceVersion": "4910",
      "generation": 2,
      "creationTimestamp": "2017-05-15T14:22:45Z",
      "labels": {
        "app": "nodejs-mongodb-example",
        "template": "nodejs-mongodb-example"
      },
      "annotations": {
        "description": "Defines how to deploy the database"
      }
    },
    "spec": {
      "strategy": {
        "type": "Recreate",
        "recreateParams": {
          "timeoutSeconds": 600
        },
        "resources": {},
        "activeDeadlineSeconds": 21600
      },
      "triggers": [
        {
          "type": "ImageChange",
          "imageChangeParams": {
            "automatic": true,
            "containerNames": [
              "mongodb"
            ],
            "from": {
              "kind": "ImageStreamTag",
              "namespace": "openshift",
              "name": "mongodb:3.2"
            },
            "lastTriggeredImage": "centos/mongodb-32-centos7@sha256:127b30d743a2799d9934a08ab09afa44c444b36940c8cfc05703175ccf0ed37b"
          }
        },
        {
          "type": "ConfigChange"
        }
      ],
      "replicas": 1,
      "test": false,
      "selector": {
        "name": "mongodb"
      },
      "template": {
        "metadata": {
          "name": "mongodb",
          "creationTimestamp": null,
          "labels": {
            "name": "mongodb"
          }
        },
        "spec": {
          "volumes": [
            {
              "name": "mongodb-data",
              "emptyDir": {}
            }
          ],
          "containers": [
            {
              "name": "mongodb",
              "image": "centos/mongodb-32-centos7@sha256:127b30d743a2799d9934a08ab09afa44c444b36940c8cfc05703175ccf0ed37b",
              "ports": [
                {
                  "containerPort": 27017,
                  "protocol": "TCP"
                }
              ],
              "env": [
                {
                  "name": "MONGODB_USER",
                  "value": "userLJ1"
                },
                {
                  "name": "MONGODB_PASSWORD",
                  "value": "NHYpP23CdlCnFmCt"
                },
                {
                  "name": "MONGODB_DATABASE",
                  "value": "sampledb"
                },
                {
                  "name": "MONGODB_ADMIN_PASSWORD",
                  "value": "gnVrwa5aPI0Ca2Bw"
                }
              ],
              "resources": {
                "limits": {
                  "memory": "512Mi"
                }
              },
              "volumeMounts": [
                {
                  "name": "mongodb-data",
                  "mountPath": "/var/lib/mongodb/data"
                }
              ],
              "livenessProbe": {
                "tcpSocket": {
                  "port": 27017
                },
                "initialDelaySeconds": 30,
                "timeoutSeconds": 1,
                "periodSeconds": 10,
                "successThreshold": 1,
                "failureThreshold": 3
              },
              "readinessProbe": {
                "exec": {
                  "command": [
                    "/bin/sh",
                    "-i",
                    "-c",
                    "mongo 127.0.0.1:27017/$MONGODB_DATABASE -u $MONGODB_USER -p $MONGODB_PASSWORD --eval=\"quit()\""
                  ]
                },
                "initialDelaySeconds": 3,
                "timeoutSeconds": 1,
                "periodSeconds": 10,
                "successThreshold": 1,
                "failureThreshold": 3
              },
              "terminationMessagePath": "/dev/termination-log",
              "imagePullPolicy": "IfNotPresent"
            }
          ],
          "restartPolicy": "Always",
          "terminationGracePeriodSeconds": 30,
          "dnsPolicy": "ClusterFirst",
          "securityContext": {}
        }
      }
    },
    "status": {
      "latestVersion": 1,
      "observedGeneration": 2,
      "replicas": 1,
      "updatedReplicas": 1,
      "availableReplicas": 1,
      "unavailableReplicas": 0,
      "details": {
        "message": "image change",
        "causes": [
          {
            "type": "ImageChange",
            "imageTrigger": {
              "from": {
                "kind": "ImageStreamTag",
                "namespace": "openshift",
                "name": "mongodb:3.2"
              }
            }
          }
        ]
      },
      "conditions": [
        {
          "type": "Available",
          "status": "True",
          "lastUpdateTime": "2017-05-15T14:22:55Z",
          "lastTransitionTime": "2017-05-15T14:22:55Z",
          "message": "Deployment config has minimum availability."
        },
        {
          "type": "Progressing",
          "status": "True",
          "lastUpdateTime": "2017-05-15T14:22:56Z",
          "lastTransitionTime": "2017-05-15T14:22:47Z",
          "reason": "NewReplicationControllerAvailable",
          "message": "replication controller \"mongodb-1\" successfully rolled out"
        }
      ],
      "readyReplicas": 1
    },
    "kind": "DeploymentConfig",
    "apiVersion": "v1"
  },
  {
    "metadata": {
      "name": "my-proj-b",
      "namespace": "ups-test",
      "selfLink": "/oapi/v1/namespaces/ups-test/deploymentconfigs/my-proj-b",
      "uid": "945b21b8-397f-11e7-b7b1-daa75955eb53",
      "resourceVersion": "5624",
      "generation": 2,
      "creationTimestamp": "2017-05-15T15:02:57Z",
      "labels": {
        "app": "my-proj-b"
      },
      "annotations": {
        "openshift.io/generated-by": "OpenShiftWebConsole"
      }
    },
    "spec": {
      "strategy": {
        "type": "Rolling",
        "rollingParams": {
          "updatePeriodSeconds": 1,
          "intervalSeconds": 1,
          "timeoutSeconds": 600,
          "maxUnavailable": "25%",
          "maxSurge": "25%"
        },
        "resources": {},
        "activeDeadlineSeconds": 21600
      },
      "triggers": [
        {
          "type": "ImageChange",
          "imageChangeParams": {
            "automatic": true,
            "containerNames": [
              "my-proj-b"
            ],
            "from": {
              "kind": "ImageStreamTag",
              "namespace": "ups-test",
              "name": "my-proj-b:latest"
            },
            "lastTriggeredImage": "172.30.26.18:5000/ups-test/my-proj-b@sha256:97709ddc94c357a6bb76bdc597001e351d28a36164188290cac6448e19b38edd"
          }
        },
        {
          "type": "ConfigChange"
        }
      ],
      "replicas": 1,
      "test": false,
      "selector": {
        "deploymentconfig": "my-proj-b"
      },
      "template": {
        "metadata": {
          "creationTimestamp": null,
          "labels": {
            "app": "my-proj-b",
            "deploymentconfig": "my-proj-b"
          }
        },
        "spec": {
          "containers": [
            {
              "name": "my-proj-b",
              "image": "172.30.26.18:5000/ups-test/my-proj-b@sha256:97709ddc94c357a6bb76bdc597001e351d28a36164188290cac6448e19b38edd",
              "ports": [
                {
                  "containerPort": 8080,
                  "protocol": "TCP"
                }
              ],
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "imagePullPolicy": "Always"
            }
          ],
          "restartPolicy": "Always",
          "terminationGracePeriodSeconds": 30,
          "dnsPolicy": "ClusterFirst",
          "securityContext": {}
        }
      }
    },
    "status": {
      "latestVersion": 1,
      "observedGeneration": 2,
      "replicas": 1,
      "updatedReplicas": 1,
      "availableReplicas": 1,
      "unavailableReplicas": 0,
      "details": {
        "message": "image change",
        "causes": [
          {
            "type": "ImageChange",
            "imageTrigger": {
              "from": {
                "kind": "ImageStreamTag",
                "namespace": "ups-test",
                "name": "my-proj-b:latest"
              }
            }
          }
        ]
      },
      "conditions": [
        {
          "type": "Available",
          "status": "True",
          "lastUpdateTime": "2017-05-15T15:04:05Z",
          "lastTransitionTime": "2017-05-15T15:04:05Z",
          "message": "Deployment config has minimum availability."
        },
        {
          "type": "Progressing",
          "status": "True",
          "lastUpdateTime": "2017-05-15T15:04:06Z",
          "lastTransitionTime": "2017-05-15T15:04:06Z",
          "reason": "NewReplicationControllerAvailable",
          "message": "replication controller \"my-proj-b-1\" successfully rolled out"
        }
      ],
      "readyReplicas": 1
    },
    "kind": "DeploymentConfig",
    "apiVersion": "v1"
  },
  {
    "metadata": {
      "name": "nodejs-mongodb-example",
      "namespace": "ups-test",
      "selfLink": "/oapi/v1/namespaces/ups-test/deploymentconfigs/nodejs-mongodb-example",
      "uid": "f71f1456-3979-11e7-b7b1-daa75955eb53",
      "resourceVersion": "4969",
      "generation": 2,
      "creationTimestamp": "2017-05-15T14:22:45Z",
      "labels": {
        "app": "nodejs-mongodb-example",
        "template": "nodejs-mongodb-example"
      },
      "annotations": {
        "description": "Defines how to deploy the application server"
      }
    },
    "spec": {
      "strategy": {
        "type": "Rolling",
        "rollingParams": {
          "updatePeriodSeconds": 1,
          "intervalSeconds": 1,
          "timeoutSeconds": 600,
          "maxUnavailable": "25%",
          "maxSurge": "25%"
        },
        "resources": {},
        "activeDeadlineSeconds": 21600
      },
      "triggers": [
        {
          "type": "ImageChange",
          "imageChangeParams": {
            "automatic": true,
            "containerNames": [
              "nodejs-mongodb-example"
            ],
            "from": {
              "kind": "ImageStreamTag",
              "namespace": "ups-test",
              "name": "nodejs-mongodb-example:latest"
            },
            "lastTriggeredImage": "172.30.26.18:5000/ups-test/nodejs-mongodb-example@sha256:3630db3b6901acd01d20a73f14206ff07bddfb0892bdfceeff554510f47873d5"
          }
        },
        {
          "type": "ConfigChange"
        }
      ],
      "replicas": 1,
      "test": false,
      "selector": {
        "name": "nodejs-mongodb-example"
      },
      "template": {
        "metadata": {
          "name": "nodejs-mongodb-example",
          "creationTimestamp": null,
          "labels": {
            "name": "nodejs-mongodb-example"
          }
        },
        "spec": {
          "containers": [
            {
              "name": "nodejs-mongodb-example",
              "image": "172.30.26.18:5000/ups-test/nodejs-mongodb-example@sha256:3630db3b6901acd01d20a73f14206ff07bddfb0892bdfceeff554510f47873d5",
              "ports": [
                {
                  "containerPort": 8080,
                  "protocol": "TCP"
                }
              ],
              "env": [
                {
                  "name": "DATABASE_SERVICE_NAME",
                  "value": "mongodb"
                },
                {
                  "name": "MONGODB_USER",
                  "value": "userLJ1"
                },
                {
                  "name": "MONGODB_PASSWORD",
                  "value": "NHYpP23CdlCnFmCt"
                },
                {
                  "name": "MONGODB_DATABASE",
                  "value": "sampledb"
                },
                {
                  "name": "MONGODB_ADMIN_PASSWORD",
                  "value": "gnVrwa5aPI0Ca2Bw"
                }
              ],
              "resources": {
                "limits": {
                  "memory": "512Mi"
                }
              },
              "livenessProbe": {
                "httpGet": {
                  "path": "/pagecount",
                  "port": 8080,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 30,
                "timeoutSeconds": 3,
                "periodSeconds": 10,
                "successThreshold": 1,
                "failureThreshold": 3
              },
              "readinessProbe": {
                "httpGet": {
                  "path": "/pagecount",
                  "port": 8080,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 3,
                "timeoutSeconds": 3,
                "periodSeconds": 10,
                "successThreshold": 1,
                "failureThreshold": 3
              },
              "terminationMessagePath": "/dev/termination-log",
              "imagePullPolicy": "IfNotPresent"
            }
          ],
          "restartPolicy": "Always",
          "terminationGracePeriodSeconds": 30,
          "dnsPolicy": "ClusterFirst",
          "securityContext": {}
        }
      }
    },
    "status": {
      "latestVersion": 1,
      "observedGeneration": 2,
      "replicas": 1,
      "updatedReplicas": 1,
      "availableReplicas": 1,
      "unavailableReplicas": 0,
      "details": {
        "message": "image change",
        "causes": [
          {
            "type": "ImageChange",
            "imageTrigger": {
              "from": {
                "kind": "ImageStreamTag",
                "namespace": "ups-test",
                "name": "nodejs-mongodb-example:latest"
              }
            }
          }
        ]
      },
      "conditions": [
        {
          "type": "Available",
          "status": "True",
          "lastUpdateTime": "2017-05-15T14:23:42Z",
          "lastTransitionTime": "2017-05-15T14:23:42Z",
          "message": "Deployment config has minimum availability."
        },
        {
          "type": "Progressing",
          "status": "True",
          "lastUpdateTime": "2017-05-15T14:23:44Z",
          "lastTransitionTime": "2017-05-15T14:23:37Z",
          "reason": "NewReplicationControllerAvailable",
          "message": "replication controller \"nodejs-mongodb-example-1\" successfully rolled out"
        }
      ],
      "readyReplicas": 1
    },
    "kind": "DeploymentConfig",
    "apiVersion": "v1"
  }
];
