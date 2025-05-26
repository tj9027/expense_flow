import { useData } from "@/store/store";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { StatusMap } from "@/types/types";

const ExpenseDetails = ({
  onClose,
  expenseId,
}: {
  expenseId: number;
  onClose: () => void;
}) => {
  const { user } = useData();
  const { mutate: updateExpense, isSuccess } =
    trpc.expense.processExpense.useMutation();
  const { data: expense, refetch} = trpc.expense.getExpenseById.useQuery({ expenseId });
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);
  if (!user || !expense) {
    return (
      <div className="p-20 flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl mb-4">Please login to view expense details</h1>
      </div>
    );
  }
  const handleApprove = async () => {
    await updateExpense({
      expenseId: expense.id,
      status: user?.managerId ? 5 : 1,
      tempStatus: 1,
      updatedByUserId: user.id,
      approverId: user.managerId || undefined,
    });
    onClose();
  };
  const handleDeny = async () => {
    await updateExpense({
      expenseId: expense.id,
      status: 2,
      updatedByUserId: user.id,
    });
    onClose();
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose} // Close modal when clicking on the backdrop
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[400px]"
        onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to the backdrop
      >
        <h1 className="text-xl font-bold">Expense Details</h1>
        <hr className="border border-gray-300 mb-4" />
        <div>
          <h3 className="text-md font-bold mb-4">{expense.name}</h3>
          <div className="text-md">
            Requested by:{" "}
            <p
              className="
          font-semibold text-md inline"
            >
              {expense.submitter.name}
            </p>
          </div>
          <div className="text-md">
            Amount:{" "}
            <p
              className="
          font-semibold text-md inline"
            >
              {expense.amount}
            </p>
          </div>
          <div className="text-md">
            Note:{" "}
            <p
              className="
          font-semibold text-md inline"
            >
              {expense.note || "No note provided"}
            </p>
          </div>
        </div>
        <hr className="border border-gray-300 my-4" />

        <div>
          <p className="font-semibold mb-2">History:</p>
          <ol className="list-disc h-30 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300">
            {expense.history.length
              ? expense.history.map((item, index: number) => (
                  <li key={index} className="text-sm">
                    Status changed to {'"'}
                    {
                      StatusMap[
                        (item.temporaryStatus ||
                          item.status) as keyof typeof StatusMap
                      ]
                    }
                    {'"'} by{" "}
                    <span className="font-semibold">{item.submitter.name}</span>{" "}
                    on {new Date(item.date).toLocaleString()}
                  </li>
                ))
              : "No history available"}
          </ol>
        </div>
        <hr className="border border-gray-300 my-4" />
        {user?.id !== expense.submitter.id && (
          <div className="flex justify-evenly items-center">
            <button
              className="m-2 bg-gray-700 w-30 text-white px-4 py-2 rounded"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className="m-2 bg-gray-700 w-30 text-white px-4 py-2 rounded"
              onClick={handleDeny}
            >
              Deny
            </button>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 text-xs bg-gray-700 text-white px-2 py-1 rounded "
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ExpenseDetails;
