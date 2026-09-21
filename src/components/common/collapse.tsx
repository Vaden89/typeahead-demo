import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export const Collapse = ({
  open,
  children,
  className,
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      aria-hidden={!open}
      inert={!open || undefined}
      className={cn(
        "grid transition-all duration-200 ease-out",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className,
      )}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
};
