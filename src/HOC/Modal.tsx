import { useSelector } from 'react-redux';

export default function Modal() {
  const { visible, children } = useSelector((state: any) => state.ModalReducer);

  return visible ? (
    <div>
      <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative min-w-full md:min-w-min p-2">
          <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-6 md:p-10 flex-auto">{children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </div>
  ) : null;
}
