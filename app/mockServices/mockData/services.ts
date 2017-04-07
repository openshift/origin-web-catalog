export const servicesData = {
  "test-serviceclass-java": {
    "metadata": {
      "name": "test-serviceclass-java-nodejs",
      "uid": "1",
    },
    description: 'BUILDS SOURCE CODE',
    osbTags: ['java', 'nodejs'],
    osbMetadata: {
      displayName: 'Test ServiceClass Java-Node.js',
      longDescription: 'Build and run Java applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
      documentationUrl: 'https://github.com/openshift/source-to-image'
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']},
      {name: 'rh-ded-queue', osbGuid: '2', displayName: 'Red Hat - Dedicated - Queue', description: '$.65 / 1 Million messages', bullets: ['Four', 'Five', 'Six']},
      {name: 'rh-shared-topic', osbGuid: '3', displayName: 'Red Hat - Shared - Topic', description: '$.60 / 1 Million messages', bullets: ['One', 'Two', 'Three']},
      {name: 'rh-shared-queue', osbGuid: '4', displayName: 'Red Hat - Shared - Queue', description: '$.60 / 1 Million messages', bullets: ['Four', 'Five', 'Six']},
      {name: 'self-ded-topic', osbGuid: '5', displayName: 'Red Hat - Shared - Queue', description: '$12 / instance', bullets: ['One', 'Two', 'Three']},
      {name: 'self-ded-queue', osbGuid: '6', displayName: 'Red Hat - Shared - Queue', description: '$12 / instance', bullets: ['Four', 'Five', 'Six']}
    ]
  },
  "test-serviceclass-nodejs": {
    "metadata": {
      "name": "test-serviceclass-nodejs",
      "uid": "2",
    },
    description: 'BUILDS SOURCE CODE',
    osbTags: ['nodejs'],
    osbMetadata: {
      displayName: 'Test ServiceClass Node.js',
      longDescription: 'run nodejs applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-perl": {
    "metadata": {
      "name": "test-serviceclass-perl",
      "uid": "3",
    },
    description: 'BUILDS SOURCE CODE',
    osbTags: ['perl'],
    osbMetadata: {
      displayName: 'Test ServiceClass Perl',
      longDescription: 'run Perl applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-ruby": {
    "metadata": {
      "name": "test-serviceclass-ruby-mongo",
      "uid": "4",
    },
    description: 'BUILDS SOURCE CODE',
    osbTags: ['ruby', 'mongodb'],
    osbMetadata: {
      displayName: 'Test ServiceClass Ruby-Mongo',
      longDescription: 'run ruby applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-php": {
    "metadata": {
      "name": "test-serviceclass-php",
      "uid": "5",
    },
    description: 'BUILDS SOURCE CODE',
    osbTags: ['php'],
    osbMetadata: {
      displayName: 'Test ServiceClass PHP',
      longDescription: 'run PHP applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-mongo": {
    "metadata": {
      "name": "test-serviceclass-mongo",
      "uid": "6",
    },
    description: 'BUILDS SOURCE CODE',
    osbTags: ['mongodb'],
    osbMetadata: {
      displayName: 'Test ServiceClass MongoDB',
      longDescription: 'run MongoDB applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-mysql": {
    "metadata": {
      "name": "test-serviceclass-mysql",
      "uid": "7",
    },
    description: 'BUILDS SOURCE CODE',
    osbTags: ['mysql'],
    osbMetadata: {
      displayName: 'Test ServiceClass mySQL',
      longDescription: 'run MongoDB applications. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-other": {
    "metadata": {
      "name": "test-serviceclass-other",
      "uid": "8",
    },
    description: 'BUILDS SOURCE CODE',
    osbTags: ['fooBar'],
    osbMetadata: {
      displayName: 'Test ServiceClass Other',
      longDescription: 'some other service',
      'console.openshift.io/iconClass': 'fa fa-question'
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  },
  "test-serviceclass-jenkins": {
    "metadata": {
      "name": "test-serviceclass-jenkins",
      "uid": "9",
    },
    description: 'BUILDS SOURCE CODE',
    osbTags: ['jenkins'],
    osbMetadata: {
      displayName: 'Test ServiceClass jenkins',
      longDescription: 'some other service'
    },
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']}
    ]
  }
};
