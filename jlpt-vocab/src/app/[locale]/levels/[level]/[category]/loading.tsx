export default function Loading() {
  return (
    <div className="space-y-3">
      <div className="h-6 w-40 animate-pulse rounded bg-neutral-200" />
      <div className="h-10 w-full animate-pulse rounded bg-neutral-100" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-56 animate-pulse rounded-xl bg-neutral-100" />
        ))}
      </div>
    </div>
  );
}