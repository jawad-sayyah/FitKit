import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  icon: ReactNode;
  title: string;
  message: string;
  ctaLabel: string;
  ctaTo: string;
}

export default function EmptyState({ icon, title, message, ctaLabel, ctaTo }: Props) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-line bg-mist px-6 py-14 text-center">
      <div className="mb-4 text-ink/40">{icon}</div>
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-ink/60">{message}</p>
      <Link
        to={ctaTo}
        className="mt-6 rounded-full bg-volt px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:bg-volt-dark"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
