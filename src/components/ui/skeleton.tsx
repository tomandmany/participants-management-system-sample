import { cn } from "@/lib/utils"

function Skeleton({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-300", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Skeleton }
