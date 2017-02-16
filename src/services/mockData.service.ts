export class MockDataService {
    public getServices(): any {
        return [
            {name: '*WildFly', icon: 'font-icon icon-openjdk', category: 'languages', subCategory: 'java', featured: true},
            {name: 'Oracle Java', icon: 'font-icon icon-openjdk', category: 'languages', subCategory: 'java'},
            {name: '*Node.js', icon: 'font-icon icon-js', category: 'languages', subCategory: 'javascript', featured: true},
            {name: 'Node.js + MongoDB (Ephemeral)', icon: 'font-icon icon-js', category: 'languages', subCategory: 'javascript'},
            {name: '*Perl', icon: 'font-icon icon-perl', category: 'languages', subCategory: 'perl', featured: true},
            {name: 'Dancer + MySQL (Ephemeral)', icon: 'font-icon icon-perl', category: 'languages', subCategory: 'perl'},
            {name: '*Ruby', icon: 'font-icon icon-ruby', category: 'languages', subCategory: 'ruby', featured: true},
            {name: 'Rails + PostgreSQL (Ephemeral)', icon: 'font-icon icon-ruby', category: 'languages', subCategory: 'ruby'},
            {name: '*PHP', icon: 'font-icon icon-php', category: 'languages', subCategory: 'php', featured: true},
            {name: 'CakePHP + MySQL (Ephemeral)', icon: 'font-icon icon-php', category: 'languages', subCategory: 'php'},
            {name: '*Python', icon: 'font-icon icon-python', category: 'languages', subCategory: 'python', featured: true},
            {name: 'Django + PostgreSQL (Ephemeral)', icon: 'font-icon icon-python', category: 'languages', subCategory: 'python'},
            {name: '*Mongo  (Ephemeral)', icon: 'font-icon icon-mongodb', category: 'databases', subCategory: 'mongo', featured: true},
            {name: '*mySQL  (Ephemeral)', icon: 'font-icon icon-mysql-database', category: 'databases', subCategory: 'mysql', featured: true},
            {name: 'Postgres (Ephemeral)', icon: 'font-icon icon-postgresql', category: 'databases', subCategory: 'postgres'},
            {name: 'MariaDB (Ephemeral)', icon: 'font-icon icon-mariadb', category: 'databases', subCategory: 'mariadb'},
            {name: '*Red Hat JBoss EAP', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'jboss', featured: true},
            {name: 'JBoss EAP Client', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'jboss'},
            {name: '*Fuse', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'fuse', featured: true},
            {name: '*Red Hat JBoss A-MQ', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'amq', featured: true},
            {name: 'JBoss A-MQ Client', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'amq'},
            {name: '*Red Hat JBoss BPM Suite', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'bpm', featured: true},
            {name:  'Red Hat JBoss BRMS', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'bpm'},
            {name: '*Jenkins', icon: 'font-icon icon-openjdk', category: 'cicd', subCategory: 'jenkins', featured: true},
            {name: 'Jenkins Client', icon: 'font-icon icon-jenkins', category: 'cicd', subCategory: 'jenkins'},
            {name: '*Pipeline', icon: 'fa fa-clone', category: 'cicd', subCategory: 'pipelines', featured: true},
            {name: 'Pipeline Client', icon: 'fa fa-clone', category: 'cicd', subCategory: 'pipelines'},
        ];
    }
}
