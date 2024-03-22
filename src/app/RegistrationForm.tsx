"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";

import { schema } from "./registrationSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const RegistrationForm = ({
  onDataAction,
  onFormAction,
}: {
  onDataAction: (data: z.infer<typeof schema>) => Promise<{
    message: string;
    user?: z.infer<typeof schema>;
    issues?: string[];
  }>;
  onFormAction: (
    prevState: {
      message: string;
      user?: z.infer<typeof schema>;
      issues?: string[];
    },
    data: FormData
  ) => Promise<{
    message: string;
    user?: z.infer<typeof schema>;
    issues?: string[];
  }>;
}) => {
  const [state, formAction] = useFormState(onFormAction, {
    message: "",
  });
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      first: "",
      last: "",
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    /** api - json 방식 */
    // fetch("/api/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    // const formData = new FormData();
    // formData.append("first", data.first);
    // formData.append("last", data.last);
    // formData.append("email", data.email);
    // fetch("/api/registerForm", {
    //   method: "POST",
    //   body: formData,
    //   // Content-Type은 FormData가 기본값이라 보낼 필요 없음
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    // console.log(await onDataAction(data));
    // const formData = new FormData();
    // formData.append("first", data.first);
    // formData.append("last", data.last);
    // formData.append("email", data.email);
    // console.log(await onFormAction(formData));
  };
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Form {...form}>
      <div className="">{state?.message}</div>
      <form
        ref={formRef}
        className="space-y-8"
        onSubmit={form.handleSubmit(() => formRef?.current?.submit())}
        action={formAction}
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your First name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your Last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage /> *
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
