"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import OnboardForm from "@/components/OnboardForm";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Sentry 🏢</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-xl">
        Simplify management of your community with our easy onboarding.
      </p>
      <Button onClick={() => setOpen(true)}>Onboard Community</Button>
      <Modal open={open} onClose={() => setOpen(false)} className="p-4">
        <OnboardForm />
      </Modal>
    </main>
  );
}
