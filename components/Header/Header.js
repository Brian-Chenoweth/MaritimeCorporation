import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FaBars, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

import { NavigationMenu, SkipNavigationLink } from '../';

import styles from './Header.module.scss';
let cx = classNames.bind(styles);

export default function Header({ className, menuItems }) {
  const [isNavShown, setIsNavShown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  // Classes with scroll-aware styles
  const headerClasses = cx('header', className, { scrolled: isScrolled });
  const logoWrapClasses = cx('logo-wrap', { scrolled: isScrolled });
  const headerContentClasses = cx('container', 'header-content', {
    scrolled: isScrolled,
  });

  const navClasses = cx(
    'primary-navigation',
    isNavShown ? cx('show') : undefined
  );

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle submenu overflow flipping
  useEffect(() => {
    const items = menuRef.current?.querySelectorAll('li') || [];

    items.forEach((li) => {
      const submenu = li.querySelector('ul ul'); // 3rd-level menu
      if (!submenu) return;

      const handleEnter = () => {
        const rect = submenu.getBoundingClientRect();
        const overflowsRight = rect.right > window.innerWidth;

        if (overflowsRight) {
          submenu.style.left = 'auto';
          submenu.style.right = '100%';
        } else {
          submenu.style.left = '100%';
          submenu.style.right = 'auto';
        }
      };

      li.addEventListener('mouseenter', handleEnter);
      li.addEventListener('focusin', handleEnter);

      // cleanup
      return () => {
        li.removeEventListener('mouseenter', handleEnter);
        li.removeEventListener('focusin', handleEnter);
      };
    });
  }, []);

  return (
    <header className={headerClasses}>
      <div className={logoWrapClasses}>
        <div className="container">
          <div className={cx('logo')}>
            <Link legacyBehavior href="/">
              <a title="Home">
                <Image
                  src="/logo.png"
                  width={400}
                  height={80}
                  alt="Cal Poly University logo"
                  layout="responsive"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>

      <SkipNavigationLink />

      <div className={headerContentClasses}>
        <div className={cx('bar')}>
          <a href="/" className={cx('titleName')}>
            Cal Maritime Corporation
          </a>

          <button
            type="button"
            className={cx('nav-toggle')}
            onClick={() => setIsNavShown(!isNavShown)}
            aria-label="Toggle navigation"
            aria-controls={cx('primary-navigation')}
            aria-expanded={isNavShown}
          >
            <FaBars />
          </button>

          <NavigationMenu
            id={cx('primary-navigation')}
            className={navClasses}
            menuItems={menuItems}
            ref={menuRef}
          >
            <li>
              <Link legacyBehavior href="/search">
                <a>
                  <FaSearch title="Search" role="img" />
                </a>
              </Link>
            </li>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
