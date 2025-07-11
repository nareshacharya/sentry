"use client";

import React from "react";
import ReactDOM from "react-dom";
import { cn } from "@/lib/utils";

export default function Modal({
  open,
  onClose,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className={cn(
          "relative bg-white w-full max-w-3xl rounded-lg shadow-lg max-h-[90vh] overflow-y-auto",
          className
        )}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
