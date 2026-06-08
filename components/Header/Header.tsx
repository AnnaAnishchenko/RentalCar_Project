"use client";

import Logo from "../Logo/Logo";
import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo} aria-label="RentalCar logo">
        <Logo />
      </Link>
      <nav className={css.navigation} aria-label="Main navigation">
        <ul className={css.menu}>
          <li className={pathname === "/" ? css.active : css.link}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathname === "/catalog" ? css.active : css.link}>
            <Link href="/catalog">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
