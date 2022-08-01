import { UserProps } from '~/redux/reducer/UserReducer';

const createMember = (user: UserProps) => ({
  nickname: user.displayName,
  isRead: false,
  id: user.id || null,
});

export default createMember;
