# Expenses Flow

This is a Next.js project designed to manage and track expenses. It includes features such as user login, expense submission, approval workflows, and detailed expense history.

## Key Features

1.  User Login
    Select a user from the dropdown to log in.

2) Expense Submission
   Submit new expenses with details like name, amount, and notes.

3) Expense Approval
   Approvers can approve or deny expenses.

4) Expense History
   View detailed history of expense status changes.

## Getting Started

##### Prerequisites

- Node.js (v16 or later)
- npm or yarn (package manager)
- Prisma CLI (for database migrations)

##### Run Locally

- install dependencies
  - `npm i` or `yarn`
  - install db from prisma schema
    - delete file `/prisma/dev.db`
    - run `npx prisma db push`
    - run `npm run seed`
    - run `npx prisma generate`
    - to visualize the database: `npx prisma studio`
  - run `npm dev` and open browser to `http:localhost:3000`
- can use existing db by just `npx prisma generate`

### Possible Improvements
- write tests
- seperate into different pages
- more robust types
- remove direct trpc calls from components
- more validation
- environment variables in config
- ci/cd test and deployment
- ui/ux
- migrate to a proper database
- authentication
- ability to update submitted expense details
- loading icon when awaiting data
- better database model relationship
