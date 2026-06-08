import Button from "../Button/Button";
import css from "./Home.module.css";

const Home = () => {
  return (
    <section className={css.home} aria-labelledby="hero-title">
      <h1 className={css.title}> Find your perfect rental car</h1>
      <p className={css.text}>
        Reliable and budget-friendly rentals for any journey
      </p>

      <Button href="/catalog" className={css.heroButton}>
        View Catalog
      </Button>
    </section>
  );
};

export default Home;
