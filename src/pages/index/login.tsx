import { useData } from "@/store/store";

const Login = () => {
  const { employeeList, setUser, user } = useData();

  const handleSetUser = (userId: number) => {
    const selectedEmployee = employeeList?.find(
      (employee) => employee.id === userId
    );
    if (selectedEmployee) setUser(selectedEmployee);
  };
  return (
    <div className="pr-10">
      Login as:{" "}
      <div className="relative inline-block">
        <select
          className="min-w-40 appearance-none border border-gray-300 rounded p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={user?.id || ""}
          onChange={(e) => handleSetUser(Number(e.target.value))}
        >
          <option value="" className="italic">Select a user</option>
          {employeeList?.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          ▼
        </span>
      </div>
    </div>
  );
};

export { Login };
