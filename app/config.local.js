window.OPENSHIFT_CONFIG = {
apis: {
  hostPort: "10.0.0.25:8443",
  prefix: "/apis"
},
api: {
  openshift: {
    hostPort: "10.0.0.25:8443",
    prefix: "/oapi"
  },
  k8s: {
    hostPort: "10.0.0.25:8443",
    prefix: "/api"
  }
},
  additionalServers: [{
    protocol: "https",
    hostPort: "apiserver-svc-cat-2.10.0.0.25.xip.io:6443",
    prefix: "/apis"
  }],
auth: {
  oauth_authorize_uri: "https://10.0.0.25:8443/oauth/authorize",
  oauth_redirect_base: "https://localhost:9000/",
  oauth_client_id: "openshift-web-console",
  logout_uri: ""
},
loggingURL: "",
metricsURL: "https://metrics-openshift-infra.10.245.2.2.xip.io/hawkular/metrics"
};

window.OPENSHIFT_VERSION = {
openshift: "dev-mode",
kubernetes: "dev-mode"
};

window.MOCK_ORIGIN_SERVICES = false;
window.MOCK_SERVICES_DATA = true;
