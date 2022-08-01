export default function Popper({ children }: { children: JSX.Element }) {
  return <div className="w-full bg-white shadow rounded-md p-2 transition-all duration-700">{children}</div>;
}
