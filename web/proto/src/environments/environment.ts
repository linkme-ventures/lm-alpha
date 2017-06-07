// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC-4JfgQK5sGQ0tkUHLUoK46bBtZGnEpPk",
    authDomain: "linkme-proto.firebaseapp.com",
    databaseURL: "https://linkme-proto.firebaseio.com",
    projectId: "linkme-proto",
    storageBucket: "linkme-proto.appspot.com",
    messagingSenderId: "596474964973"
  }
};