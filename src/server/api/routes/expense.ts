import { z } from "zod";
import { procedure, router } from "../trpc";

const expenseRouter = router({
  getAllExpenses: procedure
    .input(
      z.object({
        userId: z.number(),
        managedEmployees: z.array(z.number()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const expensesHistory = await ctx.prisma.expenseHistory.findMany({
        where: {
          OR: [{ submitterId: input.userId }, { approverId: input.userId }],
        },
        select: {
          expenseId: true,
          id: true,
        },
      });
      console.log("expensesHistory", expensesHistory);
      const expenses = await ctx.prisma.expense.findMany({
        where: {
          id: {
            in: expensesHistory.map((history) => history.expenseId),
          },
        },
        include: {
          submitter: {
            select: {
              id: true,
              name: true,
            },
          },
          history: {
            select: {
              id: true,
              date: true,
              status: true,
              temporaryStatus: true,
              submitter: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      return expenses;
    }),

  getExpenseById: procedure
    .input(z.object({ expenseId: z.number() }))
    .query(async ({ ctx, input }) => {
      const expense = await ctx.prisma.expense.findUnique({
        where: {
          id: input.expenseId,
        },
        include: {
          submitter: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          history: {
            select: {
              date: true,
              status: true,
              temporaryStatus: true,
              submitter: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      if (!expense) {
        throw new Error("Expense not found");
      }

      return expense;
    }),
  createExpense: procedure
    .input(
      z.object({
        name: z.string(),
        amount: z.number(),
        note: z.string().optional(),
        submitterId: z.number(),
        approverId: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newExpense = await ctx.prisma.expense.create({
        data: {
          name: input.name,
          amount: input.amount,
          note: input.note || "",
          submitterId: input.submitterId,
        },
      });
      const newExpenseHistory = await ctx.prisma.expenseHistory.create({
        data: {
          expenseId: newExpense.id,
          status: 0,
          temporaryStatus: 0,
          submitterId: input.submitterId,
          date: new Date(),
          approverId: input.approverId || null,
        },
      });

      return [newExpense, newExpenseHistory];
    }),
  processExpense: procedure
    .input(
      z.object({
        expenseId: z.number(),
        status: z.number().optional(),
        updatedByUserId: z.number(),
        tempStatus: z.number().optional(),
        approverId: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.expenseHistory.create({
        data: {
          expenseId: input.expenseId,
          status: input.status || 0,
          submitterId: input.updatedByUserId,
          approverId: input.approverId || null,
          temporaryStatus: input.tempStatus || 0,
          date: new Date(),
        },
      });
      if (!input.approverId || input.status === 2) {
        await ctx.prisma.expense.update({
          where: { id: input.expenseId },
          data: {
            status: input.status || 0,
          },
        });
      }
      return true;
    }),
});

export { expenseRouter };
