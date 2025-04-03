import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className, ...rest }: props) => {
  return <button className={classNames("p-2 px-4 rounded-xl text-xl", className)} {...rest}>{children}</button>;
};
