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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(e);
    if (!e.defaultPrevented && typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (urlString === currentPath) {
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: false });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <RouterLink
      to={urlString}
      className={className}
      style={style}
      target={target}
      rel={rel}
      replace={replace}
      onClick={handleClick}
      {...(props as Omit<RouterLinkProps, "to">)}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
