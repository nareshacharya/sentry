"use client";
import { cn } from "@/lib/utils";

export default function Animated({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("animate-fade-in", className)}>{children}</div>;
}
