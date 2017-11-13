export const servicesData = {
  "test-serviceclass-java": {
    kind: 'ClusterServiceClass',
    metadata: {
      name: "test-serviceclass-java-nodejs",
      uid: "1"
    },
    spec: {
      bindable: true,
      description: 'BUILDS SOURCE CODE',
      tags: ['java', 'nodejs'],
      externalMetadata: {
        displayName: 'Test ServiceClass Java-Node.js',
        longDescription: 'Build and run Java applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
        documentationUrl: 'https://github.com/openshift/source-to-image',
        supportUrl: 'https://github.com/openshift/source-to-image',
        providerDisplayName: "Vendor A"
      }
    }
  },
  "test-serviceclass-nodejs": {
    kind: 'ClusterServiceClass',
    metadata: {
      name: "test-serviceclass-nodejs",
      uid: "2"
    },
    spec: {
      bindable: true,
      description: 'BUILDS SOURCE CODE',
      tags: ['nodejs'],
      externalMetadata: {
        displayName: 'Test ServiceClass Node.js',
        longDescription: 'run nodejs applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
        providerDisplayName: "Vendor A"
      }
    }
  },
  "test-serviceclass-perl": {
    kind: 'ClusterServiceClass',
    metadata: {
      name: "test-serviceclass-perl",
      uid: "3"
    },
    spec: {
      bindable: true,
      description: 'BUILDS SOURCE CODE',
      tags: ['perl'],
      externalMetadata: {
        displayName: 'Test ServiceClass Perl',
        longDescription: 'run Perl applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
        providerDisplayName: "Vendor B"
      }
    }
  },
  "test-serviceclass-ruby": {
    kind: 'ClusterServiceClass',
    metadata: {
      name: "test-serviceclass-ruby-mongo",
      uid: "4"
    },
    spec: {
      bindable: true,
      description: 'BUILDS SOURCE CODE',
      tags: ['ruby', 'mongodb'],
      externalMetadata: {
        displayName: 'Test ServiceClass Ruby-Mongo',
        longDescription: 'run ruby applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
        providerDisplayName: "Vendor C"
      }
    }
  },
  "test-serviceclass-php": {
    kind: 'ClusterServiceClass',
    metadata: {
      name: "test-serviceclass-php",
      uid: "5"
    },
    spec: {
      bindable: true,
      description: 'BUILDS SOURCE CODE',
      tags: ['php'],
      externalMetadata: {
        displayName: 'Test ServiceClass PHP',
        longDescription: 'run PHP applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
        providerDisplayName: "Vendor C"
      }
    }
  },
  "test-serviceclass-mongo": {
    kind: 'ClusterServiceClass',
    metadata: {
      name: "test-serviceclass-mongo",
      uid: "6"
    },
    spec: {
      bindable: true,
      description: 'BUILDS SOURCE CODE',
      tags: ['mongodb'],
      externalMetadata: {
        displayName: 'Test ServiceClass MongoDB',
        longDescription: 'run MongoDB applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
        providerDisplayName: "Vendor B, Inc"
      }
    }
  },
  "test-serviceclass-mysql": {
    kind: 'ClusterServiceClass',
    metadata: {
      name: "test-serviceclass-mysql",
      uid: "7"
    },
    spec: {
      bindable: true,
      description: 'BUILDS SOURCE CODE',
      tags: ['mysql'],
      externalMetadata: {
        displayName: 'Test ServiceClass MySQL',
        longDescription: 'run MongoDB applications. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
        providerDisplayName: "Vendor B, Co."
      }
    }
  },
  "test-serviceclass-other": {
    kind: 'ClusterServiceClass',
    metadata: {
      name: "40c9e163-bffe-11e7-a324-f2cad19b6969",
      uid: "8",
    },
    spec: {
      bindable: true,
      description: 'BUILDS SOURCE CODE',
      tags: ['fooBar'],
      // Test that we correctly fall back to external name when no display name.
      externalName: 'test-service-class-other',
      externalMetadata: {
        longDescription: 'some other service',
        'console.openshift.io/iconClass': 'fa fa-question'
      }
    }
  },
  "test-serviceclass-jenkins": {
    kind: 'ClusterServiceClass',
    metadata: {
      name: "test-serviceclass-jenkins",
      uid: "9"
    },
    spec: {
      bindable: true,
      description: 'BUILDS SOURCE CODE',
      tags: ['jenkins'],
      externalMetadata: {
        displayName: 'Test ServiceClass jenkins',
        longDescription: 'some other service',
        providerDisplayName: "Vendor C"
      }
    }
  },
  "test-serviceclass-pg-apb": {
    kind: 'ClusterServiceClass',
    metadata: {
      name: "test-serviceclass-pg-apb",
      uid: "10",
    },
    spec: {
      bindable: true,
      description: 'TEST APB SERVICE',
      tags: ['databases', 'postgresql'],
      externalMetadata: {
        displayName: 'Test ServiceClass PostgreSQL DB APB',
        longDescription: 'A sample APB which deploys a PostgreSQL Database',
      }
    }
  },
  "test-serviceclass-hidden": {
    kind: 'ServiceClass',
    metadata: {
      name: "test-serviceclass-hidden",
      uid: "11",
    },
    spec: {
      bindable: true,
      description: 'THIS SERVICE SHOULD NOT SHOW UP IN THE UI.',
      tags: ['databases', 'postgresql', 'hidden'],
      externalMetadata: {
        displayName: 'THIS SERVICE SHOULD NOT SHOW UP IN THE UI',
        longDescription: 'It has the `hidden` tag, which means it should not be displayed.',
      }
    }
  },
  "test-serviceclass-removed": {
    kind: 'ServiceClass',
    metadata: {
      name: "test-serviceclass-removed",
      uid: "12",
    },
    spec: {
      bindable: true,
      description: 'THIS SERVICE SHOULD NOT SHOW UP IN THE UI.',
      tags: ['databases', 'postgresql'],
      externalMetadata: {
        displayName: 'THIS SERVICE SHOULD NOT SHOW UP IN THE UI',
        longDescription: 'It has the `status.removedFromBrokerCatalog` and should not be displayed.',
      }
    },
    status: {
      // This should not appear in the UI
      removedFromBrokerCatalog: true
    }
  }
};
