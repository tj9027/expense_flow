import { useData } from "@/store/store";

const Info = () => {
  const { user, managedEmployees } = useData();
  return (
    user &&
    managedEmployees && (
      <div className="bg-gray-100 p-10 mx-auto grid grid-flow-col grid-cols-4 gap-4 w-full">
        <div className="col-span-3 pr-10">
          <h1 className="font-bold">Your Info</h1>
          <hr className="border border-gray-300 mb-4" />
          <div className="flex justify-between">
            <div className="flex flex-col items-start">
              <p className="text-lg font-semibold">
                Name: <span className="font-normal">{user?.name}</span>
              </p>
              <p className="text-lg font-semibold">
                Email: <span className="font-normal">{user?.email}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 pl-10">
          <h1 className="font-bold">Management</h1>
          <hr className="border border-gray-300 mb-4" />
          <div className="flex flex-col items-start">
            <p className="text-lg">You Are Managing: </p>
            <ul className="list-disc pl-5">
              {managedEmployees?.length > 1 ? (
                managedEmployees.map((employee) => {
                  if (employee.id === user?.id) return null;
                  return (
                    <li key={employee.id}>
                      {employee.name}{" "}
                      <span className="italic text-xs text-gray-500">
                        {employee.managementAssignmentsAsEmployee[0]
                          ?.managerId === user?.id
                          ? "directly"
                          : "inderectly"}
                      </span>
                    </li>
                  );
                })
              ) : (
                <li className="italic">No managed employees</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};
export { Info };
