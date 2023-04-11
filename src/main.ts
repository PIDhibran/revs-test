import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AppModule } from './app/app.module';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from './environments/environment';

Amplify.configure(environment.aws);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

Auth.configure(environment.aws);
