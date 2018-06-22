import { Seat } from "./seat.model";
import { Schedule } from "./schedule.model";

export interface Cinema {
    id: any;
    name: string;
    row: number;
    column: number;
    status: boolean;
    seats: { [id: number]: Seat }
    schedules?: Schedule[];
}