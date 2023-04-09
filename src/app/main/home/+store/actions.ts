import { createAction, props } from "@ngrx/store"

const action_types = {
    setSearchValue: 'SET_SEARCH_VALUE',
    typing: 'TYPING'

}

export const setSearchValue = createAction(action_types.setSearchValue, props<{ search?: string }>())
export const typing = createAction(action_types.typing)
