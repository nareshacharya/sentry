"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-[400px] p-6 text-center">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Welcome to Sentry 🏢</h1>
          <Button onClick={() => (window.location.href = "/onboard")}>
            Get Started
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
