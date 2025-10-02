import * as MENUS from 'constants/menus';

import { useQuery, gql } from '@apollo/client';
import { FaArrowRight } from 'react-icons/fa';
import styles from 'styles/pages/_Home.module.scss';
import {
  EntryHeader,
  Main,
  Button,
  Heading,
  CTA,
  NavigationMenu,
  HomepageCampusLife,
  HomepageNonProfit,
  HomepageStudentNeeds,
  HomepageIntro,
  SEO,
  Header,
  Footer,
  Posts,
  Testimonials,
} from 'components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';

const postsPerPage = 3;

export default function Component() {
  const { data, loading } = useQuery(Component.query, {
    variables: Component.variables(),
  });
  if (loading) {
    return null;
  }

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];
    const quickLinks   = data?.quickFooterMenuItems?.nodes ?? [];
  const aboutLinks   = data?.aboutFooterMenuItems?.nodes ?? [];
  const navOne       = data?.footerSecondaryMenuItems?.nodes ?? [];
  const navTwo       = data?.footerTertiaryMenuItems?.nodes ?? [];
  const resources    = data?.resourcesFooterMenuItems?.nodes ?? [];

  const mainBanner = {
    sourceUrl: '/static/banner.jpeg',
    mediaDetails: { width: 1200, height: 600 },
    altText: 'Portfolio Banner',
  };
  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />

      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />

      <Main className={styles.home}>
        <EntryHeader image={mainBanner} />
        <div className="container">

          <HomepageIntro />

         <HomepageCampusLife />

         <HomepageStudentNeeds/>

         
          
          {/* <section className="hero text-center">
            <Heading className={styles.heading} level="h1">
              Welcome to your Blueprint
            </Heading>
            <div className={styles.actions}>
              <Button styleType="secondary" href="/contact-us">
                GET STARTED
              </Button>
              <Button styleType="primary" href="/about">
                LEARN MORE
              </Button>
            </div>
          </section> */}

          <HomepageNonProfit />

{/* 
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/posts">
                  Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Learn about Core Web Vitals and how Headless Platform can help
                you reach your most demanding speed and user experience
                requirements.
              </span>
            </CTA>
          </section> */}


        </div>
      </Main>
      
      <Footer
        title={siteTitle}
        menuItems={quickLinks}                // left column: Quick Footer
        navOneMenuItems={navOne}              // middle: Footer Secondary
        navTwoMenuItems={navTwo}              // right: Footer Tertiary
        resourcesMenuItems={resources} 
        aboutMenuItems={aboutLinks}        // new Resources block
      />
    </>
  );
}

Component.variables = () => ({
  headerLocation: MENUS.PRIMARY_LOCATION,
  // was FOOTER_LOCATION — stop using it on the homepage
   footerLocation: MENUS.FOOTER_LOCATION,
  quickFooterLocation: MENUS.QUICK_FOOTER_LOCATION,
  aboutFooterLocation: MENUS.ABOUT_FOOTER_LOCATION,
  footerSecondaryLocation: MENUS.FOOTER_SECONDARY_LOCATION,
  footerTertiaryLocation: MENUS.FOOTER_TERTIARY_LOCATION,
  resourcesFooterLocation: MENUS.RESOURCES_FOOTER_LOCATION,
});

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${Testimonials.fragments.entry}
  query GetPageData(
  $headerLocation: MenuLocationEnum
  $quickFooterLocation: MenuLocationEnum
  $aboutFooterLocation: MenuLocationEnum
  $footerSecondaryLocation: MenuLocationEnum
  $footerTertiaryLocation: MenuLocationEnum
  $resourcesFooterLocation: MenuLocationEnum
  ) {
    testimonials {
      nodes {
        ...TestimonialsFragment
      }
    }
    generalSettings { ...BlogInfoFragment }
  headerMenuItems: menuItems(where: { location: $headerLocation }, first: 100) {
    nodes { ...NavigationMenuItemFragment }
  }

  quickFooterMenuItems: menuItems(where: { location: $quickFooterLocation }, first: 100) {
    nodes { ...NavigationMenuItemFragment }
    
  }
  aboutFooterMenuItems: menuItems(where: { location: $aboutFooterLocation }, first: 100) {
    nodes { ...NavigationMenuItemFragment }
    
  }
  footerSecondaryMenuItems: menuItems(where: { location: $footerSecondaryLocation }, first: 100) {
    nodes { ...NavigationMenuItemFragment }
  }
  footerTertiaryMenuItems: menuItems(where: { location: $footerTertiaryLocation }, first: 100) {
    nodes { ...NavigationMenuItemFragment }
  }
  resourcesFooterMenuItems: menuItems(where: { location: $resourcesFooterLocation }, first: 100) {
    nodes { ...NavigationMenuItemFragment }
  }
  }
`;

