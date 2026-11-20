import EmptyState from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="px-4 py-20">
      <EmptyState
        icon={<span className="font-display text-7xl font-extrabold">404</span>}
        title="Page not found"
        message="That page doesn't exist."
        ctaLabel="Back home"
        ctaTo="/"
      />
    </div>
  );
}
