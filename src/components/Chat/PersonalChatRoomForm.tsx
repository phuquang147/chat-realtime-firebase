import { useSelector } from 'react-redux';
import Select, { SingleValue } from 'react-select';
import { UserProps } from '~/redux/reducer/UserReducer';

type Props = {
  userInRoom?: string;
  handleChange: (value: string | undefined) => void;
};

type SelectProps = {
  value: string;
  label: string;
};

export default function PersonalChatRoomForm({ handleChange }: Props) {
  const { user, userList } = useSelector((state: any) => state.UserReducer);

  return (
    <div>
      <Select
        className="single-basic"
        classNamePrefix="select"
        isSearchable
        isClearable
        name="color"
        hideSelectedOptions
        placeholder="Select friend"
        options={
          userList
            ? userList.flatMap((u: UserProps) =>
                u.id !== user.id ? [{ value: u.id, label: `${u.displayName} - ${u.id.slice(0, 5)}` }] : [],
              )
            : []
        }
        onChange={(e: SingleValue<SelectProps>) => handleChange(e?.value)}
      />
    </div>
  );
}
