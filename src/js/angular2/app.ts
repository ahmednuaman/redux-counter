import 'zone.js';
import 'reflect-metadata';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
