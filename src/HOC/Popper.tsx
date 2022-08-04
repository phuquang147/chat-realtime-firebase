export default function Popper({ children }: { children: JSX.Element }) {
  return (
    <div className="w-full bg-white dark:bg-dark-blue-gray shadow rounded-md p-2 transition-all duration-300">
      {children}
    </div>
  );
}
