export const plansData = {
  // test-serviceclass-java-nodejs
  'rh-ded-topic': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'rh-ded-topic',
      uid: '1'
    },
    spec: {
      externalID: '1',
      externalName: 'rh-ded-topic',
      externalMetadata: {
        displayName: 'Red Hat - Dedicated - Topic',
        bullets: ['One', 'Two', 'Three']
      },
      description: '$.65 / 1 Million messages',
      bindable: true,
      instanceCreateParameterSchema: {
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
      },
      clusterServiceClassRef: {
        name: "test-serviceclass-java-nodejs"
      }
    }
  },
  'rh-ded-queue': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'rh-ded-queue',
      uid: '2'
    },
    spec: {
      externalID: '2',
      externalName: 'rh-ded-queue',
      externalMetadata: {
        displayName: 'Red Hat - Dedicated - Queue',
        bullets: ['Four', 'Five', 'Six']
      },
      description: '$.65 / 1 Million messages',
      clusterServiceClassRef: {
        name: "test-serviceclass-java-nodejs"
      }
    }
  },
  'rh-shared-topic': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'rh-shared-topic',
      uid: '3'
    },
    spec: {
      externalID: '3',
      externalName: 'rh-shared-topic',
      externalMetadata: {
        displayName: 'Red Hat - Shared - Topic',
        bullets: ['One', 'Two', 'Three']
      },
      description: '$.60 / 1 Million messages',
      clusterServiceClassRef: {
        name: "test-serviceclass-java-nodejs"
      }
    }
  },
  'rh-shared-queue': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'rh-shared-queue',
      uid: '4'
    },
    spec: {
      externalID: '4',
      externalMetadata: {
        displayName: 'Red Hat - Shared - Queue',
        bullets: ['Four', 'Five', 'Six']
      },
      description: '$.60 / 1 Million messages',
      clusterServiceClassRef: {
        name: "test-serviceclass-java-nodejs"
      }
    }
  },
  'self-ded-topic': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'self-ded-topic',
      uid: '5',
    },
    spec: {
      externalID: '5',
      externalName: 'self-ded-topic',
      externalMetadata: {
        displayName: 'Red Hat - Shared - Queue',
        bullets: ['One', 'Two', 'Three']
      },
      description: '$12 / instance',
      clusterServiceClassRef: {
        name: "test-serviceclass-java-nodejs"
      }
    }
  },
  'self-ded-queue': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'self-ded-queue',
      uid: '6'
    },
    spec: {
      externalID: '6',
      externalName: 'self-ded-queue',
      externalMetadata: {
        displayName: 'Red Hat - Shared - Queue',
        bullets: ['Four', 'Five', 'Six']
      },
      description: '$12 / instance',
      clusterServiceClassRef: {
        name: "test-serviceclass-java-nodejs"
      }
    }
  },
  // test-serviceclass-nodejs
  'test-serviceclass-nodejs-plan': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'test-serviceclass-nodejs-plan',
      uid: '7'
    },
    spec: {
      externalID: '7',
      externalName: 'test-serviceclass-nodejs-plan',
      externalMetadata: {
        displayName: 'Red Hat - Dedicated - Topic',
        bullets: ['One', 'Two', 'Three']
      },
      description: '$.65 / 1 Million messages',
      clusterServiceClassRef: {
        name: "test-serviceclass-nodejs"
      }
    }
  },
  // test-serviceclass-perl
  'test-serviceclass-perl-plan': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'test-serviceclass-perl-plan',
      uid: '8'
    },
    spec: {
      externalID: '8',
      externalName: 'test-serviceclass-perl-plan',
      externalMetadata: {
        displayName: 'Red Hat - Dedicated - Topic',
        bullets: ['One', 'Two', 'Three']
      },
      description: '$.65 / 1 Million messages',
      clusterServiceClassRef: {
        name: "test-serviceclass-perl"
      }
    }
  },
  // test-serviceclass-ruby
  'test-serviceclass-ruby-plan': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'test-serviceclass-ruby-plan',
      uid: '9'
    },
    spec: {
      externalID: '9',
      externalName: 'test-serviceclass-ruby-plan',
      externalMetadata: {
        displayName: 'Red Hat - Dedicated - Topic',
        bullets: ['One', 'Two', 'Three']
      },
      description: '$.65 / 1 Million messages',
      clusterServiceClassRef: {
        name: "test-serviceclass-ruby"
      }
    }
  },
  // test-serviceclass-php
  'test-serviceclass-php-plan': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'test-serviceclass-php-plan',
      uid: '10'
    },
    spec: {
      externalID: '10',
      externalName: 'test-serviceclass-php-plan',
      externalMetadata: {
        displayName: 'Red Hat - Dedicated - Topic',
        bullets: ['One', 'Two', 'Three']
      },
      description: '$.65 / 1 Million messages',
      clusterServiceClassRef: {
        name: "test-serviceclass-php"
      }
    }
  },
  // test-serviceclass-mongo
  'test-serviceclass-mongo-plan': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'test-serviceclass-mongo-plan',
      uid: '10'
    },
    spec: {
      externalID: '10',
      externalName: 'test-serviceclass-mongo-plan',
      externalMetadata: {
        displayName: 'Red Hat - Dedicated - Topic',
        bullets: ['One', 'Two', 'Three']
      },
      description: '$.65 / 1 Million messages',
      clusterServiceClassRef: {
        name: "test-serviceclass-mongo"
      }
    }
  },
  // test-serviceclass-mysql
  'test-serviceclass-mysql-plan': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'test-serviceclass-mysql-plan',
      uid: '11'
    },
    spec: {
      externalID: '11',
      externalName: 'test-serviceclass-mysql-plan',
      externalMetadata: {
        displayName: 'Red Hat - Dedicated - Topic',
        bullets: ['One', 'Two', 'Three']
      },
      description: '$.65 / 1 Million messages',
      clusterServiceClassRef: {
        name: "test-serviceclass-mysql"
      }
    }
  },
  // test-serviceclass-other
  'test-serviceclass-other-plan': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'test-serviceclass-other-plan',
      uid: '12'
    },
    spec: {
      externalID: '12',
      externalName: 'test-serviceclass-other-plan',
      externalMetadata: {
        displayName: 'Red Hat - Dedicated - Topic',
        bullets: ['One', 'Two', 'Three']
      },
      description: '$.65 / 1 Million messages',
      clusterServiceClassRef: {
        name: "test-serviceclass-other"
      }
    }
  },
  // test-serviceclass-jenkins
  'test-serviceclass-jenkins-plan': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: 'test-serviceclass-jenkins-plan',
      uid: '13'
    },
    spec: {
      externalID: '13',
      externalName: 'test-serviceclass-jenkins-plan',
      externalMetadata: {
        displayName: 'Red Hat - Dedicated - Topic',
        bullets: ['One', 'Two', 'Three']
      },
      description: '$.65 / 1 Million messages',
      clusterServiceClassRef: {
        name: "test-serviceclass-jenkins"
      }
    }
  },
  // test-serviceclass-pg-apb
  'pg-apb-default': {
    kind: 'ClusterServicePlan',
    metadata: {
      name: "pg-apb-default",
      uid: '14'
    },
    spec: {
      externalID: '14',
      externalName: "pg-apb-default",
      description: "A sample APB which deploys Hello World Database",
      free: true,
      externalMetadata: {
        cost: "$0.00",
        displayName: "Default",
        longDescription: "This plan deploys a Postgres Database the Hello World application can connect to",
        schemas: {
          service_binding: {
            create: {
              openshift_form_definition: [
                "postgresql_database",
                {
                  items: [
                    "postgresql_user",
                    {
                      key: "postgresql_password",
                      type: "password"
                    }
                  ],
                  title: "User Information",
                  type: "fieldset"
                }
              ]
            }
          },
          service_instance: {
            create: {
              openshift_form_definition: [
                "postgresql_database",
                {
                  items: [
                    "postgresql_user",
                    {
                      key: "postgresql_password",
                      type: "password"
                    }
                  ],
                  title: "User Information",
                  type: "fieldset"
                }
              ]
            },
            update: {}
          }
        }
      },
      serviceInstanceCreateParameterSchema: {
        "$schema": "http://json-schema.org/draft-04/schema",
        additionalProperties: false,
        properties: {
          postgresql_database: {
            "default": "admin",
            title: "PostgreSQL Database Name",
            type: "string"
          },
          postgresql_password: {
            "default": "admin",
            title: "PostgreSQL Password",
            type: "string"
          },
          postgresql_user: {
            "default": "admin",
            title: "PostgreSQL User",
            type: "string"
          }
        },
        required: [
          "postgresql_database",
          "postgresql_user",
          "postgresql_password"
        ],
        type: "object"
      },
      serviceBindingCreateParameterSchema: {
        "$schema": "http://json-schema.org/draft-04/schema",
        additionalProperties: false,
        properties: {
          postgresql_database: {
            "default": "admin",
            title: "PostgreSQL Database Name",
            type: "string"
          },
          postgresql_password: {
            "default": "admin",
            title: "PostgreSQL Password",
            type: "string"
          },
          postgresql_user: {
            "default": "admin",
            title: "PostgreSQL User",
            type: "string"
          }
        },
        type: "object"
      },
      serviceInstanceUpdateParameterSchema: {
        "$schema": "http://json-schema.org/draft-04/schema",
        additionalProperties: false,
        properties: {
          postgresql_database: {
            "default": "admin",
            title: "PostgreSQL Database Name",
            type: "string"
          },
          postgresql_password: {
            "default": "admin",
            title: "PostgreSQL Password",
            type: "string"
          },
          postgresql_user: {
            "default": "admin",
            title: "PostgreSQL User",
            type: "string"
          }
        },
        required: [
          "postgresql_database",
          "postgresql_user",
          "postgresql_password"
        ],
        type: "object"
      },
      clusterServiceClassRef: {
        name: "test-serviceclass-pg-apb"
      }
    }
  },
  // test-serviceclass-pg-apb
  'pg-apb-default-2': {
    metadata: {
      name: "pg-apb-default-2",
      uid: '15'
    },
    spec: {
      externalID: '15',
      description: "A sample APB which deploys Hello World Database",
      free: true,
      externalMetadata: {
        cost: "$0.00",
        displayName: "Default 2",
        longDescription: "This plan deploys a Postgres Database the Hello World application can connect to",
        schemas: {
          service_binding: {
            create: {
              openshift_form_definition: [
                "postgresql_database",
                {
                  items: [
                    "postgresql_user",
                    {
                      key: "postgresql_password",
                      type: "password"
                    }
                  ],
                  title: "User Information",
                  type: "fieldset"
                }
              ]
            }
          },
          service_instance: {
            create: {
              openshift_form_definition: [
                "postgresql_database",
                {
                  items: [
                    "postgresql_user",
                    {
                      key: "postgresql_password",
                      type: "password"
                    }
                  ],
                  title: "User Information",
                  type: "fieldset"
                }
              ]
            },
            update: {}
          }
        }
      },
      instanceCreateParameterSchema: {
        "$schema": "http://json-schema.org/draft-04/schema",
        additionalProperties: false,
        properties: {
          postgresql_database: {
            "default": "admin",
            title: "PostgreSQL Database Name",
            type: "string"
          },
          postgresql_password: {
            "default": "admin",
            title: "PostgreSQL Password",
            type: "string"
          },
          postgresql_user: {
            "default": "admin",
            title: "PostgreSQL User",
            type: "string"
          }
        },
        required: [
          "postgresql_database",
          "postgresql_user",
          "postgresql_password"
        ],
        type: "object"
      },
      serviceBindingCreateParameterSchema: {
        "$schema": "http://json-schema.org/draft-04/schema",
        additionalProperties: false,
        properties: {
          postgresql_database: {
            "default": "admin",
            title: "PostgreSQL Database Name",
            type: "string"
          },
          postgresql_password: {
            "default": "admin",
            title: "PostgreSQL Password",
            type: "string"
          },
          postgresql_user: {
            "default": "admin",
            title: "PostgreSQL User",
            type: "string"
          }
        },
        type: "object"
      },
      serviceInstanceUpdateParameterSchema: {
        "$schema": "http://json-schema.org/draft-04/schema",
        additionalProperties: false,
        properties: {
          postgresql_database: {
            "default": "admin",
            title: "PostgreSQL Database Name",
            type: "string"
          },
          postgresql_password: {
            "default": "admin",
            title: "PostgreSQL Password",
            type: "string"
          },
          postgresql_user: {
            "default": "admin",
            title: "PostgreSQL User",
            type: "string"
          }
        },
        required: [
          "postgresql_database",
          "postgresql_user",
          "postgresql_password"
        ],
        type: "object"
      },
      clusterServiceClassRef: {
        name: "test-serviceclass-pg-apb"
      }
    }
  },
  // test-serviceclass-pg-apb
  'pg-apb-default-3': {
    metadata: {
      name: "pg-apb-default-3",
      uid: '16'
    },
    spec: {
      externalID: '16',
      description: "A sample APB which deploys Hello World Database",
      free: true,
      externalMetadata: {
        cost: "$0.00",
        displayName: "Default 3",
        longDescription: "This plan deploys a Postgres Database the Hello World application can connect to",
        schemas: {
          service_binding: {
            create: {
              openshift_form_definition: [
                "postgresql_database",
                {
                  items: [
                    "postgresql_user",
                    {
                      key: "postgresql_password",
                      type: "password"
                    }
                  ],
                  title: "User Information",
                  type: "fieldset"
                }
              ]
            }
          },
          service_instance: {
            create: {
              openshift_form_definition: [
                "postgresql_database",
                {
                  items: [
                    "postgresql_user",
                    {
                      key: "postgresql_password",
                      type: "password"
                    }
                  ],
                  title: "User Information",
                  type: "fieldset"
                }
              ]
            },
            update: {}
          }
        }
      },
      instanceCreateParameterSchema: {
        "$schema": "http://json-schema.org/draft-04/schema",
        additionalProperties: false,
        properties: {
          postgresql_database: {
            "default": "admin",
            title: "PostgreSQL Database Name",
            type: "string"
          },
          postgresql_password: {
            "default": "admin",
            title: "PostgreSQL Password",
            type: "string"
          },
          postgresql_user: {
            "default": "admin",
            title: "PostgreSQL User",
            type: "string"
          }
        },
        required: [
          "postgresql_database",
          "postgresql_user",
          "postgresql_password"
        ],
        type: "object"
      },
      serviceBindingCreateParameterSchema: {
        "$schema": "http://json-schema.org/draft-04/schema",
        additionalProperties: false,
        properties: {
          postgresql_database: {
            "default": "admin",
            title: "PostgreSQL Database Name",
            type: "string"
          },
          postgresql_password: {
            "default": "admin",
            title: "PostgreSQL Password",
            type: "string"
          },
          postgresql_user: {
            "default": "admin",
            title: "PostgreSQL User",
            type: "string"
          }
        },
        type: "object"
      },
      serviceInstanceUpdateParameterSchema: {
        "$schema": "http://json-schema.org/draft-04/schema",
        additionalProperties: false,
        properties: {
          postgresql_database: {
            "default": "admin",
            title: "PostgreSQL Database Name",
            type: "string"
          },
          postgresql_password: {
            "default": "admin",
            title: "PostgreSQL Password",
            type: "string"
          },
          postgresql_user: {
            "default": "admin",
            title: "PostgreSQL User",
            type: "string"
          }
        },
        required: [
          "postgresql_database",
          "postgresql_user",
          "postgresql_password"
        ],
        type: "object"
      },
      clusterServiceClassRef: {
        name: "test-serviceclass-pg-apb"
      }
    }
  }
};
