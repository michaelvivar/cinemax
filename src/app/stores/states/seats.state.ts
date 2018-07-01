import { Seat } from "../../models/seat.model";
import { State, Action, StateContext } from "@ngxs/store";
import { AddSeat, RemoveSeat, ResetSeat, BuySeat } from "../actions/seat.actions";

interface SeatStateModel {
   selected: Seat[];
}

@State<SeatStateModel>({
   name: 'seats',
   defaults: {
      selected: []
   }
})
export class SeatsState {

   @Action(AddSeat)
   addSeat(context: StateContext<SeatStateModel>, { payload }: AddSeat) {
      const state = context.getState();
      context.patchState({ selected: [...state.selected, payload] });
   }

   @Action(RemoveSeat)
   removeSeat(context: StateContext<SeatStateModel>, { payload }: RemoveSeat) {
      const state = context.getState();
      const selected = state.selected.filter(o => !(o.row == payload.row && o.column == payload.column));
      context.patchState({ selected });
   }

   @Action(ResetSeat)
   resetSeat(context: StateContext<SeatStateModel>) {
      context.setState({ selected: [] });
   }

   @Action(BuySeat)
   buySeat(context: StateContext<SeatStateModel>) {
      const state = context.getState();
      const selected = state.selected.map(o => {
         o.value = 1;
         return o;
      });
      context.setState({ selected });
   }
}