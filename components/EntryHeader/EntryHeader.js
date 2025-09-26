// EntryHeader.jsx
import className from 'classnames/bind';
import { useRouter } from 'next/router';

import { FeaturedImage, Heading, PostInfo } from 'components';

import styles from './EntryHeader.module.scss';

const cx = className.bind(styles);

export default function EntryHeader({ title, image, date, author, className }) {
  const hasText = title || date || author;
  const { pathname } = useRouter();
  const isHome = pathname === '/';

  return (
    <div className={cx(['entry-header', className])}>
      {image && (
        <div className={cx('image')}>
          {/* regular text block (if you keep it) */}
          <div className="container">
            {hasText && (
              <div className={cx('text')}>
                {!!title && <Heading className={cx('title', 'container')}>{title}</Heading>}
                <PostInfo className={cx('byline')} author={author} date={date} />
              </div>
            )}
          </div>

          {/* ✅ overlay that sits ABOVE the image and uses the SAME container */}
          {isHome && (
            <div className={cx('overlay')}>
              <div className="container">
                <Heading className={cx('heading-home')} level="h1">
                  Cal Maritime Corporation
                </Heading>
              </div>
            </div>
          )}

          <FeaturedImage className={cx('featured-image')} image={image} priority />
        </div>
      )}
    </div>
  );
}
