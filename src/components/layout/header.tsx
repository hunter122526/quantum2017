'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { UserNav } from "./user-nav";

export default function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="flex items-center justify-between px-8 py-2 bg-card shadow-sm sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/uantumalphaindia.png"
          alt="Quantum Alpha India"
          width={100}
          height={60}
          priority
          className="h-auto w-auto"
        />
      </Link>
      <div className="flex items-center gap-4">
        {loading ? (
          <div className="h-10 w-20 animate-pulse bg-muted rounded-md" />
        ) : user ? (
          <UserNav />
        ) : (
          <>
            <Button asChild variant="ghost">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
