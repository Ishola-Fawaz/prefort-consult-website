"use client";

import { useActionState } from "react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { login, type LoginState } from "./actions";

const INITIAL_STATE: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, INITIAL_STATE);

  return (
    <div className="mx-auto max-w-md px-5 py-16 md:px-7 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">Admin</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary">Sign in</h1>
      <p className="mt-2 text-sm text-slate">
        Enquiry submissions are only visible to invited admins.
      </p>

      <form action={formAction} className="mt-8 flex flex-col gap-5">
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field
          label="Password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />

        {state?.error && <p className="text-sm text-signal">{state.error}</p>}

        <Button type="submit" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
