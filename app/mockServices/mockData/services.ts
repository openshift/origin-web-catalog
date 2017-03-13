export const servicesData = {
  "wildfly": {
    "metadata": {
      "name": "Wildfly",
      category: 'languages',
      subCategory: 'java',
      "uid": "1",
    },
    displayName: 'WildFly',
    imageURL: 'font-icon icon-wildfly',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'Build and run WildFly 10.1 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1'],
    plans: [
      {name: 'rh-ded-topic', osbGuid: '1', displayName: 'Red Hat - Dedicated - Topic', description: '$.65 / 1 Million messages', bullets: ['One', 'Two', 'Three']},
      {name: 'rh-ded-queue', osbGuid: '2', displayName: 'Red Hat - Dedicated - Queue', description: '$.65 / 1 Million messages', bullets: ['Four', 'Five', 'Six']},
      {name: 'rh-shared-topic', osbGuid: '3', displayName: 'Red Hat - Shared - Topic', description: '$.60 / 1 Million messages', bullets: ['One', 'Two', 'Three']},
      {name: 'rh-shared-queue', osbGuid: '4', displayName: 'Red Hat - Shared - Queue', description: '$.60 / 1 Million messages', bullets: ['Four', 'Five', 'Six']},
      {name: 'self-ded-topic', osbGuid: '5', displayName: 'Red Hat - Shared - Queue', description: '$12 / instance', bullets: ['One', 'Two', 'Three']},
      {name: 'self-ded-queue', osbGuid: '6', displayName: 'Red Hat - Shared - Queue', description: '$12 / instance', bullets: ['Four', 'Five', 'Six']}
    ]
  },
  "oracle-java": {
    "metadata": {
      "name": "Oracle Java",
      category: 'languages',
      subCategory: 'java',
      "uid": "1",
    },
    displayName: 'Oracle Java',
    imageURL: 'font-icon icon-openjdk',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Oracle Java applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "node-js": {
    "metadata": {
      "name": "Node.js",
      category: 'languages',
      subCategory: 'javascript',
      "uid": "1",
    },
    displayName: 'Node.js',
    imageURL: 'font-icon icon-js',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Node.js applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "node-js+mongo": {
    "metadata": {
      "name": "Node.js + MongoDB (Ephemeral)",
      category: 'languages',
      subCategory: 'javascript',
      "uid": "1",
    },
    displayName: 'Node.js',
    imageURL: 'font-icon icon-js',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Node.js + MongoDB applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "perl": {
    "metadata": {
      "name": "Perl",
      category: 'languages',
      subCategory: 'perl',
      "uid": "1",
    },
    displayName: 'Perl',
    imageURL: 'font-icon icon-perl',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Perl applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "dancer+mysql": {
    "metadata": {
      "name": "Dancer + MySQL",
      category: 'languages',
      subCategory: 'perl',
      "uid": "1",
    },
    displayName: 'Dancer + MySQL (Ephemeral)',
    imageURL: 'font-icon icon-perl',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Dancer + MySQL applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "ruby": {
    "metadata": {
      "name": "Ruby",
      category: 'languages',
      subCategory: 'ruby',
      "uid": "1",
    },
    displayName: 'Ruby',
    imageURL: 'font-icon icon-ruby',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Dancer + MySQL applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "rails+postgresql": {
    "metadata": {
      "name": "Rails + PostgreSQL",
      category: 'languages',
      subCategory: 'ruby',
      "uid": "1",
    },
    displayName: 'Rails + PostgreSQL (Ephemeral)',
    imageURL: 'font-icon icon-ruby',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Rails + PostgreSQL applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "php": {
    "metadata": {
      "name": "PHP",
      category: 'languages',
      subCategory: 'php',
      "uid": "1",
    },
    displayName: 'PHP',
    imageURL: 'font-icon icon-php',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run PHP applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "cakephp+mysql": {
    "metadata": {
      "name": "CakePHP + MySQL",
      category: 'languages',
      subCategory: 'php',
      "uid": "1",
    },
    displayName: 'CakePHP + MySQL (Ephemeral)',
    imageURL: 'font-icon icon-php',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run CakePHP + MySQL applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "python": {
    "metadata": {
      "name": "Python",
      category: 'languages',
      subCategory: 'python',
      "uid": "1",
    },
    displayName: 'Python',
    imageURL: 'font-icon icon-python',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Python applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "django+postgresql": {
    "metadata": {
      "name": "Django + PostgreSQL",
      category: 'languages',
      subCategory: 'python',
      "uid": "1",
    },
    displayName: 'Django + PostgreSQL (Ephemeral)',
    imageURL: 'font-icon icon-python',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Django + PostgreSQL applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "mysql": {
    "metadata": {
      "name": "mySQL",
      category: 'databases',
      subCategory: 'mysql',
      "uid": "1",
    },
    displayName: 'mySQL  (Ephemeral)',
    imageURL: 'font-icon icon-mysql-database',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Django + PostgreSQL applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "postgres": {
    "metadata": {
      "name": "Postgres",
      category: 'databases',
      subCategory: 'postgres',
      "uid": "1",
    },
    displayName: 'Postgres (Ephemeral)',
    imageURL: 'font-icon icon-postgresql',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Postgres applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "mariadb": {
    "metadata": {
      "name": "MariaDB",
      category: 'databases',
      subCategory: 'mariadb',
      "uid": "1",
    },
    displayName: 'MariaDB (Ephemeral)',
    imageURL: 'font-icon icon-mariadb',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run MariaDB applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "jboss": {
    "metadata": {
      "name": "Red Hat JBoss EAP",
      category: 'middleware',
      subCategory: 'jboss',
      "uid": "1",
    },
    displayName: 'Red Hat JBoss EAP',
    imageURL: 'font-icon icon-openjdk',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run JBoss applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "jboss-client": {
    "metadata": {
      "name": "JBoss EAP Client",
      category: 'middleware',
      subCategory: 'jboss',
      "uid": "1",
    },
    displayName: 'JBoss EAP Client',
    imageURL: 'font-icon icon-openjdk',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run JBoss Client applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "fuse": {
    "metadata": {
      "name": "Fuse",
      category: 'middleware',
      subCategory: 'fuse',
      "uid": "1",
    },
    displayName: 'Fuse',
    imageURL: 'font-icon icon-openjdk',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Fuse applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "jboss-amq": {
    "metadata": {
      "name": "Red Hat JBoss A-MQ",
      category: 'middleware',
      subCategory: 'amq',
      "uid": "1",
    },
    displayName: 'Red Hat JBoss A-MQ',
    imageURL: 'font-icon icon-openjdk',
    description: 'BUILDS SOURCE CODE',
    longDescription: 'run Red Hat JBoss A-MQ applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  },
  "mongo": {
    "metadata": {
      "name": "mongo",
      category: 'databases',
      subCategory: 'mongo',
      "uid": "3",
    },
    displayName: 'Mongo',
    imageURL: 'font-icon icon-mongodb',
    description: 'Runs Mongo Database',
    longDescription: 'Build and run Mongo applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']
  }
};
