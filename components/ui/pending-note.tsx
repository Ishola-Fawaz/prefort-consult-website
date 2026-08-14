type PendingNoteProps = {
  children: React.ReactNode;
};

export function PendingNote({ children }: PendingNoteProps) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-rule bg-paper-raised p-5">
      <span className="shrink-0 rounded-sm border border-rule px-2 py-1 font-mono text-xs uppercase tracking-[0.09em] text-slate">
        Pending
      </span>
      <p className="text-sm text-slate">{children}</p>
    </div>
  );
}
