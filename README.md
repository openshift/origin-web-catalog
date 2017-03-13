OpenShift Catalog Conaole Library
=========================
A component libary created for the cataloging components for [The OpenShift Web Console](https://github.com/openshift/origin-web-console).

[![Build Status](https://travis-ci.org/openshift/origin-web-catalog.svg?branch=master)](https://travis-ci.org/openshift/origin-web-catalog)

## Quick start

```
# install the dependencies with npm and bower
$ npm install
$ bower install

# start the server
$ npm run start
```

Go to [https://localhost:9000](https://localhost:9000) in your browser.

>Warning: Make sure you're using the latest version of Node.js and NPM

Contributing
------------

#### Getting started
1. Install [Nodejs](http://nodejs.org/) and [npm](https://www.npmjs.org/)
2. Build the library with 'npm run build'
3. Run the test server with 'npm run start'
4. Launch a browser at https://localhost:9000/ this will watch for asset changes.

## Testing

### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`
