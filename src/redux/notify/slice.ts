import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
    dailyTraining: boolean,
    achievsAndLevels: boolean,
    specialOffers: boolean,
    motivateMe: boolean,
    sound: boolean,
    darkTheme: boolean
}

const initialState: NotificationState = {
    dailyTraining: false,
    achievsAndLevels: false,
    specialOffers: false,
    motivateMe: false,
    sound: false,
    darkTheme: false
}
const notifySlice = createSlice({
    name: "notify",
    initialState: initialState,
    reducers: {
        setAllNotifications: (_, action: PayloadAction<NotificationState>) => {
            return action.payload;
        }
    },

})

export const { setAllNotifications } = notifySlice.actions;

export default notifySlice.reducer;