import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthenticationModule } from './authentication/authentication.module';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify} from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthenticationModule,
    AmplifyAuthenticatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
