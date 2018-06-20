import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ConfirmExitGuard } from "../guards/confirm-exit.guard";
import { ErrorPageComponent } from "./error-page/error-page.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: '**', component: NotFoundComponent }
];

export const pages = [
    HomeComponent, NotFoundComponent
];