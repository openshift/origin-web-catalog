OpenShift Catalog Console Library
=========================
A component library created for the cataloging components for [The OpenShift Web Console](https://github.com/openshift/origin-web-console).

[![Build Status](https://travis-ci.org/openshift/origin-web-catalog.svg?branch=master)](https://travis-ci.org/openshift/origin-web-catalog)

## Quick start

```
# install the dependencies with npm and bower
$ npm install
$ bower install

# build the library
$ npm run build
```

## Showcase Application

There is a showcase application used to help develop and view the existing components in the library.

```
# run the server
$ npm run start
```

Go to [https://localhost:9001](https://localhost:9001) in your browser. (though it should auto-launch)
This will watch for asset changes.

You will need to patch the web console oauth client to allow for port 9001:
```
$ oc login -u system:admin
$ oc patch oauthclient/openshift-web-console -p '{"redirectURIs":["https://localhost:9001/"]}'
```

Contributing
------------

#### Getting started
1. Install [Nodejs](http://nodejs.org/) and [npm](https://www.npmjs.org/)
2. Build the library with 'npm run build'
3. Run the test server with 'npm run start'
4. Launch a browser at https://localhost:9001/ this will watch for asset changes.

## Testing

### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test:watch`
