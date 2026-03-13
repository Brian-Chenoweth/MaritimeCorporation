import Link from 'next/link';
import { getLinkRel } from 'utilities';

import styles from './Button.module.scss';

/**
 * Render the Button component.
 *
 * @param {Props} props The props object.
 * @param {string} props.href The href attribute. If provided the button will be an <a> element.
 * @param {'primary'|'secondary'} props.styleType The type of the button
 * @param {string} props.className An optional className to be added to the button
 * @return {React.ReactElement} The Button component.
 */
export default function Button({
  href,
  styleType,
  className,
  children,
  rel,
  target,
  ...props
}) {
  const buttonStyle = styleType === 'secondary' ? 'secondary' : 'primary';

  const buttonClassName = [
    styles.button,
    styles[`button-${buttonStyle}`],
    className ?? undefined,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <Link
        href={href}
        className={buttonClassName}
        role="button"
        target={target}
        rel={getLinkRel({ href, rel, target })}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
