"use client";
import { DataTable } from "@/components/DataTable";
import { columns } from "../../features/users/components/columns";
import { useGetUsers } from "@/features/users/hooks/useGetUsers";

export default function Page() {
  // const users = await getData();
  const { users, isLoading } = useGetUsers();
  if (isLoading) return <p>isloading</p>;
  console.log(users)
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
