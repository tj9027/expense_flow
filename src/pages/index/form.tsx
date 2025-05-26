import { useData } from "@/store/store";
import { useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";

type ExpenseFormData = {
  expense: string;
  amount: number;
  note?: string;
};

export default function MyForm() {
  const { user, refetchExpenseData } = useData();
  const expenseCreateMutation = trpc.expense.createExpense.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>();

  const onSubmit = (data: ExpenseFormData) => {
    if (!user) return false;

    const payload = {
      submitterId: user.id,
      approverId: user.managerId || undefined,
      name: data.expense,
      amount: data.amount,
      note: data.note || "",
    };
    console.log("Submitting expense:", payload);
    expenseCreateMutation.mutate(payload, {
      onSuccess: () => {
        console.log("Expense created successfully");
        refetchExpenseData();
        reset();
      },
      onError: (error) => {
        console.error("Error creating expense:", error);
      },
    });
  };

  return (
    <div className="p-20 col-span-3 flex flex-col items-start justify-start h-screen bg-gray-100 h-200">
      <h1 className="text-xl font-bold ">Request New Expense</h1>
      <hr className="w-full border border-gray-300" />
      {!user ? (
        <div className="p-20 flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-2xl mb-4">
            Please login a user to submit an expense
          </h1>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-4 p-2 flex-col justify-evenly items-center bg-gray-100 border-1 border-gray-300 rounded-lg shadow-sm w-full"
        >
          <input
            {...register("expense", { required: "Expense is required" })}
            placeholder="Name"
            className="border p-2 rounded w-full"
          />
          {errors.expense && (
            <p className="text-red-500 text-sm">{errors.expense.message}</p>
          )}
          <input
            {...register("amount", {
              required: "Amount is required",
              valueAsNumber: true,
              validate: (value) => value > 0 || "Amount must be greater than 0",
            })}
            type="number"
            min="0"
            step="0.01"
            placeholder="Amount"
            className="border p-2 rounded w-full"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
          <textarea
            {...register("note")}
            placeholder="Note (optional)"
            className="border p-2 rounded min-h-20 w-full"
          />
          <button
            type="submit"
            className="bg-gray-700 text-white px-4 rounded h-10 block ml-auto"
          >
            Request
          </button>
        </form>
      )}
    </div>
  );
}
