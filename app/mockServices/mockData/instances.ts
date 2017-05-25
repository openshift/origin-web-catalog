export const instanceData = [{
  "metadata": {
    "name": "user-provided-service-vd9np",
    "generateName": "user-provided-service-",
    "namespace": "node-test",
    "selfLink": "/apis/servicecatalog.k8s.io/v1alpha1/namespaces/node-test/instances/user-provided-service-vd9np",
    "uid": "5f6198bb-409d-11e7-828d-0242ac11000d",
    "resourceVersion": "271",
    "creationTimestamp": "2017-05-24T16:23:51Z",
    "finalizers": [
      "kubernetes"
    ]
  },
  "spec": {
    "serviceClassName": "user-provided-service",
    "planName": "default",
    "osbGuid": "0ca410ef-631e-44d3-8e47-95d1062ee02d",
    "checksum": "762ee664f0c71e621d8fef5487f615afbdd2bd080443984b1c64d6d956eaf0b5"
  },
  "status": {
    "conditions": [
      {
        "type": "Ready",
        "status": "True",
        "lastTransitionTime": "2017-05-24T16:23:51Z",
        "reason": "ProvisionedSuccessfully",
        "message": "The instance was provisioned successfully"
      }
    ]
  }
}];
