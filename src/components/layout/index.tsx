import { FunctionComponent, ReactNode } from "react";

import styles from "./index.module.css";

interface ILayout {
  children: ReactNode;
}

const Layout: FunctionComponent<ILayout> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Layout;
