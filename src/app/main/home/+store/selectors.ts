import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IHomeState } from "src/app/interfaces";
import { GENRES, YEARS_ARRAY } from "./constants";
const homeSelector = createFeatureSelector<IHomeState>('homeFeature')

export const getSearchValue = createSelector(homeSelector, s => s.search)
export const getGenreOptions = createSelector(homeSelector, s => s.genre)
export const getYearOptions = createSelector(homeSelector, s => s.year)

export const getOptionValidation = createSelector(homeSelector, s => {
    let input = s.search?.split(' ').pop()! ?? '';
    const isValid = /[Gg]enre:[A-Za-z]+|[Yy]ear:\d{4}$/i.test(input)
    const partialMatch = input.toLowerCase()
    let suggestions: string[] = []
    if (partialMatch.startsWith('genre:')) {
        suggestions = GENRES.filter((genre) => genre.startsWith(partialMatch.split(':')[1]))
    }
    else if (partialMatch.startsWith('year:')) {
        suggestions = YEARS_ARRAY.filter((year) => year.startsWith(partialMatch.split(':')[1]))
    }

    return { isValid, suggestions }
})