"use client";

import { useRef, useState } from "react";
import { SentIcon } from "@hugeicons/core-free-icons";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { enquirySchema, SERVICE_OPTIONS, type EnquiryInput } from "@/lib/schemas";
import { track } from "@/lib/analytics";
import { SITE } from "@/content/site";

type FormState = {
  name: string;
  org: string;
  email: string;
  phone: string;
  service: EnquiryInput["service"] | "";
  message: string;
};

const EMPTY_STATE: FormState = {
  name: "",
  org: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const OPTIONAL_FIELDS = new Set<keyof FormState>(["phone", "message"]);

function validateField(name: keyof FormState, value: string): string | undefined {
  if (OPTIONAL_FIELDS.has(name) && !value) return undefined;
  const shape = enquirySchema.shape[name];
  const result = shape.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function EnquiryForm() {
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<FormState>(EMPTY_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleChange(name: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(name: keyof FormState) {
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values[name]) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = enquirySchema.safeParse({
      name: values.name,
      org: values.org,
      email: values.email,
      phone: values.phone || undefined,
      service: values.service || undefined,
      message: values.message || undefined,
      website: honeypotRef.current?.value ?? "",
    });

    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setStatus("success");
        track({ name: "enquiry_submitted", service: parsed.data.service });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-rule bg-paper-raised p-8">
        <p className="font-mono text-xs uppercase tracking-[0.09em] text-cleared">Sent</p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-primary">We&apos;ve got it.</h2>
        <p className="mt-2 text-sm text-slate">We&apos;ll come back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          ref={honeypotRef}
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <Field
        label="Name"
        name="name"
        required
        value={values.name}
        onChange={(e) => handleChange("name", e.target.value)}
        onBlur={() => handleBlur("name")}
        error={errors.name}
      />
      <Field
        label="Organisation"
        name="org"
        required
        value={values.org}
        onChange={(e) => handleChange("org", e.target.value)}
        onBlur={() => handleBlur("org")}
        error={errors.org}
      />
      <Field
        label="Work email"
        name="email"
        type="email"
        required
        value={values.email}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={() => handleBlur("email")}
        error={errors.email}
      />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        hint="Optional"
        value={values.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        onBlur={() => handleBlur("phone")}
        error={errors.phone}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="service" className="text-sm font-medium text-ink">
          Service <span className="text-slate">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          value={values.service}
          onChange={(e) => handleChange("service", e.target.value)}
          onBlur={() => handleBlur("service")}
          aria-invalid={!!errors.service}
          className="w-full rounded-sm border border-rule bg-paper px-3 py-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <option value="" disabled>
            Choose one
          </option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-xs text-signal">{errors.service}</p>}
      </div>

      <Field
        as="textarea"
        label="Tell us what's going on"
        name="message"
        hint="Optional"
        value={values.message}
        onChange={(e) => handleChange("message", e.target.value)}
        onBlur={() => handleBlur("message")}
        error={errors.message}
      />

      {status === "error" && (
        <p className="text-sm text-signal">
          Something went wrong sending this. Try again, or email us directly at{" "}
          {SITE.contactEmail ? (
            <a href={`mailto:${SITE.contactEmail}`} className="underline underline-offset-2">
              {SITE.contactEmail}
            </a>
          ) : (
            "our contact address"
          )}
          .
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} icon={SentIcon}>
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
