import React from "react";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string | { pathname?: string; query?: Record<string, string> };
  children?: React.ReactNode;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className,
  style,
  target,
  rel,
  replace,
  ...props
}) => {
  const urlString = typeof href === "string" ? href : href.pathname || "/";
  const isExternal =
    urlString.startsWith("http://") ||
    urlString.startsWith("https://") ||
    urlString.startsWith("mailto:") ||
    urlString.startsWith("tel:") ||
    urlString.startsWith("#");

  if (isExternal) {
    return (
      <a href={urlString} className={className} style={style} target={target} rel={rel} {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      to={urlString}
      className={className}
      style={style}
      target={target}
      rel={rel}
      replace={replace}
      {...(props as Omit<RouterLinkProps, "to">)}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
