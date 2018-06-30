import { State, Action, StateContext } from "@ngxs/store";
import { Movie } from "../../models/movie.model";
import { SetMovie, RemoveMovie } from "../actions/movie.actions";

@State<Movie>({
    name: 'movie'
})
export class MovieState {

    @Action(SetMovie)
    setMovie(context: StateContext<Movie>, { payload }: SetMovie) {
        context.setState(payload);
    }

    @Action(RemoveMovie)
    removeMovie(context: StateContext<Movie>) {
        context.setState(null);
    }
}