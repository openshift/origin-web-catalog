/// <reference types="angular" />
/// <reference types="angular-mocks" />

// this file is an entry point for angular tests
// avoids some weird issues when using webpack + angular.

requireAll((<any>require).context('./', true, /spec.ts$/));
function requireAll(r: any): any {
    r.keys().forEach(r);
}
