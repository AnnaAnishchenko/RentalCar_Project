import Link from "next/link";
import clsx from "clsx";

import css from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline" | "text";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  target?: "_blank" | "_self";
};

const Button = ({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
  onClick,
  disabled,
  target,
}: ButtonProps) => {
  const classes = clsx(css.button, css[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
