import { cn } from "@/lib/utils";

function EmptyList({
  heading = "No text found...",
  className,
}: {
  heading?: string;
  className?: string;
}) {
  return <h2 className={cn("text-xl", className)}>{heading}</h2>;
}

export default EmptyList;