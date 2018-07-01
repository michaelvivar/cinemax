import { Subscription } from "rxjs";

declare function using(fn: () => Subscription): void;