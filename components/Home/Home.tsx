import css from "./Home.module.css";
import Link from "next/link";

const Home = () => {
  return (
    <section className={css.home}>
      <h1 className={css.title}> Find your perfect rental car</h1>
      <p className={css.text}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <Link href="/catalog" className={css.button}>
        View Catalog
      </Link>
    </section>
  );
};

export default Home;
