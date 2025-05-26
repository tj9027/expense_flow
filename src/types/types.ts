export const StatusMap = {
  0: "Pending",
  1: "Approved",
  2: "Rejected",
  5: "In Review",
};

export interface Expense {
  name: string;
  amount: number;
  id: number;
  note: string | null;
  status: number;
  submitterId: number;
  submitter: {
    name: string;
    id: number;
  };
  history: {
    status: number;
    temporaryStatus: number | null;
    submitter: { id: number; name: string };
    date: Date;
  }[];
}

export interface ManagedEmployee {
  id: number;
  name: string;
  email: string;
  managementAssignmentsAsEmployee: { managerId: number | null }[];
}
