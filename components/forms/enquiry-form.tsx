"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { SentIcon } from "@hugeicons/core-free-icons";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { enquirySchema, SERVICE_OPTIONS, type EnquiryInput } from "@/lib/schemas";
import { track } from "@/lib/analytics";
import { SITE } from "@/content/site";

const RECAPTCHA_V3_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;
const RECAPTCHA_V2_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;
const RECAPTCHA_ACTION = "enquiry_submit";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (
        container: HTMLElement,
        params: { sitekey: string; callback: (token: string) => void }
      ) => number;
    };
  }
}

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

  // reCAPTCHA v3 runs invisibly on every submit. If the server scores that
  // submission too low, it asks for the v2 checkbox instead of rejecting
  // outright — recaptchaChallenge switches the form into that fallback mode.
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [recaptchaChallenge, setRecaptchaChallenge] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);
  const v2ContainerRef = useRef<HTMLDivElement>(null);
  const v2Rendered = useRef(false);

  useEffect(() => {
    if (
      !recaptchaChallenge ||
      !recaptchaReady ||
      !RECAPTCHA_V2_SITE_KEY ||
      v2Rendered.current ||
      !v2ContainerRef.current
    ) {
      return;
    }
    v2Rendered.current = true;
    window.grecaptcha?.render(v2ContainerRef.current, {
      sitekey: RECAPTCHA_V2_SITE_KEY,
      callback: (token) => setV2Token(token),
    });
  }, [recaptchaChallenge, recaptchaReady]);

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

    if (recaptchaChallenge && !v2Token) {
      // Submit button is disabled in this state too — this is a safety net.
      return;
    }

    setStatus("submitting");

    let recaptchaV3Token: string | undefined;
    if (recaptchaReady && RECAPTCHA_V3_SITE_KEY && window.grecaptcha) {
      try {
        recaptchaV3Token = await window.grecaptcha.execute(RECAPTCHA_V3_SITE_KEY, {
          action: RECAPTCHA_ACTION,
        });
      } catch {
        // Proceed without a v3 token — the server falls back to v2 (or, if
        // reCAPTCHA isn't configured server-side either, skips it entirely).
      }
    }

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          recaptchaV3Token,
          recaptchaV2Token: v2Token ?? undefined,
        }),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setStatus("success");
        track({ name: "enquiry_submitted", service: parsed.data.service });
        return;
      }

      if (json.error === "recaptcha_challenge") {
        setRecaptchaChallenge(true);
        setStatus("idle");
        return;
      }

      setStatus("error");
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
      {(RECAPTCHA_V3_SITE_KEY || RECAPTCHA_V2_SITE_KEY) && (
        <Script
          // v3's execute() only works with a site key declared right here in
          // the script URL — it can't be passed at call time. render=explicit
          // would leave v3 permanently rejecting our key ("Invalid site key
          // or not loaded in api.js"), even though .ready()/.execute() exist
          // and appear to work. .render() (the v2 checkbox) has no such
          // restriction, so it's unaffected either way.
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_V3_SITE_KEY ?? "explicit"}`}
          strategy="afterInteractive"
          onLoad={() => {
            // window.grecaptcha exists as soon as the script file loads, but
            // .execute/.render aren't attached until Google's own async init
            // finishes — grecaptcha.ready() is what actually waits for that.
            window.grecaptcha?.ready(() => setRecaptchaReady(true));
          }}
        />
      )}

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

      {recaptchaChallenge && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-ink">
            Quick check before we send this — please confirm you&apos;re not a bot.
          </p>
          <div ref={v2ContainerRef} />
        </div>
      )}

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

      <Button
        type="submit"
        disabled={status === "submitting" || (recaptchaChallenge && !v2Token)}
        icon={SentIcon}
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
