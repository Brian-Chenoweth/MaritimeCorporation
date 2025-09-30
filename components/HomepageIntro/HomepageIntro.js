import CountUp from 'react-countup';

import styles from './HomepageIntro.module.scss';

export default function HomepageIntro() {
  return (
    <div className={styles.homeIntroWrapper}>
    <section className={`bg-blue ${styles.homeIntro}`}>
      <div>
        <div className={styles.box}>

          <div className={styles.content}>
            <p>
              The strategic business partner to Cal Poly Solano Campus and Cal Poly Maritime Academy, the Cal Maritime Corporation provides the campus and the local community with innovative services through strategic business partnerships that continuously improve value and enhance the overall experience of our cadets.
            </p>
          </div>

        <div className={styles.numbers}>
          
          <div className={styles.numberItem}>
            <h2><CountUp end={95} duration={5} useEasing={false}/><span  className='blue'>+</span></h2>
            <p>Years Supporting Cadets</p>
          </div>

          <div className={styles.numberItem}>
            <h2><CountUp end={60}  duration={4.5} useEasing={false}/><span  className='blue'>+</span></h2>
            <p>Times circumnavigating the globe in Corporation-owned ships</p>
          </div>

          <div className={styles.numberItem}>
            <h2>$<CountUp end={50}  duration={4} useEasing={false}/> million<span  className='blue'>+</span></h2>
            <p>Given in support of the academy</p>
          </div>

        </div>

      </div>
      </div>
    </section>
    </div>
  );
}
