"use client";

import { useEffect } from "react";
import { registerGSAP } from "@/lib/gsap-config";
import { useLenis } from "@/hooks/useLenis";
import AmbientBackground from "@/components/ui/AmbientBackground";
import Navbar from "@/components/layout/Navbar";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();

  useEffect(() => {
    registerGSAP();
  }, []);

  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
