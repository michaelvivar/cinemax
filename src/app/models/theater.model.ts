import { Cinema } from "./cinema.model";

export interface Theater {
    id: any;
    name: string;
    status: boolean;
    cinemas?: Cinema[];
}