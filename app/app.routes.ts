/**
 * Created by tithomas on 7/29/16
 */

import { provideRouter, RouterConfig } from '@angular/router';

import { dashlet1Routes } from './components/dashlet1/dashlet1.routes';
import { dashlet2Routes } from './components/dashlet2/dashlet2.routes';

const routes: RouterConfig = [
    ...dashlet1Routes,
    ...dashlet2Routes,
];

export const appRouteProviders = [provideRouter(routes)];