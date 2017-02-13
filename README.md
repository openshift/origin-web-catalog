OpenShift Catalog Conaole Library
=========================
A component libary created for the cataloging components for [The OpenShift Web Console](https://github.com/openshift/origin-web-console).

[![Build Status](https://travis-ci.org/openshift/origin-web-catalog.svg?branch=master)](https://travis-ci.org/openshift/origin-web-catalog)

## Quick start

```
# install the dependencies with npm
$ npm install

# start the server
$ npm start
```

Go to [http://localhost:8080](http://localhost:8080) in your browser.

>Warning: Make sure you're using the latest version of Node.js and NPM

Contributing
------------

#### Getting started
1. Install [Nodejs](http://nodejs.org/) and [npm](https://www.npmjs.org/)
2. Install [grunt-cli](http://gruntjs.com/installing-grunt) and [bower](http://bower.io/) by running `npm install -g grunt-cli bower` (may need to be run with sudo)
3. Build the library with 'npm run build'
4. Run the test server with 'npm run server'
5. Launch a browser at http://localhost:8080/ this will watch for asset changes.

## Testing (NYI)

### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`
