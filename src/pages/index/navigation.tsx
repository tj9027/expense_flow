import { Login } from "./login";

const Navigation = () => {
  return (
    <div className="flex items-center justify-between h-20 bg-gray-200 border-bottom-1">
      <h1 className="text-5xl font-bold ml-10">Expense tracker</h1>
      <Login />
    </div>
  );
};

export { Navigation };
