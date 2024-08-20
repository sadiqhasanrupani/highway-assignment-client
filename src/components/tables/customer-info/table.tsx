import { Customer } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./column";

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable = ({ customers }: CustomerTableProps) => {

  return (
    <DataTable columns={columns} data={customers} /> 
  );
};

export default CustomerTable;
