import Image from 'next/image';
import Link from 'next/link';

import styles from './HomepageCampusLife.module.scss';

export default function HomepageCampusLife() {
  return (
    <div className={styles.cta}>
          <div className="wp-block-media-text has-media-on-the-right is-stacked-on-mobile white-image-right">
            <div className="wp-block-media-text__content">
              <h2 className="wp-block-heading">  <span className='gold'>Improving</span> Campus Life</h2>
              <p>Our work directly impacts the lives and campus experience of all students, cadets, faculty and staff member. Whether it’s through our support of research projects, student enterprises, delicious dining options, affordable textbooks or spirited memorabilia our work helps to enhance the academy and drive the university forward.</p>
              <p>
                <Link legacyBehavior href="/commercial-services/">
                  <a title="Commercial Services">
                    Commercial Services
                  </a>
                </Link>
              </p>
            </div>
            <figure className="wp-block-media-text__media">
              <Image
                src="/home/students-eating-outdoors-campus-mural-patio-area.jpg"
                width={980}
                height={630}
                alt="Students sitting under umbrellas at outdoor tables near a colorful mural on a sunny campus patio."
                layout="responsive"
              />
            </figure>
          </div>
    </div>
  );
}