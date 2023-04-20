import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IHomeState } from "src/app/interfaces";

const homeSelector = createFeatureSelector<IHomeState>('homeFeature')

export const getSearchValue = createSelector(homeSelector, s => s.search)
export const getGenreOptions = createSelector(homeSelector,s=>s.genre)
export const getYearOptions = createSelector(homeSelector,s=>s.year)