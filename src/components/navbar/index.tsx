import { Link } from "react-router-dom";

import styles from "./index.module.css";

const NavBar = () => {
  return (
    <header className={styles.header}>
      <h2>Backoffice</h2>

      <nav>
        <Link data-testid="home" to="/">
          Home
        </Link>
        <Link data-testid="operators" to="/operators">
          Operators
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
