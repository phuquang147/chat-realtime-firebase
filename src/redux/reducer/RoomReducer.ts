import { Timestamp } from 'firebase/firestore';
import { MessageProps } from '~/components/Chat/Message';
import * as ActionTypes from '../constants/constant';

export interface MemberProps {
  nickname: string;
  id: string;
  isRead: boolean;
}

export interface RoomProps {
  id: string;
  name?: string;
  members: MemberProps[];
  createdAt: Timestamp;
  type: 'personal' | 'group';
  lastMessage: MessageProps;
  photoUrl: string;
}

type StateProps = {
  rooms: RoomProps[];
  selectedRoomId: string | undefined;
  selectedRoom: RoomProps | undefined;
};

type ActionProps = {
  type: string;
  data: RoomProps[] & RoomProps;
};

const initialState: StateProps = {
  rooms: [],
  selectedRoom: undefined,
  selectedRoomId: undefined,
};

export const RoomReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case ActionTypes.GET_ROOMS:
      state.rooms = action.data;
      return { ...state };
    case ActionTypes.SET_SELECTED_ROOM:
      state.selectedRoom = action.data;
      state.selectedRoomId = action.data.id;
      return { ...state };

    default:
      return { ...state };
  }
};
