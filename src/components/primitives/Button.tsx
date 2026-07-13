import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Button — design-system.md §6.1.
 * Five approved variants. Renders <Link> for internal `to`, <a> for external
 * `href`, otherwise <button>. 48px height (44 mobile), Inter Medium 16.
 */
export type ButtonVariant =
  | "primary" //         solid deep teal, white label
  | "primaryOnDark" //   solid mint, ink-strong label (dark/photo surfaces only)
  | "secondary" //       1.5px teal outline
  | "tertiary" //        label + arrow, no container
  | "download"; //       secondary + download glyph + file meta

interface ButtonBaseProps {
  variant?: ButtonVariant;
  children: ReactNode;
  /** Internal route — renders react-router <Link>. */
  to?: string;
  /** External URL — renders <a target="_blank"> with SR announcement. */
  href?: string;
  /** File meta shown on the download variant, e.g. "PDF · 7.4 MB". */
  fileMeta?: string;
  className?: string;
}

type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

const base =
  "group inline-flex items-center justify-center gap-2 font-sans text-body font-medium " +
  "transition-[color,background-color,box-shadow,transform] duration-200 ease-settle " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40";

const contained = "h-11 rounded-btn px-6 md:h-12";

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(contained, "bg-brand-teal text-white hover:bg-brand-tealMid hover:shadow-lift"),
  primaryOnDark: cn(contained, "bg-brand-mint text-ink-strong hover:bg-brand-mintTint hover:shadow-lift"),
  secondary: cn(
    contained,
    "border-[1.5px] border-brand-teal text-brand-teal hover:bg-brand-teal/5",
  ),
  tertiary: "text-brand-tealMid hover:text-brand-teal",
  download: cn(
    contained,
    "border-[1.5px] border-brand-teal text-brand-teal hover:bg-brand-teal/5",
  ),
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", children, to, href, fileMeta, className, ...rest },
  ref,
) {
  const classes = cn(base, variantClasses[variant], className);

  const content = (
    <>
      {variant === "download" && <Download aria-hidden size={20} strokeWidth={1.5} />}
      <span>{children}</span>
      {variant === "download" && fileMeta && (
        <span className="text-body-s text-neutral-500">{fileMeta}</span>
      )}
      {variant === "tertiary" && (
        <ArrowRight
          aria-hidden
          size={20}
          strokeWidth={1.5}
          className="transition-transform duration-200 ease-settle group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} {...rest}>
      {content}
    </button>
  );
});
