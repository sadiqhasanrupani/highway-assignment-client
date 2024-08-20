import { Customer } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Customer>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email Address" },
  { accessorKey: "phoneNumber", header: "Phone Number" },
  { accessorKey: "address", header: "Address" },
];
