import * as ActionType from '~/redux/constants/constant';

type StateProps = {
  visible?: boolean;
  children?: JSX.Element;
};

type ActionProps = {
  type: string;
  children: JSX.Element;
};

const initialState: StateProps = {
  visible: false,
  children: undefined,
};

export const ModalReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case ActionType.SHOW_MODAL:
      state.visible = true;
      state.children = action.children;
      return { ...state };

    case ActionType.HIDE_MODAL:
      state.visible = false;
      state.children = undefined;
      return { ...state };

    default:
      return state;
  }
};
