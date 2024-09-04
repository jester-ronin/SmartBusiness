import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../model/userState'; 

interface ApiDataState {
    apiData: User[] | null;
}

const initialState: ApiDataState = {
    apiData: null,
};

const apiDataSlice = createSlice({
    name: 'apiData',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<User[]>) => {
            state.apiData = action.payload;
        },
    },
});

export const { setData } = apiDataSlice.actions;
export default apiDataSlice.reducer;
