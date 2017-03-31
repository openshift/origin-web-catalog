export const servicesData = {
  "test-serviceclass-java": {
    "metadata": {
      "name": "test-serviceclass-java-nodejs",
      "uid": "1",
    },
    osbTags: ['java', 'nodejs'],
    osbMetadata: {
      displayName: 'Test ServiceClass Java-Node.js',
      description: 'BUILDS SOURCE CODE',
      longDescription: 'Build and run Java applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
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
      "uid": "1",
    },
    osbTags: ['nodejs'],
    osbMetadata: {
      displayName: 'Test ServiceClass Node.js',
      description: 'BUILDS SOURCE CODE',
      longDescription: 'run nodejs applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    }
  },
  "test-serviceclass-perl": {
    "metadata": {
      "name": "test-serviceclass-perl",
      "uid": "1",
    },
    osbTags: ['perl'],
    osbMetadata: {
      displayName: 'Test ServiceClass Perl',
      description: 'BUILDS SOURCE CODE',
      longDescription: 'run Perl applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    }
  },
  "test-serviceclass-ruby": {
    "metadata": {
      "name": "test-serviceclass-ruby-mongo",
      "uid": "1",
    },
    osbTags: ['ruby', 'mongodb'],
    osbMetadata: {
      displayName: 'Test ServiceClass Ruby-Mongo',
      description: 'BUILDS SOURCE CODE',
      longDescription: 'run ruby applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    }
  },
  "test-serviceclass-php": {
    "metadata": {
      "name": "test-serviceclass-php",
      "uid": "1",
    },
    osbTags: ['php'],
    osbMetadata: {
      displayName: 'Test ServiceClass PHP',
      description: 'BUILDS SOURCE CODE',
      longDescription: 'run PHP applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    }
  },
  "test-serviceclass-mongo": {
    "metadata": {
      "name": "test-serviceclass-mongo",
      "uid": "1",
    },
    osbTags: ['mongodb'],
    osbMetadata: {
      displayName: 'Test ServiceClass MongoDB',
      description: 'BUILDS SOURCE CODE',
      longDescription: 'run MongoDB applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    }
  },
  "test-serviceclass-mysql": {
    "metadata": {
      "name": "test-serviceclass-mysql",
      "uid": "1",
    },
    osbTags: ['mysql'],
    osbMetadata: {
      displayName: 'Test ServiceClass mySQL',
      description: 'BUILDS SOURCE CODE',
      longDescription: 'run MongoDB applications. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    }
  },
  "test-serviceclass-other": {
    "metadata": {
      "name": "test-serviceclass-other",
      "uid": "1",
    },
    osbTags: ['fooBar'],
    osbMetadata: {
      displayName: 'Test ServiceClass Other',
      description: 'BUILDS SOURCE CODE',
      longDescription: 'some other service',
      'console.openshift.io/iconClass': 'fa fa-question'
    }
  },
  "test-serviceclass-jenkins": {
    "metadata": {
      "name": "test-serviceclass-jenkins",
      "uid": "1",
    },
    osbTags: ['jenkins'],
    osbMetadata: {
      displayName: 'Test ServiceClass jenkins',
      description: 'BUILDS SOURCE CODE',
      longDescription: 'some other service'
    }
  }
};
