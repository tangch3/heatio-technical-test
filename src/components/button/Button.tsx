import { ButtonType } from "@/enums/shared-enums";
import { ReactElement } from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  name?: string;
  icon?: ReactElement;
  onClick?: () => void;
  type?: ButtonType;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  name,
  icon,
  onClick,
  type,
  disabled = false,
  className,
}) => {
  return (
    <button
      className={`${styles.button} ${className ? className : ""} ${
        type && !disabled ? styles[type] : ""
      } ${disabled && styles.disabled}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {name}
    </button>
  );
};

export default Button;
