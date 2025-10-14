import { gql } from '@apollo/client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function NavigationMenu({ menuItems, className, children }) {
  if (!menuItems) {
    return null;
  }

  const navRef = useRef(null);
  const [openIds, setOpenIds] = useState(() => new Set());

  const isOpen = (id) => openIds.has(id);
  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const closeAll = () => setOpenIds(new Set());

  // Close on outside click + Esc
  useEffect(() => {
    const onDocClick = (e) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) closeAll();
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') closeAll();
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  // Convert flat list to tree structure
  const buildMenuTree = (items) => {
    const map = {};
    const roots = [];

    items.forEach((item) => {
      map[item.id] = { ...item, children: [] };
    });

    items.forEach((item) => {
      if (item.parentId && map[item.parentId]) {
        map[item.parentId].children.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });

    return roots;
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      const hasChildren = item.children?.length > 0;
      const open = isOpen(item.id);

      return (
        <li
          key={item.id ?? ''}
          className={`${hasChildren ? 'hasChildren' : ''} ${open ? 'open' : ''}`.trim() || undefined}
        >
          {hasChildren ? (
            <>
              {/* Keep as <a> via Next <Link>; intercept click to toggle */}
              <Link
                href={item.path ?? ''}
                onClick={(e) => {
                  // toggle submenu instead of navigating
                  e.preventDefault();
                  toggle(item.id);
                }}
                aria-expanded={open ? 'true' : 'false'}
                aria-haspopup="true"
              >
                {item.label ?? ''}
              </Link>
              <ul className={open ? 'visible' : undefined}>{renderMenuItems(item.children)}</ul>
            </>
          ) : (
            <Link href={item.path ?? ''}>{item.label ?? ''}</Link>
          )}
        </li>
      );
    });
  };

  const menuTree = buildMenuTree(menuItems);

  return (
    <nav
      ref={navRef}
      className={className}
      role="navigation"
      aria-label={`${menuItems[0]?.menu?.node?.name ?? 'Main'} menu`}
    >
      <ul className="menu">
        {renderMenuItems(menuTree)}
        {children}
      </ul>
    </nav>
  );
}

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
};
