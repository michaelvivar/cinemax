import { State, Action, StateContext } from "@ngxs/store";
import { Theater } from "../../models/theater.model";
import { SetTheater, RemoveTheater } from "../actions/theater.actions";


@State<Theater>({
    name: 'theater'
})
export class TheaterState {

    @Action(SetTheater)
    setTheater(context: StateContext<Theater>, { payload }: SetTheater) {
        context.setState(payload);
    }

    @Action(RemoveTheater)
    removeTheater(context: StateContext<Theater>) {
        context.setState(null);
    }
}