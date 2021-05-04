import React from "react";

import styles from "./Spinner.module.scss";

const Spinner = () => (
  <div className={styles.wrapper}>
    <div className={styles.bounce1} />
    <div className={styles.bounce2} />
  </div>
);

export default Spinner;
