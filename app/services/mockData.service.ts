export class MockDataService {

  private serviceCategories = [
    {id: 'languages', label: 'Languages', subCategories: [
      {id: 'java', label: 'Java', icon: 'font-icon icon-openjdk'},
      {id: 'javascript', label: 'Javascript', icon: 'font-icon icon-js'},
      {id: 'perl', label: 'Perl', icon: 'font-icon icon-perl'},
      {id: 'ruby', label: 'Ruby', icon: 'font-icon icon-ruby'},
      {id: 'php', label: 'PHP', icon: 'font-icon icon-php'},
      {id: 'python', label: 'Python', icon: 'font-icon icon-python'}
    ]},
    {id: 'databases', label: 'Databases', subCategories: [
      {id: 'mongo', label: 'Mongo', icon: 'font-icon icon-mongodb'},
      {id: 'mysql', label: 'mySQL', icon: 'font-icon icon-mysql-database'},
      {id: 'postgres', label: 'Postgres', icon: 'font-icon icon-postgresql'},
      {id: 'mariadb', label: 'MariaDB', icon: 'font-icon icon-mariadb'}
    ]},
    {id: 'middleware', label: 'Middleware', subCategories: [
      {id: 'jboss', label: 'JBoss', icon: 'font-icon icon-openjdk'},
      {id: 'fuse', label: 'Fuse', icon: 'font-icon icon-openjdk'},
      {id: 'amq', label: 'A-MQ', icon: 'font-icon icon-openjdk'},
      {id: 'bpm', label: 'BPM', icon: 'font-icon icon-openjdk'}
    ]},
    {id: 'cicd', label: 'CI/CD', subCategories: [
      {id: 'jenkins', label: 'Jenkins', icon: 'font-icon icon-jenkins'},
      {id: 'pipelines', label: 'Pipelines', icon: 'fa fa-clone'}
    ]}
  ];

  public getServiceCategories(): any {
    return this.serviceCategories;
  }

  public getServices(): any {
    return [
      {id: 1, name:  'WildFly', icon: 'font-icon icon-wildfly', category: 'languages', subCategory: 'java'},
      {id: 2, name:  'Oracle Java', icon: 'font-icon icon-openjdk', category: 'languages', subCategory: 'java'},
      {id: 3, name:  'Node.js', icon: 'font-icon icon-js', category: 'languages', subCategory: 'javascript'},
      {id: 4, name:  'Node.js + MongoDB (Ephemeral)', icon: 'font-icon icon-js', category: 'languages', subCategory: 'javascript'},
      {id: 5, name:  'Perl', icon: 'font-icon icon-perl', category: 'languages', subCategory: 'perl'},
      {id: 6, name:  'Dancer + MySQL (Ephemeral)', icon: 'font-icon icon-perl', category: 'languages', subCategory: 'perl'},
      {id: 7, name:  'Ruby', icon: 'font-icon icon-ruby', category: 'languages', subCategory: 'ruby'},
      {id: 8, name:  'Rails + PostgreSQL (Ephemeral)', icon: 'font-icon icon-ruby', category: 'languages', subCategory: 'ruby'},
      {id: 9, name:  'PHP', icon: 'font-icon icon-php', category: 'languages', subCategory: 'php'},
      {id: 10, name: 'CakePHP + MySQL (Ephemeral)', icon: 'font-icon icon-php', category: 'languages', subCategory: 'php'},
      {id: 11, name: 'Python', icon: 'font-icon icon-python', category: 'languages', subCategory: 'python'},
      {id: 12, name: 'Django + PostgreSQL (Ephemeral)', icon: 'font-icon icon-python', category: 'languages', subCategory: 'python'},
      {id: 13, name: 'Mongo  (Ephemeral)', icon: 'font-icon icon-mongodb', category: 'databases', subCategory: 'mongo'},
      {id: 14, name: 'mySQL  (Ephemeral)', icon: 'font-icon icon-mysql-database', category: 'databases', subCategory: 'mysql'},
      {id: 15, name: 'Postgres (Ephemeral)', icon: 'font-icon icon-postgresql', category: 'databases', subCategory: 'postgres'},
      {id: 16, name: 'MariaDB (Ephemeral)', icon: 'font-icon icon-mariadb', category: 'databases', subCategory: 'mariadb'},
      {id: 17, name: 'Red Hat JBoss EAP', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'jboss'},
      {id: 18, name: 'JBoss EAP Client', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'jboss'},
      {id: 19, name: 'Fuse', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'fuse'},
      {id: 20, name: 'Red Hat JBoss A-MQ', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'amq'},
      {id: 21, name: 'JBoss A-MQ Client', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'amq'},
      {id: 22, name: 'Red Hat JBoss BPM Suite', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'bpm'},
      {id: 23, name: 'Red Hat JBoss BRMS', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'bpm'},
      {id: 24, name: 'Jenkins', icon: 'font-icon icon-openjdk', category: 'cicd', subCategory: 'jenkins'},
      {id: 25, name: 'Jenkins Client', icon: 'font-icon icon-jenkins', category: 'cicd', subCategory: 'jenkins'},
      {id: 26, name: 'Pipeline', icon: 'fa fa-clone', category: 'cicd', subCategory: 'pipelines'},
      {id: 27, name: 'Pipeline Client', icon: 'fa fa-clone', category: 'cicd', subCategory: 'pipelines'},
    ];
  }

  public getServiceDetails(serviceId: number): any {
    let details = {};

    switch (serviceId) {
      case 1:
        details = { descTitle: 'BUILDS SOURCE CODE',
                    description: 'Build and run WildFly 10.1 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
                    versions: ['10.1 -- latest', '10.0', '9.0', '8.1']};
        break;
    }

    return details;
  }

  public getServicePrices(serviceId: number): any {
    let prices = [];

    switch (serviceId) {
      case 1:
        prices = [
            {managed: 'Red Hat', infrastructure: 'Dedicated', infraDetail: 'Topic', infraPrice: '$.65 / 1 Million messages'},
            {managed: 'Red Hat', infrastructure: 'Dedicated', infraDetail: 'Queue', infraPrice: '$.65 / 1 Million messages'},
            {managed: 'Red Hat', infrastructure: 'Shared',    infraDetail: 'Topic', infraPrice: '$.60 / 1 Million messages'},
            {managed: 'Red Hat', infrastructure: 'Shared',    infraDetail: 'Queue', infraPrice: '$.60 / 1 Million messages'},
            {managed: 'Self',    infrastructure: 'Dedicated', infraDetail: 'Topic', infraPrice: '$12 / instance'},
            {managed: 'Self',    infrastructure: 'Dedicated', infraDetail: 'Queue', infraPrice: '$12 / instance'}
        ];
        break;
    }

    return prices;
  }
}
