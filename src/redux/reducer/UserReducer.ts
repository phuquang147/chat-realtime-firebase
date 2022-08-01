import * as ActionTypes from '../constants/constant';
import { MemberProps } from './RoomReducer';

export interface UserProps {
  id: string;
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
  isRead: boolean;
}

type StateProps = {
  user?: UserProps;
  userList?: UserProps[];
  userInRoom?: MemberProps;
};

type ActionProps = {
  type: string;
  data?: UserProps & UserProps[] & MemberProps;
};

const initialState: StateProps = {};

export const UserReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case ActionTypes.GET_USER:
      state.user = action.data;
      return { ...state };

    case ActionTypes.GET_USER_LIST:
      state.userList = action.data;
      state.user = action.data?.find((user) => user.uid === state.user?.uid);
      return { ...state };

    case ActionTypes.SET_USER_IN_ROOM:
      state.userInRoom = action.data;
      return { ...state };

    default:
      return { ...state };
  }
};
