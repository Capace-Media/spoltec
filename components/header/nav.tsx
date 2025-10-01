"use client";

import { useState, useEffect, useCallback } from "react";
import links from "@data/navlinks.json";
import { Button, buttonVariants } from "components/ui/button";
import logo from "../../public/images/spoltecs-logo.png";
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
import { NavSheet } from "./nav-sheet";
import { getBlurPlaceholder } from "@lib/utils/blur-placeholder";

export default function Nav() {
  const { isScrolled, isVisible } = useScrollBehavior({
    scrollThreshold: 50,
    hideThreshold: 100,
  });

  return (
    <header className="relative">
      <nav
        className={cn(
          "flex justify-between py-3 fixed top-0 left-1/2 -translate-x-1/2 w-full px-8 md:px-14 max-w-360 z-50 transition-all duration-300 ease-in-out",
          // Use will-change to optimize transforms
          "will-change-transform",
          // Dynamic styles based on scroll state
          isScrolled && "bg-white/95 px-8 lg:px-24 py-1 md:py-4",
          !isVisible && "-translate-y-full",
          isVisible && "translate-y-0"
        )}
      >
        <Link href="/">
          <Image
            src={logo}
            alt="Spoltec logo"
            width={logo.width}
            height={logo.height}
            priority
            quality={50}
            sizes="(max-width: 1024px) 116px, 155px"
            className={cn(
              "w-auto transition-all duration-300 ease-in-out will-change-transform",
              isScrolled ? "h-12" : "h-12 lg:h-16"
            )}
          />
          <span className="sr-only">Gå till startsidan</span>
        </Link>
        <div className="hidden 2lg:flex items-center gap-5">
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
                          {link.links.map((child) => {
                            return (
                              <li key={child.label} className="row-span-3">
                                <NavigationMenuLink
                                  className="text-primary font-bold"
                                  asChild
                                >
                                  <Link href={child.href}>{child.label}</Link>
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
                return (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink
                      className="text-primary font-bold"
                      asChild
                    >
                      <Link
                        href={link.href}
                        aria-label={`Gå till ${link.label}`}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <Link
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              href="/kontakta-oss"
              aria-label="Kontakta oss för mer information"
            >
              Kontakta oss
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" })
              )}
              href="/akut-hjalp"
              aria-label="Akut hjälp för ert avloppssystem"
            >
              Akut hjälp
            </Link>
          </div>
        </div>

        <div className="2lg:hidden flex items-center gap-4">
          <NavSheet />
        </div>
      </nav>
    </header>
  );
}
