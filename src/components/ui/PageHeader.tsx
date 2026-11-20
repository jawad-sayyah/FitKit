interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <h1 className="text-5xl font-extrabold sm:text-6xl">
          {title}
          <span className="text-volt">.</span>
        </h1>
        {subtitle && <p className="mt-2 max-w-xl text-white/60">{subtitle}</p>}
      </div>
    </div>
  );
}
