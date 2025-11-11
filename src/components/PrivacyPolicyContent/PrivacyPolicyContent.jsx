import React from "react";
import styles from "./PrivacyPolicyContent.module.css"; // optional for styling

const PrivacyPolicyContent = () => {
  return (
    <div>
      <main className={styles.privacyContainer}>
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date:</strong> 1st Aug 2025</p>
        <p><strong>Last Updated:</strong> 1st Aug 2025</p>

        <p>Knotral (“we”, “our”, “us”) is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services.</p>

        <section>
          <h2>1. Who We Are</h2>
          <p>Knotral is a global B2B education marketplace that connects education solution providers, certified resellers, and institutional buyers. Our platform is operated by Trakru Global Services Private Limited, headquartered at 588, Sector 14, Faridabad, Delhi NCR, Haryana, 121007.</p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>

          <h3>a. Personal Information</h3>
          <ul>
            <li>Full name, email address, phone number</li>
            <li>Role (e.g., School, Reseller, Provider), institution name</li>
            <li>Country, region, business address</li>
          </ul>

          <h3>b. Account and Business Data</h3>
          <ul>
            <li>Company credentials, verification documents (resellers/providers)</li>
            <li>Product listing content and multimedia uploads</li>
            <li>Communication logs and support inquiries</li>
          </ul>

          <h3>c. Website Usage Data</h3>
          <ul>
            <li>IP address, browser type, device ID</li>
            <li>Pages visited, time spent, clicks, referring URLs</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul>
            <li>Verify your identity and determine eligibility (e.g., resellers)</li>
            <li>Facilitate product listings, connections, and transactions</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Improve platform functionality and user experience</li>
            <li>Send transactional and marketing communications (you may opt out)</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. Legal Basis for Processing (for EU/EEA Users)</h2>
          <p>We process your data under the following lawful bases:</p>
          <ul>
            <li>Your consent (e.g., newsletter sign-up)</li>
            <li>Contractual necessity (e.g., using the platform services)</li>
            <li>Legal obligation</li>
            <li>Legitimate interests (e.g., fraud prevention, improving services)</li>
          </ul>
        </section>

        <section>
          <h2>5. How We Share Your Data</h2>
          <p>We may share data with:</p>
          <ul>
            <li>Authorized platform users (e.g., sharing lead contact data between schools and providers)</li>
            <li>Third-party service providers (e.g., email tools, cloud hosting, analytics)</li>
            <li>Regulatory authorities, if required by law</li>
            <li>Parent or affiliated companies, in case of business transfers</li>
          </ul>
          <p><strong>We do not sell your personal information.</strong></p>
        </section>

        <section>
          <h2>6. International Data Transfers</h2>
          <p>
            Your information may be transferred to and maintained on servers located outside your country.
            We take appropriate safeguards (e.g., standard contractual clauses) to protect international data transfers.
          </p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <p>Depending on your jurisdiction, you have the right to:</p>
          <ul>
            <li>Access, update, or delete your data</li>
            <li>Object to or restrict data processing</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with a data protection authority</li>
          </ul>
          <p>To exercise your rights, contact us at <a href="mailto:contact@knotral.com">contact@knotral.com</a>.</p>
        </section>

        <section>
          <h2>8. Data Retention</h2>
          <p>
            We retain your data as long as needed to provide services, comply with legal obligations, or resolve disputes. Unused account data may be deleted after [e.g., <strong>12 months</strong>] of inactivity.
          </p>
        </section>

        <section>
          <h2>9. Cookies & Tracking Technologies</h2>
          <p>
            We use cookies for functionality, analytics, and marketing. You may control cookies via your browser settings.
            For more, view our: [Cookie Policy].
          </p>
        </section>

        <section>
          <h2>10. Security Measures</h2>
          <p>We implement industry-standard technical and organizational safeguards, including:</p>
          <ul>
            <li>Encrypted data storage and transmission</li>
            <li>Role-based access controls</li>
            <li>Regular vulnerability assessments</li>
          </ul>
        </section>

        <section>
          <h2>11. Children’s Privacy</h2>
          <p>
            Our platform is intended for use by adults in professional education roles. We do not knowingly collect data from individuals under 16 years of age.
          </p>
        </section>

        <section>
          <h2>12. Third-Party Links</h2>
          <p>
            Our website may contain links to external sites. We are not responsible for their privacy practices or content. Please review their policies separately.
          </p>
        </section>

        <section>
          <h2>13. Policy Updates</h2>
          <p>
            We may update this Privacy Policy periodically. When we do, we will revise the “Last Updated” date. Material changes will be communicated via email or a site banner.
          </p>
        </section>

        <section>
          <h2>14. Contact Us</h2>
          <p>If you have questions or concerns regarding this policy, please contact:</p>
          <ul>
            <li>📧 <a href="mailto:contact@knotral.com">contact@knotral.com</a></li>
            <li>🌐 <a href="https://www.knotral.com" target="_blank" rel="noopener noreferrer">www.knotral.com</a></li>
            <li>📍 588, Sector 14, Faridabad, Delhi NCR, Haryana, 121007</li>
          </ul>
        </section>

      </main>
    </div>
  );
};

export default PrivacyPolicyContent;
