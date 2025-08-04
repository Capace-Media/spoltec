"use client";

import { useState, useEffect, useCallback } from "react";
import links from "@data/navlinks.json";
import { Button, buttonVariants } from "components/ui/button";
import logo from "../../public/images/spoltec-logo-new.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "components/ui/navigation-menu";
import { cn } from "@lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useScrollBehavior } from "hooks/useScrollBehavior";

export default function Nav() {
  const { isScrolled, isVisible } = useScrollBehavior({
    scrollThreshold: 50,
    hideThreshold: 100,
  });

  return (
    <header className="relative w-full">
      <nav
        className={cn(
          "md:py-10 flex justify-between py-2 contain fixed -translate-x-1/2 top-0 left-1/2 w-full z-50 transition-all duration-300 ease-in-out",
          // Dynamic styles based on scroll state
          isScrolled && "bg-white/95 backdrop-blur-md shadow-lg py-1 md:py-4",
          !isVisible && "-translate-y-full",
          isVisible && "translate-y-0"
        )}
      >
        <Link href="/">
          <Image
            src={logo}
            alt="Spoltec"
            width={150}
            height={60}
            priority
            className={cn(
              "w-auto transition-all duration-300 ease-in-out",
              isScrolled ? "h-6 md:h-8" : "h-8 md:h-12"
            )}
          />
        </Link>
        <div className="hidden lg:flex items-center gap-5">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {links.map((link) => {
                if (link.links) {
                  return (
                    <NavigationMenuItem key={link.label}>
                      <NavigationMenuTrigger className="text-primary font-bold bg-transparent">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          {link.links.map((child) => (
                            <li key={child.label} className="row-span-3">
                              <NavMenuLink href={child.href}>
                                {child.label}
                              </NavMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
                return (
                  <NavMenuLink key={link.label} href={link.href}>
                    {link.label}
                  </NavMenuLink>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <Link
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              href="/kontakta-oss"
            >
              Kontakta oss
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" })
              )}
              href="/akut-hjalp"
            >
              Akut hjälp
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function NavMenuLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink className="text-primary font-bold" asChild>
        <Link href={href}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
