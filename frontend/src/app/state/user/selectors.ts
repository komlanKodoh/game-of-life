import { AppState } from "..";


export const selectUser = (state: AppState) => state.user;
export const selectUserToken = (state: AppState) => state.user.token;
export const selectUserProfile = ( state: AppState) => state.user.profile;
