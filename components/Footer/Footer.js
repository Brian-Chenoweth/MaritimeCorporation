// Footer.js
import classNames from 'classnames/bind';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import appConfig from 'app.config.js';


import { NavigationMenu } from '../';

import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

// ⬇ Inline a fragment so we don't depend on Testimonials.fragments
const FOOTER_TESTIMONIALS_FRAGMENT = gql`
  fragment FooterTestimonialsFragment on Testimonial {
    databaseId
    title
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails { width height }
      }
    }
    testimonialFields {
      testimonialContent
      testimonialJob
      testimonialAuthor
    }
  }
`;

const FOOTER_TESTIMONIALS_QUERY = gql`
  ${FOOTER_TESTIMONIALS_FRAGMENT}
  query FooterTestimonials {
    testimonials {
      nodes {
        ...FooterTestimonialsFragment
      }
    }
  }
`;

export default function Footer({
  siteTitle,
  title,
  menuItems,
  navOneMenuItems,
  navTwoMenuItems,
  resourcesMenuItems,
  aboutMenuItems,
}) {
  const router = useRouter();
  const isHome = router.pathname === '/';

  // Only fetch when NOT on homepage
  const { data: tdata } = useQuery(FOOTER_TESTIMONIALS_QUERY, { skip: isHome });

  return (
    <>
      <footer className={cx('footer')}>
        <div className={cx('container', styles.footerWrap)}>
          <div className={cx('footer-nav-contact-info')}>


          <div className={cx('about')}>
            <h3>Quick Links</h3>
            <NavigationMenu className={cx('quick')} menuItems={aboutMenuItems} />
          </div>

          <div className={cx('resources')}>
            <h3>Cal Poly Maritime</h3>
            <NavigationMenu className={cx('quick')} menuItems={resourcesMenuItems} />
          </div>
            
            <div className={cx('footer-nav')}>
              <h3>Integreation</h3>
              <NavigationMenu className={cx('quick')} menuItems={menuItems} />
            </div>

            <div className={cx('contact-info')}>
              <Link href="/" legacyBehavior>
                <a className={cx('cppText')}>{title ?? 'Cal Maritime Corporation'}</a>
              </Link>
              <a href="https://maps.app.goo.gl/wfAGSv2u8VPyjxgR6" target='_blank' className={cx('phone')} rel="noreferrer">200 Maritime Academy Dr., Vallejo, CA 94590</a>
              <a href="tel:7076541000" className={cx('phone')}>707-654-1000</a>
            </div>
          </div>

          <div className={cx('logo-address')}>
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

            <p>1 Grand Avenue, San Luis Obispo, CA 93407</p>
            <a href="tel:8057561111" className={cx('phone')}>(805) 756-1111</a>

            {appConfig?.socialLinks && (
              <div className={cx('social-links')}>
                <ul aria-label="Social media">

                  {appConfig.socialLinks?.instagramUrl && (
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cx('social-icon-link')}
                        href={appConfig.socialLinks.instagramUrl}
                      >
                        <FaInstagram
                          title="Instagram"
                          className={cx('social-icon')}
                        />
                      </a>
                    </li>
                  )}

                  {appConfig.socialLinks?.twitterUrl && (
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cx('social-icon-link')}
                        href={appConfig.socialLinks.twitterUrl}
                      >
                        <FaTwitter title="Twitter" className={cx('social-icon')} />
                      </a>
                    </li>
                  )}

                  {appConfig.socialLinks?.facebookUrl && (
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cx('social-icon-link')}
                        href={appConfig.socialLinks.facebookUrl}
                      >
                        <FaFacebookF
                          title="Facebook"
                          className={cx('social-icon')}
                        />
                      </a>
                    </li>
                  )}

                </ul>
              </div>
              )}


          </div>



          <div className={cx('nav-one')}>
            <NavigationMenu className={cx('nav')} menuItems={navOneMenuItems} />
          </div>

          <div className={cx('nav-two')}>
            <NavigationMenu className={cx('nav')} menuItems={navTwoMenuItems} />
          </div>

          <div className={cx('copyright')}>
            &copy; {new Date().getFullYear()} {siteTitle ?? 'California Polytechnic State University'}
          </div>
        </div>
        {console.log(menuItems, navOneMenuItems, navTwoMenuItems)}
      </footer>
    </>
  );
}
