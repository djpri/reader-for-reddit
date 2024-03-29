import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Settings {
  postKeywordsFilter: string[];
  commentKeywordsFilter: string[];
  showNSFW: boolean;
  display: "wide" | "narrow"
}

interface AppSliceState {
  savedSubreddits: string[];
  settings: Settings;
}

const initialState: AppSliceState = {
  savedSubreddits: [],
  settings: {
    postKeywordsFilter: [],
    commentKeywordsFilter: [],
    showNSFW: true,
    display: "wide",
  }
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setNewPostKeywordsFilter: (state, action: PayloadAction<string>) => {
      state.settings.postKeywordsFilter = [...state.settings.postKeywordsFilter, action.payload];
    },
    removePostKeywordsFilter: (state, action: PayloadAction<number>) => {
      const updatedKeywordsFilter = [...state.settings.postKeywordsFilter];
      updatedKeywordsFilter.splice(action.payload, 1);
      state.settings.postKeywordsFilter = updatedKeywordsFilter;
    },
    clearPostKeywordsFilter: (state) => {
      state.settings.postKeywordsFilter = [];
    },
    setNewCommentKeywordsFilter: (state, action: PayloadAction<string>) => {
      state.settings.commentKeywordsFilter = [...state.settings.commentKeywordsFilter, action.payload];
    },
    removeCommentKeywordsFilter: (state, action: PayloadAction<number>) => {
      const updatedKeywordsFilter = [...state.settings.commentKeywordsFilter];
      updatedKeywordsFilter.splice(action.payload, 1);
      state.settings.commentKeywordsFilter = updatedKeywordsFilter;
    },
    clearCommentKeywordsFilter: (state) => {
      state.settings.commentKeywordsFilter = [];
    },
    addNewSavedSubreddit: (state, action: PayloadAction<string>) => {
      const newSet = new Set(state.savedSubreddits);
      newSet.add(action.payload);
      state.savedSubreddits = Array.from(newSet);
    },
    setDisplaySetting: (state, action: PayloadAction<"wide" | "narrow">) => {
      state.settings.display = action.payload;
    },
    removeSavedSubreddit: (state, action: PayloadAction<string>) => {
      const newSet = new Set(state.savedSubreddits);
      const isDeleted = newSet.delete(action.payload);
      if (isDeleted) {
        state.savedSubreddits = Array.from(newSet);
      }
    },
    toggleNSFW: (state) => {
      state.settings.showNSFW = !state.settings.showNSFW;
    },
    setNewSettings: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload;
    },
  },
});

// ACTIONS
export const {
  setNewPostKeywordsFilter,
  clearPostKeywordsFilter,
  removePostKeywordsFilter,
  setNewCommentKeywordsFilter,
  clearCommentKeywordsFilter,
  removeCommentKeywordsFilter,
  addNewSavedSubreddit,
  removeSavedSubreddit,
  setDisplaySetting,
  toggleNSFW,
  setNewSettings,
} = appSlice.actions;

// SELECTORS
export const selectSettings = (state: RootState) => state.app.settings;
export const selectShowNSFW = (state: RootState) => state.app.settings.showNSFW;
export const selectSavedSubreddits = (state: RootState) => state.app.savedSubreddits;
export const selectPostKeywordsFilter = (state: RootState) => state.app.settings.postKeywordsFilter;
export const selectCommentKeywordsFilter = (state: RootState) => state.app.settings.commentKeywordsFilter;

export default appSlice.reducer;
