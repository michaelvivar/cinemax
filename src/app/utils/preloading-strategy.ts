import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

export class ModulePreloadingStrategy implements PreloadingStrategy {

    preload(route: Route, fn: () => Observable<any>): Observable<any> {
        if (route.path == 'buy') {
            return fn();
        }
        else {
            return of(null);
        }
    }
}