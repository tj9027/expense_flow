import z from "zod";
import { procedure, router } from "../trpc";

const employeeRouter = router({
  getAllEmployees: procedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        managementAssignmentsAsEmployee: {
          select: {
            managerId: true,
          },
        },
      },
    });
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      managerId: user.managementAssignmentsAsEmployee[0]?.managerId || null,
    }));
  }),
  getEmployeeById: procedure
    .input(z.object({ employeeId: z.number() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.employee.findUnique({
        where: { id: input.employeeId },
        select: {
          id: true,
          name: true,
          email: true,
          managementAssignmentsAsEmployee: {
            select: {
              managerId: true,
            },
          },
        },
      });
      return user;
    }),
  getManagedEmployees: procedure
    .input(
      z.object({
        employeeId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const fetchManagedEmployeeIds = async (
        managerId: number
      ): Promise<number[]> => {
        const directReports = await ctx.prisma.managementAssignment.findMany({
          where: {
            managerId,
          },
          select: {
            employeeId: true,
            managerId: true,
          },
        });

        const directReportIds = directReports
          .map((emp) => emp.employeeId)
          .filter((id): id is number => id !== null);

        if (directReportIds.length === 0) {
          return [];
        }

        const indirectReportIds = await Promise.all(
          directReportIds.map((id) => fetchManagedEmployeeIds(id))
        );

        return [...directReportIds, ...indirectReportIds.flat()];
      };

      const allManagedEmployeeIds = await fetchManagedEmployeeIds(
        input.employeeId
      );

      const relevantEmployeeIds = [input.employeeId, ...allManagedEmployeeIds];

      const employees = await ctx.prisma.employee.findMany({
        where: {
          id: {
            in: relevantEmployeeIds,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          managementAssignmentsAsEmployee: {
            select: {
              managerId: true,
            },
          },
        },
      });

      return employees;
    }),
});

export { employeeRouter };
