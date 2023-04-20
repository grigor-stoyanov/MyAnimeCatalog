import { createAction, props } from "@ngrx/store"

const action_types = {
    setSearchValue: 'SET_SEARCH_VALUE',
    typing: 'TYPING',
    addOption:'ADD_OPTION',
    removeOption:'REMOVE_OPTION'
}

export const setSearchValue = createAction(action_types.setSearchValue, props<{ search?: string }>())
export const typing = createAction(action_types.typing)
export const addOption = createAction(action_types.addOption,props<{by:string,option:string}>())
export const removeOption = createAction(action_types.removeOption,props<{by:string,option:string|number}>())