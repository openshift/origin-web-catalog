import * as _ from 'lodash';

// Assigns global constants
var redHatApps: any = [
  {id: 1, title:  'Microservices Application', icon: 'fa fa-cubes',  url: 'https://www.redhat.com/en/technologies/virtualization', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.'},
  {id: 2, title:  'Mobile Application', icon: 'fa fa-mobile',  url: 'https://www.redhat.com/en/technologies/mobile', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.'},
  {id: 3, title:  'Integration Application', icon: 'fa fa-plug',  url: 'https://www.redhat.com/en/technologies/cloud-computing', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.'},
  {id: 4, title:  'Business Process Application', icon: 'fa fa-cubes',  url: 'https://www.redhat.com/en/technologies/management', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.'},
];

var categories: any = [
  {id: 'languages', label: 'Languages', iconClassDefault: 'fa fa-code', subCategories: [
    {id: 'java', label: 'Java', icon: 'font-icon icon-openjdk'},
    {id: 'javascript', categoryAliases: ['nodejs', 'js'], label: 'Javascript', icon: 'font-icon icon-js'},
    {id: 'perl', label: 'Perl', icon: 'font-icon icon-perl'},
    {id: 'ruby', label: 'Ruby', icon: 'font-icon icon-ruby'},
    {id: 'php', label: 'PHP', icon: 'font-icon icon-php'},
    {id: 'python', label: 'Python', icon: 'font-icon icon-python'}
  ]},
  {id: 'databases', label: 'Databases', subCategories: [
    {id: 'mongodb', label: 'Mongo', icon: 'font-icon icon-mongodb'},
    {id: 'mysql', label: 'mySQL', icon: 'font-icon icon-mysql-database'},
    {id: 'postgresql', label: 'Postgres', icon: 'font-icon icon-postgresql'},
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

export const allCategories = categories;

_.set(window, 'OPENSHIFT_CONSTANTS.SERVICE_CATALOG_CATEGORIES', categories);
_.set(window, 'OPENSHIFT_CONSTANTS.REDHAT_APPLICATIONS', redHatApps);
