import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AppSliceState {
  settings: {
    postKeywordsFilter: string[];
    commentKeywordsFilter: string[];
    showNSFW: boolean;
  }
}

const initialState: AppSliceState = {
  settings: {
    postKeywordsFilter: [],
    commentKeywordsFilter: [],
    showNSFW: true,
  }
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setNewPostKeywordsFilter: (state, action) => { 
      state.settings.postKeywordsFilter = [...state.settings.postKeywordsFilter, action.payload];
    },
    removePostKeywordsFilter: (state, action) => {
      const updatedKeywordsFilter = [...state.settings.postKeywordsFilter];
      updatedKeywordsFilter.splice(action.payload, 1);
      state.settings.postKeywordsFilter = updatedKeywordsFilter;
    },
    clearPostKeywordsFilter: (state) => {
      state.settings.postKeywordsFilter = [];
    },
    setNewCommentKeywordsFilter: (state, action) => {
      state.settings.commentKeywordsFilter = [...state.settings.commentKeywordsFilter, action.payload];
    },
    removeCommentKeywordsFilter: (state, action) => {
      const updatedKeywordsFilter = [...state.settings.commentKeywordsFilter];
      updatedKeywordsFilter.splice(action.payload, 1);
      state.settings.commentKeywordsFilter = updatedKeywordsFilter;
    },
    clearCommentKeywordsFilter: (state) => {
      state.settings.commentKeywordsFilter = [];
    },
    toggleNSFW: (state) => {
      state.settings.showNSFW = !state.settings.showNSFW;
    },
    setNewSettings: (state, action) => {
      state.settings = action.payload;
    },
  },
});

// ACTIONS
export const {
  setNewPostKeywordsFilter,
  clearPostKeywordsFilter,
  setNewCommentKeywordsFilter,
  clearCommentKeywordsFilter,
  removeCommentKeywordsFilter,
  removePostKeywordsFilter,
  toggleNSFW,
  setNewSettings,
} = appSlice.actions;

// SELECTORS
export const selectSettings = (state: RootState) => state.app.settings;

export default appSlice.reducer;
