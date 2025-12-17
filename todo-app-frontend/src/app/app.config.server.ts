import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

// Temporarily disable automatic server prerender route extraction to avoid build-time
// errors while debugging NG0908. Re-enable `provideServerRendering` once routes
// extraction issues are resolved.
const serverConfig: ApplicationConfig = {
  providers: [
    // provideServerRendering(withRoutes(serverRoutes))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
