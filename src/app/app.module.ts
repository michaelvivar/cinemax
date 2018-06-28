import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { ConfirmExitGuard } from './guards/confirm-exit.guard';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AppState } from './ngxs/states/app.state';

import { routes, pages } from './pages/routes';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressBarModule, MatButtonModule, MatDialogModule, MatToolbarModule, MatMenuModule } from '@angular/material';
const materials = [MatProgressBarModule, MatButtonModule, MatDialogModule, MatToolbarModule, MatMenuModule];

import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog.component';
import { AlertDialog } from './components/alert-dialog/alert-dialog.component';
import { SeatsState } from './ngxs/states/seats.state';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserModule } from './user/user.module';
import { AuthGuard } from './guards/auth.guard';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { TheaterState } from './ngxs/states/theater.state';
import { CinemaState } from './ngxs/states/cinema.state';
import { MovieState } from './ngxs/states/movie.state';
import { MovieModule } from './modules/movie/movie.module';
import { AdminGuard } from './guards/admin.guard';
import { ModulePreloadingStrategy } from './utils/preloading-strategy';
import { ServiceLocator } from './utils/service-locator';

@NgModule({
  declarations: [
    AppComponent,
    ...pages,
    NotFoundComponent,
    ConfirmDialog,
    AlertDialog,
    NavMenuComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AdminGuard] },
      { path: 'buy', loadChildren: './modules/buy/buy.module#BuyModule' },
      ...routes
    ], { preloadingStrategy: ModulePreloadingStrategy }),
    NgxsModule.forRoot([AppState, TheaterState, CinemaState, MovieState, SeatsState]),
    NgxsStoragePluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
    ...materials,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    UserModule,
    MovieModule
  ],
  providers: [ConfirmExitGuard, AuthGuard, AdminGuard, ModulePreloadingStrategy],
  bootstrap: [AppComponent],
  entryComponents: [AlertDialog, ConfirmDialog]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
