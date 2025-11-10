"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateUser } from "../hooks/useCreateUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { registerFullSchema, RegisterFull } from "@repo/validation";

export default function AddUserForm({ user }: { user?: RegisterFull }) {
  const { createUser, isCreating } = useCreateUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const isEditSession = Boolean(user?._id);
  const isWorking = isCreating || isUpdating;
  const form = useForm<RegisterFull>({
    resolver: zodResolver(registerFullSchema),

    defaultValues: isEditSession
      ? user
      : {
          name: "",
          email: "",
          role: "user",
          password: "",
        },
  });

  function submitUserForm(data: RegisterFull) {
    if (isEditSession) {
      updateUser(
        { data, id: user?._id as string },
        { onSuccess: () => form.reset() }
      );
    } else {
      createUser(data, { onSuccess: () => form.reset() });
    }
  }
  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">Add User</SheetTitle>
        </SheetHeader>
        <SheetDescription asChild>
          <Form {...form}>
            <form
              className="space-y-8 px-4"
              onSubmit={form.handleSubmit(submitUserForm)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Enter user full name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Only admin can see your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(e) => field.onChange(e)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">user</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Only admin can see your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!user && (
                <>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>password</FormLabel>
                        <FormControl>
                          <Input {...field} required />
                        </FormControl>
                        <FormDescription>
                          Only admin can see your email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <Button type="submit" disabled={isWorking}>
                {isEditSession ? "Edit User" : "Create New User"}
              </Button>
            </form>
          </Form>
        </SheetDescription>
      </ScrollArea>
    </SheetContent>
  );
}
