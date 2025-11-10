"use client";
import { DataTable } from "@/components/DataTable";
import Spinner from "@/components/Spinner";
import { columns } from "@/features/orders/components/columns";
import { useGetUsers } from "@/features/users/hooks/useGetUsers";

export default function Page() {
  const { users, isLoading } = useGetUsers();
  if (isLoading) return <Spinner />;

  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
