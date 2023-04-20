import { createFeature, createReducer, on } from "@ngrx/store";
import { addOption, removeOption, setSearchValue } from "./actions";
import { IHomeState } from "src/app/interfaces";

const initialHomeState = {
    search: undefined,
    year: [],
    genre: []

}

export const homeFeature = createFeature(
    {
        name: 'homeFeature',
        reducer: createReducer<IHomeState>(
            initialHomeState,
            on(setSearchValue, (state, action) => {
                const new_search = (action.search) ? action.search : ''
                return { ...state, search: new_search }
            }),
            on(addOption, (state, action) => {
                const { by, option } = action
                switch (by) {
                    case 'Year':
                        return { ...state, year: [...state.year, parseInt(option)] }
                        break
                    case 'Genre':
                        return { ...state, genre: [...state.genre, option] }
                        break
                }
                return { ...state }
            }),
            on(removeOption, (state, action) => {
                const {by,option} = action
                switch(by){
                    case 'Year':
                        return { ...state, year: [...state.year].filter(v=>v!=option) }
                        break
                    case 'Genre':
                        return { ...state, genre: [...state.genre].filter(v=>v!=option) }
                        break
                }
                return {...state}
            })
        )

    }
)