import { Timestamp } from 'firebase/firestore';
import * as ActionTypes from '../constants/constant';

type RoomProps = {
  name: string;
  description: string;
  members: string[];
  createdAt: Timestamp;
};

type StateProps = {
  rooms: RoomProps[];
  selectedRoomId: string | undefined;
  selectedRoom: RoomProps | undefined;
};

type ActionProps = {
  type: string;
  data: RoomProps[] & RoomProps & string;
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

    default:
      return { ...state };
  }
};
