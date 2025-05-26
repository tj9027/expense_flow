import { Expense, ManagedEmployee } from "@/types/types";
import { trpc } from "@/utils/trpc";
import {
  ReactNode,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";

type User = {
  id: number;
  name: string;
  email: string;
  managerId?: number | null;
};

type DataContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  employeeList: User[] | null;
  expenses: Expense[] | null;
  refetchExpenseData: () => void;
  managedEmployees: ManagedEmployee[] | null;
} | null;

const DataContext = createContext<DataContextType>(null);

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [employeeList, setEmployeeList] = useState<User[] | null>(null);

  const { data: employeeListData } = trpc.employee.getAllEmployees.useQuery();
  const { data: managedEmployees } = trpc.employee.getManagedEmployees.useQuery(
    {
      employeeId: user ? user.id : 0,
    },
    { enabled: !!user }
  );
  const { data: expenseData, refetch: refetchExpenseData } =
    trpc.expense.getAllExpenses.useQuery(
      {
        userId: user ? user.id : 0,
        managedEmployees: managedEmployees
          ? managedEmployees.map((employee) => employee.id)
          : [],
      },
      { enabled: !!user }
    );

  useEffect(() => {
    if (!employeeList && employeeListData) {
      console.log("userListData", employeeListData);
      setEmployeeList(employeeListData);
    }
  }, [employeeListData, employeeList]);
  useEffect(() => {
    if (user && expenseData) {
      setExpenses(
        expenseData.map((expense) => ({
          ...expense,
          submitter: expense.submitter || { id: 0, name: "Unknown" },
          history: expense.history.map((historyItem) => ({
            ...historyItem,
            date: new Date(historyItem.date),
          })),
        }))
      );
    }
  }, [user, expenseData]);

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        employeeList,
        expenses,
        refetchExpenseData,
        managedEmployees: managedEmployees || null,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
export { DataProvider, useData };
