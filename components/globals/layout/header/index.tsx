"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../../../../public/images/spoltec-logo-new.png";
import { LgNavigation } from "./lg-navigation";

const Header = () => {
  const [isMenuScroll, setMenuScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 20) {
        setMenuScroll(true);
      } else {
        setMenuScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <header>
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <div
            className={`relative nav-style  ${
              isMenuScroll
                ? "md:h-[60px] md:w-[120px] h-[50px] w-[110px]"
                : "md:h-[100px] md:w-[200px] h-[80px] w-[150px]"
            }`}
          >
            <Image
              src={logo}
              fill
              style={{
                objectFit: "contain",
              }}
              alt="Spoltec Logotyp"
            />
          </div>
        </Link>

        <div>
          <LgNavigation />
        </div>
        <div></div>
      </nav>
    </header>
  );
};

export default Header;
