import { useState } from 'react';
import Select from 'react-select';

export default function GroupChatRoomForm() {
  const [name, setName] = useState<string>('');

  return (
    <div>
      <p> Name</p>
      <input
        className="w-full mt-2 mb-8 p-4 bg-light-gray text-gray-600 rounded-xl outline-none focus:ring-1 focus:ring-gray-300"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Select
        className="single-basic"
        classNamePrefix="select"
        isSearchable
        isClearable
        name="color"
        hideSelectedOptions
        placeholder="Select friend"
        options={[
          { value: 'abd', label: 'abd' },
          { value: 'abc', label: 'abc' },
          { value: 'abe', label: 'abe' },
        ]}
        // onChange={(e) => {
        //   e.forEach((a) => {
        //     console.log(a);
        //   });
        // }}
      />
    </div>
  );
}
