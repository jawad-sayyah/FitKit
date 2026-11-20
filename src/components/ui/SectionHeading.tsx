import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Props {
  eyebrow?: string;
  title: string;
  linkTo?: string;
  linkLabel?: string;
}

export default function SectionHeading({ eyebrow, title, linkTo, linkLabel = "View all" }: Props) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-dark">{eyebrow}</p>}
        <h2 className="text-4xl font-extrabold sm:text-5xl">{title}</h2>
      </div>
      {linkTo && (
        <Link to={linkTo} className="hidden items-center gap-1 text-sm font-semibold hover:text-volt-dark sm:flex">
          {linkLabel} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
