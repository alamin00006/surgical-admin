import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileMenuState {
  isProfileMenu: boolean;
  isLoadingState: boolean;
}

const initialState: ProfileMenuState = {
  isProfileMenu: false,
  isLoadingState: false,
};

const profileMenuSlice = createSlice({
  name: "profileMenu",
  initialState,
  reducers: {
    placeProfileMenu: (state, action: PayloadAction<boolean>) => {
      state.isProfileMenu = action.payload;
    },
    placeLoadingShow: (state, action: PayloadAction<boolean>) => {
      state.isLoadingState = action.payload;
    },
  },
});

export const { placeProfileMenu, placeLoadingShow } = profileMenuSlice.actions;
export default profileMenuSlice.reducer;
