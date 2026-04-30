import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const avatarStyles = cva(
  [
    "inline-flex items-center justify-center select-none",
    "bg-brand-primary text-text-inverse overflow-hidden font-semibold",
  ],
  {
    variants: {
      size: {
        sm: "text-xxs size-7",
        md: "size-10 text-base",
        lg: "size-14 text-lg",
      },
      shape: {
        circle: "rounded-full",
        square: "",
      },
    },
    compoundVariants: [
      { shape: "square", size: "sm", class: "rounded-sm" },
      { shape: "square", size: "md", class: "rounded-md" },
      { shape: "square", size: "lg", class: "rounded-lg" },
    ],
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
);

export interface AvatarProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "className">,
    VariantProps<typeof avatarStyles> {
  /**
   * Image source. When provided, an `<img>` is rendered instead of initials.
   */
  src?: string;
  /**
   * Accessible label for the avatar. Required so screen readers can describe
   * the user. When `src` is omitted, the first 1–2 characters render visibly.
   */
  alt: string;
  /**
   * Initials shown when `src` is not provided. Defaults to the first two
   * characters of `alt`.
   */
  initials?: string;
  /**
   * Size of the avatar.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Shape of the avatar.
   * @default "circle"
   */
  shape?: "circle" | "square";
  /** Override or extend the computed Tailwind class list. */
  className?: string;
}

/**
 * User avatar. Renders initials by default; supply `src` for a photo.
 *
 * @example
 * ```tsx
 * <Avatar alt="Kota Ichikawa" />
 * <Avatar alt="Kota Ichikawa" src="/photo.jpg" />
 * <Avatar alt="Kota Ichikawa" size="lg" shape="square" />
 * ```
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, initials, size, shape, className, ...rest },
  ref,
) {
  const fallback = initials ?? alt.slice(0, 2).toUpperCase();
  return (
    <span
      ref={ref}
      role="img"
      aria-label={alt}
      className={cn(avatarStyles({ size, shape }), className)}
      {...rest}
    >
      {src ? (
        <img src={src} alt="" className="size-full object-cover" />
      ) : (
        <span aria-hidden="true">{fallback}</span>
      )}
    </span>
  );
});
