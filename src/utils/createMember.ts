import { UserProps } from '~/redux/reducer/UserReducer';

const createMember = (user: UserProps) => ({
  isRead: false,
  id: user.id || null,
});

export default createMember;
