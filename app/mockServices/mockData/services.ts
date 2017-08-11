export const servicesData = {
  "test-serviceclass-java": {
    kind: 'ServiceClass',
    "metadata": {
      "name": "test-serviceclass-java-nodejs",
      "uid": "1",
      "providerDisplayName": "Vendor A"
    },
    bindable: true,
    description: 'BUILDS SOURCE CODE',
    alphaTags: ['java', 'nodejs'],
    externalMetadata: {
      displayName: 'Test ServiceClass Java-Node.js',
      longDescription: 'Build and run Java applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
      documentationUrl: 'https://github.com/openshift/source-to-image'
    },
    plans: [
      {
        name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three'],
        bindable: true,
        alphaInstanceCreateParameterSchema: {
          "$schema": "http://json-schema.org/draft-04/schema",
          "type": "object",
          "title": "Parameters",
          "properties": {
            "name": {
              "title": "Queue Name",
              "type": "string",
              "maxLength": 63,
              "default": "My Queue"
            },
            "email": {
              "title": "Email",
              "type": "string",
              "pattern": "^\\S+@\\S+$",
              "description": "Email address for alerts."
            },
            "protocol": {
              "title": "Protocol",
              "type": "string",
              "default": "Java Message Service (JMS) 1.1",
              "enum": [
                "Java Message Service (JMS) 1.1",
                "Transmission Control Protocol (TCP)",
                "Advanced Message Queuing Protocol (AMQP) 1.0"
              ]
            },
            "secure": {
              "title": "Enable security",
              "type": "boolean",
              "default": true
            }
          },
          "required": [
            "name",
            "protocol"
          ]
        }
      },
      {name: 'rh-ded-queue', osbGuid: '2', displayName: 'Red Hat - Dedicated - Queue', description: '$.65 / 1 Million messages', bullets: ['Four', 'Five', 'Six']},
      {name: 'rh-shared-topic', osbGuid: '3', displayName: 'Red Hat - Shared - Topic', description: '$.60 / 1 Million messages', bullets: ['One', 'Two', 'Three']},
      {name: 'rh-shared-queue', osbGuid: '4', displayName: 'Red Hat - Shared - Queue', description: '$.60 / 1 Million messages', bullets: ['Four', 'Five', 'Six']},
      {name: 'self-ded-topic', osbGuid: '5', displayName: 'Red Hat - Shared - Queue', description: '$12 / instance', bullets: ['One', 'Two', 'Three']},
      {name: 'self-ded-queue', osbGuid: '6', displayName: 'Red Hat - Shared - Queue', description: '$12 / instance', bullets: ['Four', 'Five', 'Six']}
    ]
  },
  "test-serviceclass-nodejs": {
    kind: 'ServiceClass',
    "metadata": {
      "name": "test-serviceclass-nodejs",
      "uid": "2",
      "providerDisplayName": "Vendor A"
    },
    bindable: true,
    description: 'BUILDS SOURCE CODE',
    alphaTags: ['nodejs'],
    externalMetadata: {
      displayName: 'Test ServiceClass Node.js',
      longDescription: 'run nodejs applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-perl": {
    kind: 'ServiceClass',
    "metadata": {
      "name": "test-serviceclass-perl",
      "uid": "3",
      "providerDisplayName": "Vendor B"
    },
    bindable: true,
    description: 'BUILDS SOURCE CODE',
    alphaTags: ['perl'],
    externalMetadata: {
      displayName: 'Test ServiceClass Perl',
      longDescription: 'run Perl applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-ruby": {
    kind: 'ServiceClass',
    "metadata": {
      "name": "test-serviceclass-ruby-mongo",
      "uid": "4",
      "providerDisplayName": "Vendor C"
    },
    bindable: true,
    description: 'BUILDS SOURCE CODE',
    alphaTags: ['ruby', 'mongodb'],
    externalMetadata: {
      displayName: 'Test ServiceClass Ruby-Mongo',
      longDescription: 'run ruby applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-php": {
    kind: 'ServiceClass',
    "metadata": {
      "name": "test-serviceclass-php",
      "uid": "5",
      "providerDisplayName": "Vendor C"
    },
    bindable: true,
    description: 'BUILDS SOURCE CODE',
    alphaTags: ['php'],
    externalMetadata: {
      displayName: 'Test ServiceClass PHP',
      longDescription: 'run PHP applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-mongo": {
    kind: 'ServiceClass',
    "metadata": {
      "name": "test-serviceclass-mongo",
      "uid": "6",
      "providerDisplayName": "Vendor B"
    },
    bindable: true,
    description: 'BUILDS SOURCE CODE',
    alphaTags: ['mongodb'],
    externalMetadata: {
      displayName: 'Test ServiceClass MongoDB',
      longDescription: 'run MongoDB applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-mysql": {
    kind: 'ServiceClass',
    "metadata": {
      "name": "test-serviceclass-mysql",
      "uid": "7",
      "providerDisplayName": "Vendor B"
    },
    bindable: true,
    description: 'BUILDS SOURCE CODE',
    alphaTags: ['mysql'],
    externalMetadata: {
      displayName: 'Test ServiceClass mySQL',
      longDescription: 'run MongoDB applications. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-other": {
    kind: 'ServiceClass',
    "metadata": {
      "name": "test-serviceclass-other",
      "uid": "8",
    },
    bindable: true,
    description: 'BUILDS SOURCE CODE',
    alphaTags: ['fooBar'],
    externalMetadata: {
      displayName: 'Test ServiceClass Other',
      longDescription: 'some other service',
      'console.openshift.io/iconClass': 'fa fa-question'
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-jenkins": {
    kind: 'ServiceClass',
    "metadata": {
      "name": "test-serviceclass-jenkins",
      "uid": "9",
      "providerDisplayName": "Vendor C"
    },
    bindable: true,
    description: 'BUILDS SOURCE CODE',
    alphaTags: ['jenkins'],
    externalMetadata: {
      displayName: 'Test ServiceClass jenkins',
      longDescription: 'some other service'
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  }
};
