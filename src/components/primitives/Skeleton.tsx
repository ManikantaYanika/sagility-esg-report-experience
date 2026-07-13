import { cn } from "@/lib/cn";

/** Loading placeholder — neutral shimmer-free block (calm motion grammar). */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-card bg-neutral-100", className)}
    />
  );
}
