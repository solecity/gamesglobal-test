import { Link } from "react-router-dom";

import styles from "./index.module.css";

const NavBar = () => {
  return (
    <header className={styles.header}>
      <h2>Backoffice</h2>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/operators">Operators</Link>
      </nav>
    </header>
  );
};

export default NavBar;
