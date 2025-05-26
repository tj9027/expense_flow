import { Login } from "./login";

const Welcome = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
        <h1 className="text-9xl font-bold p-20">Expense Tracker</h1>
      <Login />
    </div>
  );
};

export { Welcome };
