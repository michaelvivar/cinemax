import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Subscription } from 'rxjs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(({ injector }) => {
  //customElements.define('[selector]', createCustomElement(Component, { injector }));

  // window['using'] = (fn: Subscription): void  => {
  //   fn.unsubscribe();
  // }
})
  .catch(err => console.log(err));