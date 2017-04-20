export const imagesData = {
    'jenkins': {
    'metadata': {
        'name': 'jenkins',
            'namespace': 'openshift',
            'selfLink': '/oapi/v1/namespaces/openshift/imagestreams/jenkins',
            'uid': 'jenkins',
            'resourceVersion': '658',
            'generation': 2,
            'creationTimestamp': '2017-03-15T15:46:25Z',
            'annotations': {
            'openshift.io/display-name': 'Jenkins',
                'openshift.io/image.dockerRepositoryCheck': '2017-03-15T15:46:49Z'
        }
    },
    'spec': {
        'tags': [
            {
                'name': '1',
                'annotations': {
                    'description': 'Provides a Jenkins 1.X server on CentOS 7. For more information about using this container image, including OpenShift considerations, see https://github.com/openshift/jenkins/blob/master/README.md.',
                    'iconClass': 'icon-jenkins',
                    'openshift.io/display-name': 'Jenkins 1.X',
                    'tags': 'jenkins',
                    'version': '1.x'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/jenkins-1-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '2',
                'annotations': {
                    'description': 'Provides a Jenkins v2.x server on CentOS 7. For more information about using this container image, including OpenShift considerations, see https://github.com/openshift/jenkins/blob/master/README.md.',
                    'iconClass': 'icon-jenkins',
                    'openshift.io/display-name': 'Jenkins 2.X',
                    'tags': 'jenkins',
                    'version': '2.x'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/jenkins-2-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': 'latest',
                'annotations': {
                    'description': 'Provides a Jenkins server on CentOS 7. For more information about using this container image, including OpenShift considerations, see https://github.com/openshift/jenkins/blob/master/README.md.\n\nWARNING: By selecting this tag, your application will automatically update to use the latest version of Jenkins available on OpenShift, including major versions updates.',
                    'iconClass': 'icon-jenkins',
                    'openshift.io/display-name': 'Jenkins (Latest)',
                    'tags': 'jenkins'
                },
                'from': {
                    'kind': 'ImageStreamTag',
                    'name': '2'
                },
                'generation': 1,
                'importPolicy': {}
            }
        ]
    },
    'status': {
        'dockerImageRepository': '172.30.112.149:5000/openshift/jenkins',
            'tags': [
            {
                'tag': 'latest',
                'items': [
                    {
                        'created': '2017-03-15T15:46:49Z',
                        'dockerImageReference': 'openshift/jenkins-2-centos7@sha256:fe03fcde75de2d2de823ab2783c611117e405cc854be7781fdae98014cc3765b',
                        'image': 'sha256:fe03fcde75de2d2de823ab2783c611117e405cc854be7781fdae98014cc3765b',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '2',
                'items': [
                    {
                        'created': '2017-03-15T15:46:49Z',
                        'dockerImageReference': 'openshift/jenkins-2-centos7@sha256:fe03fcde75de2d2de823ab2783c611117e405cc854be7781fdae98014cc3765b',
                        'image': 'sha256:fe03fcde75de2d2de823ab2783c611117e405cc854be7781fdae98014cc3765b',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '1',
                'items': [
                    {
                        'created': '2017-03-15T15:46:49Z',
                        'dockerImageReference': 'openshift/jenkins-1-centos7@sha256:320f136c6e85535f5698b14aafeca2fc8afc0690e938432d9e523cf5baaea39c',
                        'image': 'sha256:320f136c6e85535f5698b14aafeca2fc8afc0690e938432d9e523cf5baaea39c',
                        'generation': 2
                    }
                ]
            }
        ]
    },
    'kind': 'ImageStream',
        'apiVersion': 'v1'
},
    'mariadb': {
    'metadata': {
        'name': 'mariadb',
            'namespace': 'openshift',
            'selfLink': '/oapi/v1/namespaces/openshift/imagestreams/mariadb',
            'uid': 'mariadb',
            'resourceVersion': '603',
            'generation': 2,
            'creationTimestamp': '2017-03-15T15:46:25Z',
            'annotations': {
            'openshift.io/display-name': 'MariaDB',
                'openshift.io/image.dockerRepositoryCheck': '2017-03-15T15:46:39Z'
        }
    },
    'spec': {
        'tags': [
            {
                'name': '10.1',
                'annotations': {
                    'description': 'Provides a MariaDB 10.1 database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/mariadb-container/tree/master/10.1/README.md.',
                    'iconClass': 'icon-mariadb',
                    'openshift.io/display-name': 'MariaDB 10.1',
                    'tags': 'mariadb',
                    'version': '10.1'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/mariadb-101-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': 'latest',
                'annotations': {
                    'description': 'Provides a MariaDB database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/mariadb-container/tree/master/10.1/README.md.\n\nWARNING: By selecting this tag, your application will automatically update to use the latest version of MariaDB available on OpenShift, including major versions updates.',
                    'iconClass': 'icon-mariadb',
                    'openshift.io/display-name': 'MariaDB (Latest)',
                    'tags': 'mariadb'
                },
                'from': {
                    'kind': 'ImageStreamTag',
                    'name': '10.1'
                },
                'generation': 1,
                'importPolicy': {}
            }
        ]
    },
    'status': {
        'dockerImageRepository': '172.30.112.149:5000/openshift/mariadb',
            'tags': [
            {
                'tag': 'latest',
                'items': [
                    {
                        'created': '2017-03-15T15:46:39Z',
                        'dockerImageReference': 'centos/mariadb-101-centos7@sha256:a1d102a65bfbaa5239f063de0e10abd09ed53d22358caab64f40df41c20941ac',
                        'image': 'sha256:a1d102a65bfbaa5239f063de0e10abd09ed53d22358caab64f40df41c20941ac',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '10.1',
                'items': [
                    {
                        'created': '2017-03-15T15:46:39Z',
                        'dockerImageReference': 'centos/mariadb-101-centos7@sha256:a1d102a65bfbaa5239f063de0e10abd09ed53d22358caab64f40df41c20941ac',
                        'image': 'sha256:a1d102a65bfbaa5239f063de0e10abd09ed53d22358caab64f40df41c20941ac',
                        'generation': 2
                    }
                ]
            }
        ]
    },
    'kind': 'ImageStream',
        'apiVersion': 'v1'
},
    'mongodb': {
    'metadata': {
        'name': 'mongodb',
            'namespace': 'openshift',
            'selfLink': '/oapi/v1/namespaces/openshift/imagestreams/mongodb',
            'uid': 'mongodb',
            'resourceVersion': '617',
            'generation': 2,
            'creationTimestamp': '2017-03-15T15:46:25Z',
            'annotations': {
            'openshift.io/display-name': 'MongoDB',
                'openshift.io/image.dockerRepositoryCheck': '2017-03-15T15:46:41Z'
        }
    },
    'spec': {
        'tags': [
            {
                'name': '2.4',
                'annotations': {
                    'description': 'Provides a MongoDB 2.4 database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/mongodb-container/tree/master/2.4/README.md.',
                    'iconClass': 'icon-mongodb',
                    'openshift.io/display-name': 'MongoDB 2.4',
                    'tags': 'mongodb',
                    'version': '2.4'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/mongodb-24-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '2.6',
                'annotations': {
                    'description': 'Provides a MongoDB 2.6 database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/mongodb-container/tree/master/2.6/README.md.',
                    'iconClass': 'icon-mongodb',
                    'openshift.io/display-name': 'MongoDB 2.6',
                    'tags': 'mongodb',
                    'version': '2.6'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/mongodb-26-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '3.2',
                'annotations': {
                    'description': 'Provides a MongoDB 3.2 database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/mongodb-container/tree/master/3.2/README.md.',
                    'iconClass': 'icon-mongodb',
                    'openshift.io/display-name': 'MongoDB 3.2',
                    'tags': 'mongodb',
                    'version': '3.2'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/mongodb-32-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': 'latest',
                'annotations': {
                    'description': 'Provides a MongoDB database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/mongodb-container/tree/master/3.2/README.md.\n\nWARNING: By selecting this tag, your application will automatically update to use the latest version of MongoDB available on OpenShift, including major versions updates.',
                    'iconClass': 'icon-mongodb',
                    'openshift.io/display-name': 'MongoDB (Latest)',
                    'tags': 'mongodb'
                },
                'from': {
                    'kind': 'ImageStreamTag',
                    'name': '3.2'
                },
                'generation': 1,
                'importPolicy': {}
            }
        ]
    },
    'status': {
        'dockerImageRepository': '172.30.112.149:5000/openshift/mongodb',
            'tags': [
            {
                'tag': 'latest',
                'items': [
                    {
                        'created': '2017-03-15T15:46:41Z',
                        'dockerImageReference': 'centos/mongodb-32-centos7@sha256:b899d2dbc0cbf679eb6e329427894b69b9af032c3b1d7deecb3778aae2386be9',
                        'image': 'sha256:b899d2dbc0cbf679eb6e329427894b69b9af032c3b1d7deecb3778aae2386be9',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '3.2',
                'items': [
                    {
                        'created': '2017-03-15T15:46:41Z',
                        'dockerImageReference': 'centos/mongodb-32-centos7@sha256:b899d2dbc0cbf679eb6e329427894b69b9af032c3b1d7deecb3778aae2386be9',
                        'image': 'sha256:b899d2dbc0cbf679eb6e329427894b69b9af032c3b1d7deecb3778aae2386be9',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '2.6',
                'items': [
                    {
                        'created': '2017-03-15T15:46:41Z',
                        'dockerImageReference': 'centos/mongodb-26-centos7@sha256:02696c0b11ac5e76fb4b9c4bd1f1ef4f63d8407a79b80d0a8775246e4db22466',
                        'image': 'sha256:02696c0b11ac5e76fb4b9c4bd1f1ef4f63d8407a79b80d0a8775246e4db22466',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '2.4',
                'items': [
                    {
                        'created': '2017-03-15T15:46:41Z',
                        'dockerImageReference': 'openshift/mongodb-24-centos7@sha256:1a0e9ae0f6bf9b5f808534f3152dc068c48ad1bc428e94822dce84722a3decad',
                        'image': 'sha256:1a0e9ae0f6bf9b5f808534f3152dc068c48ad1bc428e94822dce84722a3decad',
                        'generation': 2
                    }
                ]
            }
        ]
    },
    'kind': 'ImageStream',
        'apiVersion': 'v1'
},
    'mysql': {
    'metadata': {
        'name': 'mysql',
            'namespace': 'openshift',
            'selfLink': '/oapi/v1/namespaces/openshift/imagestreams/mysql',
            'uid': 'mysql',
            'resourceVersion': '585',
            'generation': 2,
            'creationTimestamp': '2017-03-15T15:46:25Z',
            'annotations': {
            'openshift.io/display-name': 'MySQL',
                'openshift.io/image.dockerRepositoryCheck': '2017-03-15T15:46:33Z'
        }
    },
    'spec': {
        'tags': [
            {
                'name': '5.5',
                'annotations': {
                    'description': 'Provides a MySQL 5.5 database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/mysql-container/tree/master/5.5/README.md.',
                    'iconClass': 'icon-mysql-database',
                    'openshift.io/display-name': 'MySQL 5.5',
                    'tags': 'mysql',
                    'version': '5.5'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/mysql-55-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '5.6',
                'annotations': {
                    'description': 'Provides a MySQL 5.6 database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/mysql-container/tree/master/5.6/README.md.',
                    'iconClass': 'icon-mysql-database',
                    'openshift.io/display-name': 'MySQL 5.6',
                    'tags': 'mysql',
                    'version': '5.6'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/mysql-56-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': 'latest',
                'annotations': {
                    'description': 'Provides a MySQL database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/mysql-container/tree/master/5.6/README.md.\n\nWARNING: By selecting this tag, your application will automatically update to use the latest version of MySQL available on OpenShift, including major versions updates.',
                    'iconClass': 'icon-mysql-database',
                    'openshift.io/display-name': 'MySQL (Latest)',
                    'tags': 'mysql'
                },
                'from': {
                    'kind': 'ImageStreamTag',
                    'name': '5.6'
                },
                'generation': 1,
                'importPolicy': {}
            }
        ]
    },
    'status': {
        'dockerImageRepository': '172.30.112.149:5000/openshift/mysql',
            'tags': [
            {
                'tag': 'latest',
                'items': [
                    {
                        'created': '2017-03-15T15:46:33Z',
                        'dockerImageReference': 'centos/mysql-56-centos7@sha256:f8603dadddf5dc3b4a46333a7c3d9c2496d1fbc1f77cced44fdd2f02732e0b77',
                        'image': 'sha256:f8603dadddf5dc3b4a46333a7c3d9c2496d1fbc1f77cced44fdd2f02732e0b77',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '5.6',
                'items': [
                    {
                        'created': '2017-03-15T15:46:33Z',
                        'dockerImageReference': 'centos/mysql-56-centos7@sha256:f8603dadddf5dc3b4a46333a7c3d9c2496d1fbc1f77cced44fdd2f02732e0b77',
                        'image': 'sha256:f8603dadddf5dc3b4a46333a7c3d9c2496d1fbc1f77cced44fdd2f02732e0b77',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '5.5',
                'items': [
                    {
                        'created': '2017-03-15T15:46:33Z',
                        'dockerImageReference': 'openshift/mysql-55-centos7@sha256:7cd33ccc63b8005810aedee0444472cc84c3e3c38fe9cd147edb964e712a1068',
                        'image': 'sha256:7cd33ccc63b8005810aedee0444472cc84c3e3c38fe9cd147edb964e712a1068',
                        'generation': 2
                    }
                ]
            }
        ]
    },
    'kind': 'ImageStream',
        'apiVersion': 'v1'
},
    'nodejs': {
    'metadata': {
        'name': 'nodejs',
            'namespace': 'openshift',
            'selfLink': '/oapi/v1/namespaces/openshift/imagestreams/nodejs',
            'uid': 'nodejs',
            'resourceVersion': '594',
            'generation': 2,
            'creationTimestamp': '2017-03-15T15:46:24Z',
            'annotations': {
            'openshift.io/display-name': 'Node.js',
                'openshift.io/image.dockerRepositoryCheck': '2017-03-15T15:46:36Z'
        }
    },
    'spec': {
        'tags': [
            {
                'name': '0.10',
                'annotations': {
                    'description': 'Build and run Node.js 0.10 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-nodejs-container/blob/master/0.10/README.md.',
                    'iconClass': 'icon-nodejs',
                    'openshift.io/display-name': 'Node.js 0.10',
                    'sampleRepo': 'https://github.com/openshift/nodejs-ex.git',
                    'supports': 'nodejs:0.10,nodejs:0.1,nodejs',
                    'tags': 'builder,nodejs',
                    'version': '0.10'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/nodejs-010-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '4',
                'annotations': {
                    'description': 'Build and run Node.js 4 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-nodejs-container/blob/master/4/README.md.',
                    'iconClass': 'icon-nodejs',
                    'openshift.io/display-name': 'Node.js 4',
                    'sampleRepo': 'https://github.com/openshift/nodejs-ex.git',
                    'supports': 'nodejs:4,nodejs',
                    'tags': 'builder,nodejs',
                    'version': '4'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/nodejs-4-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': 'latest',
                'annotations': {
                    'description': 'Build and run Node.js applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-nodejs-container/blob/master/4/README.md.\n\nWARNING: By selecting this tag, your application will automatically update to use the latest version of Node.js available on OpenShift, including major versions updates.',
                    'iconClass': 'icon-nodejs',
                    'openshift.io/display-name': 'Node.js (Latest)',
                    'sampleRepo': 'https://github.com/openshift/nodejs-ex.git',
                    'supports': 'nodejs',
                    'tags': 'builder,nodejs'
                },
                'from': {
                    'kind': 'ImageStreamTag',
                    'name': '4'
                },
                'generation': 1,
                'importPolicy': {}
            }
        ]
    },
    'status': {
        'dockerImageRepository': '172.30.112.149:5000/openshift/nodejs',
            'tags': [
            {
                'tag': 'latest',
                'items': [
                    {
                        'created': '2017-03-15T15:46:36Z',
                        'dockerImageReference': 'centos/nodejs-4-centos7@sha256:5871c38e8bb365c4b3da6a1add9c305f502eda630ed094bae51ab5a7f2266983',
                        'image': 'sha256:5871c38e8bb365c4b3da6a1add9c305f502eda630ed094bae51ab5a7f2266983',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '4',
                'items': [
                    {
                        'created': '2017-03-15T15:46:36Z',
                        'dockerImageReference': 'centos/nodejs-4-centos7@sha256:5871c38e8bb365c4b3da6a1add9c305f502eda630ed094bae51ab5a7f2266983',
                        'image': 'sha256:5871c38e8bb365c4b3da6a1add9c305f502eda630ed094bae51ab5a7f2266983',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '0.10',
                'items': [
                    {
                        'created': '2017-03-15T15:46:36Z',
                        'dockerImageReference': 'openshift/nodejs-010-centos7@sha256:bd971b467b08b8dbbbfee26bad80dcaa0110b184e0a8dd6c1b0460a6d6f5d332',
                        'image': 'sha256:bd971b467b08b8dbbbfee26bad80dcaa0110b184e0a8dd6c1b0460a6d6f5d332',
                        'generation': 2
                    }
                ]
            }
        ]
    },
    'kind': 'ImageStream',
        'apiVersion': 'v1'
},
    'perl': {
    'metadata': {
        'name': 'perl',
            'namespace': 'openshift',
            'selfLink': '/oapi/v1/namespaces/openshift/imagestreams/perl',
            'uid': 'perl',
            'resourceVersion': '598',
            'generation': 2,
            'creationTimestamp': '2017-03-15T15:46:24Z',
            'annotations': {
            'openshift.io/display-name': 'Perl',
                'openshift.io/image.dockerRepositoryCheck': '2017-03-15T15:46:37Z'
        }
    },
    'spec': {
        'tags': [
            {
                'name': '5.16',
                'annotations': {
                    'description': 'Build and run Perl 5.16 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-perl-container/blob/master/5.16/README.md.',
                    'iconClass': 'icon-perl',
                    'openshift.io/display-name': 'Perl 5.16',
                    'sampleRepo': 'https://github.com/openshift/dancer-ex.git',
                    'supports': 'perl:5.16,perl',
                    'tags': 'builder,perl',
                    'version': '5.16'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/perl-516-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '5.20',
                'annotations': {
                    'description': 'Build and run Perl 5.20 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-perl-container/blob/master/5.20/README.md.',
                    'iconClass': 'icon-perl',
                    'openshift.io/display-name': 'Perl 5.20',
                    'sampleRepo': 'https://github.com/openshift/dancer-ex.git',
                    'supports': 'perl:5.20,perl',
                    'tags': 'builder,perl',
                    'version': '5.20'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/perl-520-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': 'latest',
                'annotations': {
                    'description': 'Build and run Perl applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-perl-container/blob/master/5.20/README.md.\n\nWARNING: By selecting this tag, your application will automatically update to use the latest version of Perl available on OpenShift, including major versions updates.',
                    'iconClass': 'icon-perl',
                    'openshift.io/display-name': 'Perl (Latest)',
                    'sampleRepo': 'https://github.com/openshift/dancer-ex.git',
                    'supports': 'perl',
                    'tags': 'builder,perl'
                },
                'from': {
                    'kind': 'ImageStreamTag',
                    'name': '5.20'
                },
                'generation': 1,
                'importPolicy': {}
            }
        ]
    },
    'status': {
        'dockerImageRepository': '172.30.112.149:5000/openshift/perl',
            'tags': [
            {
                'tag': 'latest',
                'items': [
                    {
                        'created': '2017-03-15T15:46:37Z',
                        'dockerImageReference': 'centos/perl-520-centos7@sha256:c50beb2ebdfe251c9bfbc237c146b83948a51f2c26fe3e4c3ddf0f15de3498fe',
                        'image': 'sha256:c50beb2ebdfe251c9bfbc237c146b83948a51f2c26fe3e4c3ddf0f15de3498fe',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '5.20',
                'items': [
                    {
                        'created': '2017-03-15T15:46:37Z',
                        'dockerImageReference': 'centos/perl-520-centos7@sha256:c50beb2ebdfe251c9bfbc237c146b83948a51f2c26fe3e4c3ddf0f15de3498fe',
                        'image': 'sha256:c50beb2ebdfe251c9bfbc237c146b83948a51f2c26fe3e4c3ddf0f15de3498fe',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '5.16',
                'items': [
                    {
                        'created': '2017-03-15T15:46:37Z',
                        'dockerImageReference': 'openshift/perl-516-centos7@sha256:e2d681b6e3b7e8eedf2fbb288c3e6587db6fd2b7a4aa55dd3a8ab032094dfa8c',
                        'image': 'sha256:e2d681b6e3b7e8eedf2fbb288c3e6587db6fd2b7a4aa55dd3a8ab032094dfa8c',
                        'generation': 2
                    }
                ]
            }
        ]
    },
    'kind': 'ImageStream',
        'apiVersion': 'v1'
},
    'php': {
    'metadata': {
        'name': 'php',
            'namespace': 'openshift',
            'selfLink': '/oapi/v1/namespaces/openshift/imagestreams/php',
            'uid': 'php',
            'resourceVersion': '601',
            'generation': 2,
            'creationTimestamp': '2017-03-15T15:46:24Z',
            'annotations': {
            'openshift.io/display-name': 'PHP',
                'openshift.io/image.dockerRepositoryCheck': '2017-03-15T15:46:38Z'
        }
    },
    'spec': {
        'tags': [
            {
                'name': '5.5',
                'annotations': {
                    'description': 'Build and run PHP 5.5 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-php-container/blob/master/5.5/README.md.',
                    'iconClass': 'icon-php',
                    'openshift.io/display-name': 'PHP 5.5',
                    'sampleRepo': 'https://github.com/openshift/cakephp-ex.git',
                    'supports': 'php:5.5,php',
                    'tags': 'builder,php',
                    'version': '5.5'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/php-55-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '5.6',
                'annotations': {
                    'description': 'Build and run PHP 5.6 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-php-container/blob/master/5.6/README.md.',
                    'iconClass': 'icon-php',
                    'openshift.io/display-name': 'PHP 5.6',
                    'sampleRepo': 'https://github.com/openshift/cakephp-ex.git',
                    'supports': 'php:5.6,php',
                    'tags': 'builder,php',
                    'version': '5.6'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/php-56-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': 'latest',
                'annotations': {
                    'description': 'Build and run PHP applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-php-container/blob/master/5.6/README.md.\n\nWARNING: By selecting this tag, your application will automatically update to use the latest version of PHP available on OpenShift, including major versions updates.',
                    'iconClass': 'icon-php',
                    'openshift.io/display-name': 'PHP (Latest)',
                    'sampleRepo': 'https://github.com/openshift/cakephp-ex.git',
                    'supports': 'php',
                    'tags': 'builder,php'
                },
                'from': {
                    'kind': 'ImageStreamTag',
                    'name': '5.6'
                },
                'generation': 1,
                'importPolicy': {}
            }
        ]
    },
    'status': {
        'dockerImageRepository': '172.30.112.149:5000/openshift/php',
            'tags': [
            {
                'tag': 'latest',
                'items': [
                    {
                        'created': '2017-03-15T15:46:38Z',
                        'dockerImageReference': 'centos/php-56-centos7@sha256:623533ff969768a4f07cc6cc9807fe8ce455b8a74574a8528925efde810038cb',
                        'image': 'sha256:623533ff969768a4f07cc6cc9807fe8ce455b8a74574a8528925efde810038cb',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '5.6',
                'items': [
                    {
                        'created': '2017-03-15T15:46:38Z',
                        'dockerImageReference': 'centos/php-56-centos7@sha256:623533ff969768a4f07cc6cc9807fe8ce455b8a74574a8528925efde810038cb',
                        'image': 'sha256:623533ff969768a4f07cc6cc9807fe8ce455b8a74574a8528925efde810038cb',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '5.5',
                'items': [
                    {
                        'created': '2017-03-15T15:46:38Z',
                        'dockerImageReference': 'openshift/php-55-centos7@sha256:1478800585f06a6c0feeb8301ceb54059d54816762de9f6b1182c3d52c75ac84',
                        'image': 'sha256:1478800585f06a6c0feeb8301ceb54059d54816762de9f6b1182c3d52c75ac84',
                        'generation': 2
                    }
                ]
            }
        ]
    },
    'kind': 'ImageStream',
        'apiVersion': 'v1'
},
    'postgresql': {
    'metadata': {
        'name': 'postgresql',
            'namespace': 'openshift',
            'selfLink': '/oapi/v1/namespaces/openshift/imagestreams/postgresql',
            'uid': 'postgresql',
            'resourceVersion': '612',
            'generation': 2,
            'creationTimestamp': '2017-03-15T15:46:25Z',
            'annotations': {
            'openshift.io/display-name': 'PostgreSQL',
                'openshift.io/image.dockerRepositoryCheck': '2017-03-15T15:46:40Z'
        }
    },
    'spec': {
        'tags': [
            {
                'name': '9.2',
                'annotations': {
                    'description': 'Provides a PostgreSQL 9.2 database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/postgresql-container/tree/master/9.2.',
                    'iconClass': 'icon-postgresql',
                    'openshift.io/display-name': 'PostgreSQL 9.2',
                    'tags': 'postgresql',
                    'version': '9.2'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/postgresql-92-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '9.4',
                'annotations': {
                    'description': 'Provides a PostgreSQL 9.4 database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/postgresql-container/tree/master/9.4.',
                    'iconClass': 'icon-postgresql',
                    'openshift.io/display-name': 'PostgreSQL 9.4',
                    'tags': 'postgresql',
                    'version': '9.4'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/postgresql-94-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '9.5',
                'annotations': {
                    'description': 'Provides a PostgreSQL 9.5 database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/postgresql-container/tree/master/9.5.',
                    'iconClass': 'icon-postgresql',
                    'openshift.io/display-name': 'PostgreSQL 9.5',
                    'tags': 'postgresql',
                    'version': '9.5'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/postgresql-95-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': 'latest',
                'annotations': {
                    'description': 'Provides a PostgreSQL database on CentOS 7. For more information about using this database image, including OpenShift considerations, see https://github.com/sclorg/postgresql-container/tree/master/9.5.\n\nWARNING: By selecting this tag, your application will automatically update to use the latest version of PostgreSQL available on OpenShift, including major versions updates.',
                    'iconClass': 'icon-postgresql',
                    'openshift.io/display-name': 'PostgreSQL (Latest)',
                    'tags': 'postgresql'
                },
                'from': {
                    'kind': 'ImageStreamTag',
                    'name': '9.5'
                },
                'generation': 1,
                'importPolicy': {}
            }
        ]
    },
    'status': {
        'dockerImageRepository': '172.30.112.149:5000/openshift/postgresql',
            'tags': [
            {
                'tag': 'latest',
                'items': [
                    {
                        'created': '2017-03-15T15:46:40Z',
                        'dockerImageReference': 'centos/postgresql-95-centos7@sha256:689345da8f0544e2603159e5bfa70becc9323c6a5c71e672d754ff7e894e3242',
                        'image': 'sha256:689345da8f0544e2603159e5bfa70becc9323c6a5c71e672d754ff7e894e3242',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '9.5',
                'items': [
                    {
                        'created': '2017-03-15T15:46:40Z',
                        'dockerImageReference': 'centos/postgresql-95-centos7@sha256:689345da8f0544e2603159e5bfa70becc9323c6a5c71e672d754ff7e894e3242',
                        'image': 'sha256:689345da8f0544e2603159e5bfa70becc9323c6a5c71e672d754ff7e894e3242',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '9.4',
                'items': [
                    {
                        'created': '2017-03-15T15:46:40Z',
                        'dockerImageReference': 'centos/postgresql-94-centos7@sha256:5ea1c39eb6e7caffd7bb346d3396083f455997f2f23c723d2c9c2f4642b511c9',
                        'image': 'sha256:5ea1c39eb6e7caffd7bb346d3396083f455997f2f23c723d2c9c2f4642b511c9',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '9.2',
                'items': [
                    {
                        'created': '2017-03-15T15:46:40Z',
                        'dockerImageReference': 'openshift/postgresql-92-centos7@sha256:dbd4b6fef477e49bff9703ee70d20a2c48f68023562ebecc264d0b87a7fa270e',
                        'image': 'sha256:dbd4b6fef477e49bff9703ee70d20a2c48f68023562ebecc264d0b87a7fa270e',
                        'generation': 2
                    }
                ]
            }
        ]
    },
    'kind': 'ImageStream',
        'apiVersion': 'v1'
},
    'python': {
    'metadata': {
        'name': 'python',
            'namespace': 'openshift',
            'selfLink': '/oapi/v1/namespaces/openshift/imagestreams/python',
            'uid': 'python',
            'resourceVersion': '573',
            'generation': 2,
            'creationTimestamp': '2017-03-15T15:46:24Z',
            'annotations': {
            'openshift.io/display-name': 'Python',
                'openshift.io/image.dockerRepositoryCheck': '2017-03-15T15:46:27Z'
        }
    },
    'spec': {
        'tags': [
            {
                'name': '2.7',
                'annotations': {
                    'description': 'Build and run Python 2.7 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-python-container/blob/master/2.7/README.md.',
                    'iconClass': 'icon-python',
                    'openshift.io/display-name': 'Python 2.7',
                    'sampleRepo': 'https://github.com/openshift/django-ex.git',
                    'supports': 'python:2.7,python',
                    'tags': 'builder,python',
                    'version': '2.7'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/python-27-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '3.3',
                'annotations': {
                    'description': 'Build and run Python 3.3 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-python-container/blob/master/3.3/README.md.',
                    'iconClass': 'icon-python',
                    'openshift.io/display-name': 'Python 3.3',
                    'sampleRepo': 'https://github.com/openshift/django-ex.git',
                    'supports': 'python:3.3,python',
                    'tags': 'builder,python',
                    'version': '3.3'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/python-33-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '3.4',
                'annotations': {
                    'description': 'Build and run Python 3.4 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-python-container/blob/master/3.4/README.md.',
                    'iconClass': 'icon-python',
                    'openshift.io/display-name': 'Python 3.4',
                    'sampleRepo': 'https://github.com/openshift/django-ex.git',
                    'supports': 'python:3.4,python',
                    'tags': 'builder,python',
                    'version': '3.4'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/python-34-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '3.5',
                'annotations': {
                    'description': 'Build and run Python 3.5 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-python-container/blob/master/3.5/README.md.',
                    'iconClass': 'icon-python',
                    'openshift.io/display-name': 'Python 3.5',
                    'sampleRepo': 'https://github.com/openshift/django-ex.git',
                    'supports': 'python:3.5,python',
                    'tags': 'builder,python',
                    'version': '3.5'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/python-35-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': 'latest',
                'annotations': {
                    'description': 'Build and run Python applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-python-container/blob/master/3.5/README.md.\n\nWARNING: By selecting this tag, your application will automatically update to use the latest version of Python available on OpenShift, including major versions updates.',
                    'iconClass': 'icon-python',
                    'openshift.io/display-name': 'Python (Latest)',
                    'sampleRepo': 'https://github.com/openshift/django-ex.git',
                    'supports': 'python',
                    'tags': 'builder,python'
                },
                'from': {
                    'kind': 'ImageStreamTag',
                    'name': '3.5'
                },
                'generation': 1,
                'importPolicy': {}
            }
        ]
    },
    'status': {
        'dockerImageRepository': '172.30.112.149:5000/openshift/python',
            'tags': [
            {
                'tag': 'latest',
                'items': [
                    {
                        'created': '2017-03-15T15:46:27Z',
                        'dockerImageReference': 'centos/python-35-centos7@sha256:56511e27744dd5d40450fcdf6e8e0a8c3d581cdef6c62d068e0ba840fa281f07',
                        'image': 'sha256:56511e27744dd5d40450fcdf6e8e0a8c3d581cdef6c62d068e0ba840fa281f07',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '3.5',
                'items': [
                    {
                        'created': '2017-03-15T15:46:27Z',
                        'dockerImageReference': 'centos/python-35-centos7@sha256:56511e27744dd5d40450fcdf6e8e0a8c3d581cdef6c62d068e0ba840fa281f07',
                        'image': 'sha256:56511e27744dd5d40450fcdf6e8e0a8c3d581cdef6c62d068e0ba840fa281f07',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '3.4',
                'items': [
                    {
                        'created': '2017-03-15T15:46:27Z',
                        'dockerImageReference': 'centos/python-34-centos7@sha256:bcb4cb788a1b2eba1e5efb4a3a584620613e724aa3a9f7c0ea5f67d615c7d2ed',
                        'image': 'sha256:bcb4cb788a1b2eba1e5efb4a3a584620613e724aa3a9f7c0ea5f67d615c7d2ed',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '3.3',
                'items': [
                    {
                        'created': '2017-03-15T15:46:27Z',
                        'dockerImageReference': 'openshift/python-33-centos7@sha256:7bbc639e8cb6404682957a671f16408b0d039998671c96bd2cb34a224a820e5a',
                        'image': 'sha256:7bbc639e8cb6404682957a671f16408b0d039998671c96bd2cb34a224a820e5a',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '2.7',
                'items': [
                    {
                        'created': '2017-03-15T15:46:27Z',
                        'dockerImageReference': 'centos/python-27-centos7@sha256:34b83204d41fad69d90905a8e6851c6f2074128a8d993a7b3ac39860e517bd51',
                        'image': 'sha256:34b83204d41fad69d90905a8e6851c6f2074128a8d993a7b3ac39860e517bd51',
                        'generation': 2
                    }
                ]
            }
        ]
    },
    'kind': 'ImageStream',
        'apiVersion': 'v1'
},
    'ruby': {
    'metadata': {
        'name': 'ruby',
            'namespace': 'openshift',
            'selfLink': '/oapi/v1/namespaces/openshift/imagestreams/ruby',
            'uid': 'ruby',
            'resourceVersion': '591',
            'generation': 2,
            'creationTimestamp': '2017-03-15T15:46:24Z',
            'annotations': {
            'openshift.io/display-name': 'Ruby',
                'openshift.io/image.dockerRepositoryCheck': '2017-03-15T15:46:34Z'
        }
    },
    'spec': {
        'tags': [
            {
                'name': '2.0',
                'annotations': {
                    'description': 'Build and run Ruby 2.0 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-ruby-container/tree/master/2.0/README.md.',
                    'iconClass': 'icon-ruby',
                    'openshift.io/display-name': 'Ruby 2.0',
                    'sampleRepo': 'https://github.com/openshift/ruby-ex.git',
                    'supports': 'ruby:2.0,ruby',
                    'tags': 'builder,ruby',
                    'version': '2.0'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/ruby-20-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '2.2',
                'annotations': {
                    'description': 'Build and run Ruby 2.2 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-ruby-container/tree/master/2.2/README.md.',
                    'iconClass': 'icon-ruby',
                    'openshift.io/display-name': 'Ruby 2.2',
                    'sampleRepo': 'https://github.com/openshift/ruby-ex.git',
                    'supports': 'ruby:2.2,ruby',
                    'tags': 'builder,ruby',
                    'version': '2.2'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/ruby-22-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '2.3',
                'annotations': {
                    'description': 'Build and run Ruby 2.3 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-ruby-container/blob/master/2.3/README.md.',
                    'iconClass': 'icon-ruby',
                    'openshift.io/display-name': 'Ruby 2.3',
                    'sampleRepo': 'https://github.com/openshift/ruby-ex.git',
                    'supports': 'ruby:2.3,ruby',
                    'tags': 'builder,ruby',
                    'version': '2.3'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'centos/ruby-23-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': 'latest',
                'annotations': {
                    'description': 'Build and run Ruby applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-ruby-container/tree/master/2.3/README.md.\n\nWARNING: By selecting this tag, your application will automatically update to use the latest version of Ruby available on OpenShift, including major versions updates.',
                    'iconClass': 'icon-ruby',
                    'openshift.io/display-name': 'Ruby (Latest)',
                    'sampleRepo': 'https://github.com/openshift/ruby-ex.git',
                    'supports': 'ruby',
                    'tags': 'builder,ruby'
                },
                'from': {
                    'kind': 'ImageStreamTag',
                    'name': '2.3'
                },
                'generation': 1,
                'importPolicy': {}
            }
        ]
    },
    'status': {
        'dockerImageRepository': '172.30.112.149:5000/openshift/ruby',
            'tags': [
            {
                'tag': 'latest',
                'items': [
                    {
                        'created': '2017-03-15T15:46:34Z',
                        'dockerImageReference': 'centos/ruby-23-centos7@sha256:5d337be62fbca4690324837ad985719bcf60436b595549137766049938b50b8d',
                        'image': 'sha256:5d337be62fbca4690324837ad985719bcf60436b595549137766049938b50b8d',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '2.3',
                'items': [
                    {
                        'created': '2017-03-15T15:46:34Z',
                        'dockerImageReference': 'centos/ruby-23-centos7@sha256:5d337be62fbca4690324837ad985719bcf60436b595549137766049938b50b8d',
                        'image': 'sha256:5d337be62fbca4690324837ad985719bcf60436b595549137766049938b50b8d',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '2.2',
                'items': [
                    {
                        'created': '2017-03-15T15:46:34Z',
                        'dockerImageReference': 'centos/ruby-22-centos7@sha256:9182cb1502d5967bbc727488586ee4b52da9d509f0d7d01bf14c3fb2faa39c43',
                        'image': 'sha256:9182cb1502d5967bbc727488586ee4b52da9d509f0d7d01bf14c3fb2faa39c43',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '2.0',
                'items': [
                    {
                        'created': '2017-03-15T15:46:34Z',
                        'dockerImageReference': 'openshift/ruby-20-centos7@sha256:751a3cd1905914389fe568c25b3d5367cd705a0e4f81970a361f670ce891baf7',
                        'image': 'sha256:751a3cd1905914389fe568c25b3d5367cd705a0e4f81970a361f670ce891baf7',
                        'generation': 2
                    }
                ]
            }
        ]
    },
    'kind': 'ImageStream',
        'apiVersion': 'v1'
},
    'wildfly': {
    'metadata': {
        'name': 'wildfly',
            'namespace': 'openshift',
            'selfLink': '/oapi/v1/namespaces/openshift/imagestreams/wildfly',
            'uid': 'wildfly',
            'resourceVersion': '580',
            'generation': 2,
            'creationTimestamp': '2017-03-15T15:46:25Z',
            'annotations': {
            'openshift.io/display-name': 'WildFly',
                'openshift.io/image.dockerRepositoryCheck': '2017-03-15T15:46:32Z'
        }
    },
    'spec': {
        'tags': [
            {
                'name': '10.0',
                'annotations': {
                    'description': 'Build and run WildFly 10.0 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/master/README.md.',
                    'iconClass': 'icon-wildfly',
                    'openshift.io/display-name': 'WildFly 10.0',
                    'sampleRepo': 'https://github.com/bparees/openshift-jee-sample.git',
                    'supports': 'wildfly:10.0,jee,java',
                    'tags': 'builder,wildfly,java',
                    'version': '10.0'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/wildfly-100-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '10.1',
                'annotations': {
                    'description': 'Build and run WildFly 10.1 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/master/README.md.',
                    'iconClass': 'icon-wildfly',
                    'openshift.io/display-name': 'WildFly 10.1',
                    'sampleRepo': 'https://github.com/bparees/openshift-jee-sample.git',
                    'supports': 'wildfly:10.1,jee,java',
                    'tags': 'builder,wildfly,java',
                    'version': '10.1'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/wildfly-101-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '8.1',
                'annotations': {
                    'description': 'Build and run WildFly 8.1 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/master/README.md.',
                    'iconClass': 'icon-wildfly',
                    'openshift.io/display-name': 'WildFly 8.1',
                    'sampleRepo': 'https://github.com/bparees/openshift-jee-sample.git',
                    'supports': 'wildfly:8.1,jee,java',
                    'tags': 'builder,wildfly,java',
                    'version': '8.1'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/wildfly-81-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': '9.0',
                'annotations': {
                    'description': 'Build and run WildFly 9.0 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/master/README.md.',
                    'iconClass': 'icon-wildfly',
                    'openshift.io/display-name': 'WildFly 9.0',
                    'sampleRepo': 'https://github.com/bparees/openshift-jee-sample.git',
                    'supports': 'wildfly:9.0,jee,java',
                    'tags': 'builder,wildfly,java',
                    'version': '9.0'
                },
                'from': {
                    'kind': 'DockerImage',
                    'name': 'openshift/wildfly-90-centos7:latest'
                },
                'generation': 2,
                'importPolicy': {}
            },
            {
                'name': 'latest',
                'annotations': {
                    'description': 'Build and run WildFly applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/master/README.md.\n\nWARNING: By selecting this tag, your application will automatically update to use the latest version of WildFly available on OpenShift, including major versions updates.',
                    'iconClass': 'icon-wildfly',
                    'openshift.io/display-name': 'WildFly (Latest)',
                    'sampleRepo': 'https://github.com/bparees/openshift-jee-sample.git',
                    'supports': 'jee,java',
                    'tags': 'builder,wildfly,java'
                },
                'from': {
                    'kind': 'ImageStreamTag',
                    'name': '10.1'
                },
                'generation': 1,
                'importPolicy': {}
            }
        ]
    },
    'status': {
        'dockerImageRepository': '172.30.112.149:5000/openshift/wildfly',
            'tags': [
            {
                'tag': 'latest',
                'items': [
                    {
                        'created': '2017-03-15T15:46:32Z',
                        'dockerImageReference': 'openshift/wildfly-101-centos7@sha256:eaf611d4bb9d542554d413817a5ded88f4f3716c481cd7721aff0129bd82e7a4',
                        'image': 'sha256:eaf611d4bb9d542554d413817a5ded88f4f3716c481cd7721aff0129bd82e7a4',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '10.1',
                'items': [
                    {
                        'created': '2017-03-15T15:46:32Z',
                        'dockerImageReference': 'openshift/wildfly-101-centos7@sha256:eaf611d4bb9d542554d413817a5ded88f4f3716c481cd7721aff0129bd82e7a4',
                        'image': 'sha256:eaf611d4bb9d542554d413817a5ded88f4f3716c481cd7721aff0129bd82e7a4',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '10.0',
                'items': [
                    {
                        'created': '2017-03-15T15:46:32Z',
                        'dockerImageReference': 'openshift/wildfly-100-centos7@sha256:362997b1fa9c7d1d92655a445788a7484d43d8470a2c3b5c426021fa7a9ae3ca',
                        'image': 'sha256:362997b1fa9c7d1d92655a445788a7484d43d8470a2c3b5c426021fa7a9ae3ca',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '9.0',
                'items': [
                    {
                        'created': '2017-03-15T15:46:32Z',
                        'dockerImageReference': 'openshift/wildfly-90-centos7@sha256:5cce0e993437800c6f698482bd35fd4bb478223f683d3ee6a68d15b65655f41e',
                        'image': 'sha256:5cce0e993437800c6f698482bd35fd4bb478223f683d3ee6a68d15b65655f41e',
                        'generation': 2
                    }
                ]
            },
            {
                'tag': '8.1',
                'items': [
                    {
                        'created': '2017-03-15T15:46:32Z',
                        'dockerImageReference': 'openshift/wildfly-81-centos7@sha256:432d4c2cf776a4c524a2237aa7adb08761e687c470c8d6c0bc8200dc9e174a6b',
                        'image': 'sha256:432d4c2cf776a4c524a2237aa7adb08761e687c470c8d6c0bc8200dc9e174a6b',
                        'generation': 2
                    }
                ]
            }
        ]
    },
    'kind': 'ImageStream',
        'apiVersion': 'v1'
},
    'hidden': {
        'metadata': {
            'name': 'hidden'
        },
        'spec': {
            'tags': [
                {
                    'name': '1',
                    'annotations': {
                        'tags': 'fooBar, builder, hidden',
                    }
                }
            ]
        },
        'status': {
            'tags': [
                {
                    'tag': '1'
                }
            ]
        }
    },
    'no-spec-tag': {
        'metadata': {
            'name': 'no-spec-tag'
        },
        'spec': {
            'tags': [
                {
                    'name': '1',
                    'annotations': {
                        'tags': 'fooBar, builder',
                    }
                }
            ]
        },
        'status': {
            'tags': [
                {
                    'tag': '2'
                }
            ]
        }
    }
};
