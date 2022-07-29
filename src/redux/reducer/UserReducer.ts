import * as ActionTypes from '../constants/constant';

export interface UserProps {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
}

type StateProps = {
  user?: UserProps;
};

type ActionProps = {
  type: string;
  data?: UserProps;
};

const initialState: StateProps = {};

export const UserReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case ActionTypes.GET_USER:
      state.user = action.data;
      console.log(state);

      return { ...state };

    default:
      return { ...state };
  }
};
