// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'http://127.0.0.1:8000',
  mapbox: {
    accessToken: 'pk.eyJ1Ijoibmlja3ZlcnN0b2NrZW4iLCJhIjoiY2o4cnhseHhqMDJqYzJxcXU4ZzV3ZW54ayJ9.bnPqSBV_ZuvYuM3NwTkayg'
  },
  pusher: {
    key: '3ff7ec1b2f475958d3ae',
  }
};
