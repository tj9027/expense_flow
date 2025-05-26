import { procedure, router } from "./trpc";
import { employeeRouter } from "./routes/employee";
import { expenseRouter } from "./routes/expense";

const appRouter = router({
  employee: employeeRouter,
  expense: expenseRouter,
  test: procedure.query(() => {
    return "Hello world!";
  }),
});

export type AppRouter = typeof appRouter;
export { appRouter };
