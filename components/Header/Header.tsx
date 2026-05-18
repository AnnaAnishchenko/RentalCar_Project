import Logo from "../Logo/Logo";
import css from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" className={css.logo} aria-label="RentalCar logo">
        <Logo />
      </Link>
      <nav className={css.navigation}>
        <ul className={css.menu}>
          <li className={css.link}>
            <Link href="/">Home</Link>
          </li>
          <li className={css.link}>
            <Link href="/catalog">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
