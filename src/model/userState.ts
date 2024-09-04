export interface User {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ApiDataState {
  apiData: User | null;
}

export const initialState: ApiDataState = {
  apiData: null,
};
