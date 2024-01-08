import { createFeatureSelector, createSelector } from '@ngrx/store';
import Message from 'src/app/Models/Message';
import { AppState } from '../AppState';
import { ChatState } from '../Reducers/messages.reducer';

export const selectLevelState = createFeatureSelector<ChatState>('messages');

export const selectMessages = createSelector(
    selectLevelState,
    (state: ChatState) => state.messages
);