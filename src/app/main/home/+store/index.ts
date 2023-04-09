import { createFeature, createReducer, on } from "@ngrx/store";
import { setSearchValue } from "./actions";
import { IHomeState } from "src/app/interfaces";

const initialHomeState = {
    search: undefined,
    year:undefined,
    genre:undefined

}

export const homeFeature = createFeature(
    {
        name: 'homeFeature',
        reducer: createReducer<IHomeState>(
            initialHomeState,
            on(setSearchValue, (state, action) => {
                const new_search = (action.search) ? action.search : ''
                return { ...state, search: new_search }
            })
        )

    }
)