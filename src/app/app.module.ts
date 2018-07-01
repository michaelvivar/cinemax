import { NgModule, Injector } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireStorageModule } from "angularfire2/storage";
import { environment } from "environments/environment";
import { AppComponent } from "./app.component";
import { ConfirmDialog } from "@components/confirm-dialog/confirm-dialog.component";
import { AlertDialog } from "@components/alert-dialog/alert-dialog.component";
import { NavMenuComponent } from "@components/nav-menu/nav-menu.component";
import { AdminGuard } from "@guards/admin.guard";
import { ModulePreloadingStrategy } from "@utils/preloading-strategy";
import { AuthGuard } from "@guards/auth.guard";
import { ConfirmExitGuard } from "@guards/confirm-exit.guard";
import { ServiceLocator } from "@utils/service-locator";
import { AppState } from "@stores/states/app.state";
import { TheaterState } from "@stores/states/theater.state";
import { CinemaState } from "@stores/states/cinema.state";
import { MovieState } from "@stores/states/movie.state";
import { SeatsState } from "@stores/states/seats.state";
import { MovieModule } from "@modules/movie/movie.module";
import { TheaterModule } from "@modules/theater/theater.module";
import { UserModule } from "@user/user.module";

import { MatProgressBarModule, MatButtonModule, MatDialogModule, MatToolbarModule, MatMenuModule } from '@angular/material';
const materials = [MatProgressBarModule, MatButtonModule, MatDialogModule, MatToolbarModule, MatMenuModule];

import { routes, pages } from '@pages/routes';

@NgModule({
   declarations: [
      AppComponent,
      ...pages,
      ConfirmDialog,
      AlertDialog,
      NavMenuComponent
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
      MovieModule,
      TheaterModule
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