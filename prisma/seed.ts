import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // await prisma.managementLevel.createMany({
  //   data: [
  //     { level: 1, name: "Pawn" },
  //     { level: 2, name: "Knight" },
  //     { level: 3, name: "Bishop" },
  //     { level: 4, name: "Rook" },
  //     { level: 5, name: "Queen" },
  //     { level: 6, name: "King" },
  //   ],
  // });

  await prisma.employee.createMany({
    data: [
      {
        email: "jof@tipalti.com",
        name: "Jof",
      },
      {
        email: "tom@tipalti.com",
        name: "Tom",
      },
      {
        email: "nico@tipalti.com",
        name: "Nico",
      },
      {
        email: "ori@tipalti.com",
        name: "Ori",
      },
      {
        email: "igor@tipalti.com",
        name: "Igor",
      },
      {
        email: "sergey@approve.com",
        name: "Sergey",
      },
      {
        email: "reut@approve.com",
        name: "Reut",
      },
      {
        email: "ben@approve.com",
        name: "Ben",
      },
    ],
  });

  // await prisma.managementAssignment.createMany({
  //   data: [
  //     {
  //       employeeId: 1,
  //       managementLevelId: 1,
  //     },
  //     {
  //       employeeId: 2,
  //       managementLevelId: 2,
  //     },
  //     {
  //       employeeId: 3,
  //       managementLevelId: 3,
  //     },
  //     {
  //       employeeId: 4,
  //       managementLevelId: 4,
  //     },
  //     {
  //       employeeId: 5,
  //       managementLevelId: 5,
  //     },
  //     {
  //       employeeId: 6,
  //       managementLevelId: 6,
  //     },
  //   ],
  // });
  // await prisma.expense.createMany({
  //   data: [
  //     {
  //       employeeId: 1,
  //       name: "Expense 1",
  //       amount: 100,
  //       note: "Note 1",
  //     },
  //     {
  //       employeeId: 2,
  //       name: "Expense 2",
  //       amount: 200,
  //       note: "Note 2",
  //     },
  //     {
  //       employeeId: 3,
  //       name: "Expense 3",
  //       amount: 300,
  //       note: "Note 3",
  //     },
  //     {
  //       employeeId: 4,
  //       name: "Expense 4",
  //       amount: 400,
  //       note: "Note 4",
  //     },
  //     {
  //       employeeId: 5,
  //       name: "Expense 5",
  //       amount: 500,
  //       note: "Note 5",
  //     },
  //     {
  //       employeeId: 6,
  //       name: "Expense 6",
  //       amount: 600,
  //       note: "Note 6",
  //     },
  //   ],
  // });
  await prisma.managementAssignment.createMany({
    data: [
      {
        employeeId: 1,
        managerId: 4,
      },
      {
        employeeId: 2,
        managerId: 4,
      },
      {
        employeeId: 3,
        managerId: 5,
      },
      {
        employeeId: 4,
        managerId: 6,
      },
      {
        employeeId: 7,
        managerId: 5,
      },
      {
        employeeId: 8,
        managerId: 4,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
