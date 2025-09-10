"use client";

import { Button } from "components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "components/ui/sheet";
import { ChevronDown, MenuIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/spoltec-logo-new.png";
import links from "@data/navlinks.json";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/collapsible";

export function NavSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <MenuIcon className="size-6" />
          <span className="sr-only">Öppna meny</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex items-center">
            <SheetClose asChild>
              <Link href="/" className="block">
                <Image
                  src={logo}
                  alt="Spoltec logo"
                  width={120}
                  height={48}
                  priority
                />
                <span className="sr-only">Spoltec startsidan</span>
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {links.map((link) => {
              if (link.links) {
                return (
                  <li key={link.label}>
                    <Collapsible
                      className="w-full"
                      defaultOpen={link.label === "Tjänster"}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-3 h-auto text-left font-medium hover:bg-gray-100"
                        >
                          <span>{link.label}</span>
                          <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-1 ml-3 border-l border-gray-200 pl-4 space-y-1">
                        {link.links.map((subLink) => (
                          <SheetClose asChild key={subLink.label}>
                            <Link
                              href={subLink.href}
                              className="block p-2 text-sm text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded transition-colors"
                              aria-label={`Gå till ${subLink.label}`}
                            >
                              {subLink.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                );
              }
              return (
                <li key={link.label}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      className="block p-3 font-medium hover:bg-gray-100 rounded transition-colors"
                      aria-label={`Gå till ${link.label}`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>

        <SheetFooter className="border-t p-4">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Stäng
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
