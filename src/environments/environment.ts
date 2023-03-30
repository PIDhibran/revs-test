// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  aws: {
    "aws_project_region": "us-east-1",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_CyltbrRI5",
    "aws_user_pools_web_client_id": "4gm9btjd10q0lt3kos8obhni63"
  },
  s3Bucket: '',
  apiUrl: '',
};
