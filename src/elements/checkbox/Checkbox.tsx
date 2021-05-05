import React from "react";

import styles from "./Checkbox.module.scss";

interface Props {
  selected: string;
  onChange: any;
  text: string;
  value: string;
}

const Checkbox: React.FC<Props> = ({ selected, onChange, text, value }) => (
  <div
    className={styles.wrapper}
    onClick={() => {
      onChange(value);
    }}
  >
    <div className={`${styles.outerCircle} ${value !== selected && styles.unselected}`}>
      <div className={`${styles.innerCircle} ${value !== selected && styles.unselectedCircle}`} />
    </div>
    <div className={styles.label}>{text}</div>
  </div>
);

export default React.memo(Checkbox);
