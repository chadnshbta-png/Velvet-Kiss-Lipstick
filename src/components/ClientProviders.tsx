"use client";

import { useEffect } from "react";
import { registerGSAP } from "@/lib/gsap-config";
import { useLenis } from "@/hooks/useLenis";
import CustomCursor from "@/components/ui/CustomCursor";
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
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
