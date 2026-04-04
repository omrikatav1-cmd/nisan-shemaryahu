"use client";

type FormFieldRowProps = {
  label: string;
  children: React.ReactNode;
  required?: boolean;
};

export default function FormFieldRow({ label, children, required = false }: FormFieldRowProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#F1F5F9]">
        {label}
        {required && (
          <span className="text-[#EF4444] mr-1" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
