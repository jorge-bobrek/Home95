import React from 'react';
import selfImg from '@/assets/Biography/self.jpg';
import './Bio.css';

export default function Bio() {
  const age = new Date().getFullYear() - 1998;

  return (
    <div className="bio-container">
      <img className="bio-photo win-border" src={selfImg} alt="Jorge Bobrek" />
      <h2 className="bio-name">Jorge Bobrek</h2>
      <h4 className="bio-subtitle">iOS Developer</h4>
      <h4 className="bio-subtitle">Colombia 📍</h4>

      <div className="bio-badges">
        <img className="bio-badge" alt="Swift" src="https://img.shields.io/badge/-Swift-orange" />
        <img className="bio-badge" alt="SwiftUI" src="https://img.shields.io/badge/-SwiftUI-3e8bc3" />
        <img className="bio-badge" alt="Git" src="https://img.shields.io/badge/-Git-critical" />
      </div>

      <div className="bio-section">
        <h3 className="bio-heading">About Me</h3>
        <p className="bio-text">
          I'm a {age} year old systems engineer with more than five years of experience in mobile
          application development, specialized in the creation of native solutions for both iOS and
          Android platforms. With experience specifically in the banking and retail sectors,
          delivering reliable and high-quality applications.
        </p>
      </div>

      <div className="bio-section">
        <h3 className="bio-heading">Work Experience</h3>
      </div>

      <section className="bio-job">
        <h4 className="bio-job-title">Kranio</h4>
        <p className="bio-job-meta">iOS Developer • Mar. 2025 – Present</p>
        <p className="bio-job-client">Toke</p>
        <ul className="bio-job-list">
          <li>Led the initial development of "PinkApp", proposing a clean architecture ready to scale with the project's growth.</li>
          <li>Guided the team in adopting best development practices and provided ongoing support to junior developers to enhance their skills.</li>
          <li>Supervised and validated the team's work, maintaining development quality and fostering a collaborative environment.</li>
        </ul>
      </section>

      <section className="bio-job">
        <h4 className="bio-job-title">Pragma</h4>
        <p className="bio-job-meta">iOS Developer • Mar. 2022 – Jun. 2024</p>
        <p className="bio-job-client">Éxito Group</p>
        <ul className="bio-job-list">
          <li>Provided ongoing support and maintenance for Éxito and Carulla mobile applications, ensuring optimal performance and a seamless user experience for thousands of daily active users, increasing the average app rating from 3.9 to 4.7.</li>
          <li>Implemented price checker functionality, which allows users to use apps to complement the shopping experience in physical stores. Users can scan products to check prices and keep track of the total amount of their purchases.</li>
          <li>Developed a specialized meat cutting and preparation module, which enriched the customer experience by offering customized product options.</li>
          <li>Created a ratings and reviews system in the product detail page, allowing users to rate products using a star rating system. They can also leave reviews which, along with the ratings, can be consulted by other users, improving the shopping experience.</li>
          <li>Modified the app's products architecture to include a color picker feature for beauty products, allowing the user to more easily buy specific items and providing the possibility of future scalability to add more variations in other product categories.</li>
          <li>Introduced event logging through Firebase Analytics, giving the client better insight into which parts of the app have the most user interaction and helping make decisions on how to drive users to other less used features, resulting in an 130% increase in sales through the app.</li>
        </ul>
      </section>

      <section className="bio-job">
        <h4 className="bio-job-title">World Pos Solutions</h4>
        <p className="bio-job-meta">Android Developer • Mar. 2022 – Jun. 2024</p>
        <p className="bio-job-client">Linkser</p>
        <ul className="bio-job-list">
          <li>Led the maintenance and continuous improvement of the banking application for NewPOS devices (6210, 7210, 8210, 9220), responsible for managing approximately 100,000 credit cards and 3 million debit cards across the country, processing more than 25 million per year.</li>
          <li>Implemented Diners card reading functionality, giving the end-user more payment options when using our devices, being the first electronic card and payment method processor of the Discover Group in Bolivia.</li>
          <li>Designed an innovative solution for payment with mobile wallets and QR, allowing the company to issue a proprietary card for use within Bolivia, contributing to a more efficient and modernized payment experience for end-users.</li>
        </ul>
        <p className="bio-job-client">Lesly Center</p>
        <ul className="bio-job-list">
          <li>Generation and printing of detailed reports to provide the end-user more detailed information about their bets, which improved operational efficiency and user satisfaction.</li>
        </ul>
      </section>

      <div className="bio-section bio-section-projects">
        <h3 className="bio-heading">Projects &amp; Achievements</h3>
      </div>

      <div className="bio-project">
        <div>
          <h3 className="bio-project-name">HelloHand</h3>
          <p className="bio-job-meta">2026</p>
          <p className="bio-text">
            An interactive video game for language learning through multilingual vocabulary matching
          </p>
          <p className="bio-text">
            Check out the live demo{' '}
            <a className="bio-link" href="//hellohand.bobrek.dev" target="_blank" rel="noopener noreferrer">
              here
            </a>
            !
          </p>
        </div>
      </div>

      <div className="bio-project">
        <h3 className="bio-project-name">Résumé</h3>
        <a className="bio-link bio-text" href="/files/jorge_bobrek_resume.pdf">
          Check out my résumé here.
        </a>
      </div>
    </div>
  );
}
