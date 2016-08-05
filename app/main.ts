/**
 * Created by tithomas on 7/29/16
 *
 * This is the main entry point for a simple frontend SPA (single page application)
 * to experiment with Angular2 components, routing, services, etc
 */


import { bootstrap }         from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS }    from '@angular/http';

import { AppComponent }      from './app.component';
import { appRouteProviders } from './app.routes';

// Make the Router available to everything

bootstrap(AppComponent, [appRouteProviders, HTTP_PROVIDERS]).catch(err => console.error(err));