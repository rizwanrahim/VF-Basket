import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../env/env';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom(
      provideFirebaseApp(() => 
        initializeApp(environment.firebase))), 
        importProvidersFrom(provideAuth(() => getAuth()),
        AngularFireModule.initializeApp(environment.firebase)
      )]
  
};
