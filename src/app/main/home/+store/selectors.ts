import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IHomeState } from "src/app/interfaces";

const homeSelector = createFeatureSelector<IHomeState>('homeFeature')

export const getSearchValue = createSelector(homeSelector, s => s.search)