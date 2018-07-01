import { Seat } from "../../models/seat.model";

export class AddSeat {
   static readonly type = '[SEAT] Add';

   constructor(public payload: Seat) { }
}

export class RemoveSeat {
   static readonly type = '[SEAT] Remove';

   constructor(public payload: Seat) { }
}

export class ResetSeat {
   static readonly type = '[SEAT] Reset';
}

export class BuySeat {
   static readonly type = '[SEAT] Buy';
}