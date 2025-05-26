import MyForm from "./form";
import { Info } from "./info";
import ExpenseList from "./list";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-start">
      <Info />
      <hr className="border border-gray-300 w-full" />
      <div className="grid grid-cols-8 gap-4 p-10 bg-gray-100 flex justify-start items-start">
        <ExpenseList />
        <MyForm />
      </div>
    </div>
  );
};
export default Dashboard;
