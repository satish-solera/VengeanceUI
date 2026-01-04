
"use client"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

import {
  FileText,
  Github,
  Instagram,
  LinkedinIcon,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const Footer = () => {

  const icons = [
    {
      icon: Instagram,
      link: "https://www.instagram.com/epitome0.0/",
    }
  ]

  const firstLI = [
    {
      li: '01 Components',
      href: '/docs/components-overview'
    },
    {
      li: '02 Templates',
      href: '/templates'
    },
  ]

  const secondLI = [
    {
      li: '03 Playground',
      href: '/playground'
    },
    {
      li: '04 Pricing',
      href: "/pricing"
    },

  ]
  return (



    <div className="w-full flex justify-center items-center flex-col">
      <section className="w-full py-20 bg-background overflow-hidden flex items-center justify-center">
        <h1 className="vengeanceUI-text text-[13vw] leading-none tracking-tighter text-center select-none w-full whitespace-nowrap">
          VENGEANCE UI
        </h1>
      </section>
    </div>

  );
};

export default Footer;

