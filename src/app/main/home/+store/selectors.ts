import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IHomeState } from "src/app/interfaces";
import { GENRES, YEARS_ARRAY, CURRENT_YEAR } from './constants';
import { readyException } from "jquery";
import { keyframes } from "@angular/animations";
const homeSelector = createFeatureSelector<IHomeState>('homeFeature')

export const getSearchValue = createSelector(homeSelector, s => s.search)
export const getGenreOptions = createSelector(homeSelector, s => s.genre)
export const getYearOptions = createSelector(homeSelector, s => s.year)

export const getOptionValidation = createSelector(homeSelector, s => {
    let input = s.search?.trim()?.split(' ').pop()?.toLowerCase()! ?? '';

    let isValid = false;
    let suggestions: string[] = [];
    const [type, option = ''] = input.split(':');
    const VALIDATION_MESSAGES: { [key: string]: string } = {
        'genre': 'Invalid genre. Please enter a valid genre from the ones listed.',
        'year': `Invalid year. Please enter a year from 1917 - ${CURRENT_YEAR}`,
        '': ''
    };

    const validationMessage = VALIDATION_MESSAGES[Object.keys(VALIDATION_MESSAGES).find(key => type.startsWith(key)) || ''];

    const suggestionMap: { [key: string]: string[] } = {
        genre: GENRES,
        year: YEARS_ARRAY,
        '': []
    };

    const suggestionOptions = suggestionMap[type] || suggestionMap[''];
    suggestions = suggestionOptions.filter((suggestion) => suggestion.startsWith(option));

    if (suggestions.includes(option)) {
        isValid = true;
    }

    return { isValid, suggestions, validationMessage };
});