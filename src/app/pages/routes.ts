import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { TheatersComponent } from "./theaters/theaters.component";
import { TheaterComponent } from "./theater/theater.component";
import { TheaterWithCinemasResolver } from "../services/resolver/theater.resolver";

export const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'theaters', component: TheatersComponent },
   { path: 'theater/:id', component: TheaterComponent, resolve: { theater: TheaterWithCinemasResolver } },
   { path: 'error', component: ErrorPageComponent },
   { path: '**', component: NotFoundComponent }
];

export const pages = [
   HomeComponent, NotFoundComponent, ErrorPageComponent, TheaterComponent, TheatersComponent
];