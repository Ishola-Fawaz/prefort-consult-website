import { cn } from "@/lib/utils";

type BaseFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
};

type InputFieldProps = BaseFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "id" | "className"> & {
    as?: "input";
  };

type TextareaFieldProps = BaseFieldProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "id" | "className"> & {
    as: "textarea";
  };

type FieldProps = InputFieldProps | TextareaFieldProps;

export function Field(props: FieldProps) {
  const { label, name, required, error, hint, className, as = "input", ...rest } = props;
  const id = `field-${name}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const controlClasses = cn(
    "w-full rounded-sm border bg-paper px-3 py-2 text-ink placeholder:text-slate/60",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    error ? "border-signal" : "border-rule",
    className
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-slate"> *</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={cn(controlClasses, "min-h-32 resize-y")}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          name={name}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={controlClasses}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {hint && !error && (
        <p id={hintId} className="text-xs text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-signal">
          {error}
        </p>
      )}
    </div>
  );
}
