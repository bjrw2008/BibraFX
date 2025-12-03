export default function PrivacyPage() {
  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4">Privacy Policy</h1>
      <p className="text-muted">Last Updated: January 2025</p>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">1. Introduction</h3>
        <p>
          This Privacy Policy explains how <strong>BibraFX</strong> collects,
          uses, protects, and stores your personal information. We take privacy
          seriously and are committed to ensuring transparency and security at
          every stage of your experience on our platform.
        </p>
        <p>
          By accessing BibraFX, you agree to the terms outlined in this policy.
          If you do not agree, please discontinue use of the platform
          immediately.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">2. Information We Collect</h3>

        <h5 className="fw-bold mt-3">2.1 Personal Information</h5>
        <p>
          These are details you provide during signup, communication with
          support, or interacting with features:
        </p>
        <ul>
          <li>Your name and email address</li>
          <li>Account password (securely encrypted)</li>
          <li>Uploaded document data</li>
          <li>Support messages and feedback</li>
        </ul>

        <h5 className="fw-bold mt-4">2.2 Automatically Collected Information</h5>
        <p>
          We automatically gather certain information to ensure platform
          functionality, optimize performance, and diagnose issues:
        </p>
        <ul>
          <li>Device type, browser, and operating system</li>
          <li>IP address and general location</li>
          <li>Pages you visit and how long you stay</li>
          <li>Search queries and interactions</li>
          <li>Error logs, crash reports, and analytics data</li>
        </ul>

        <h5 className="fw-bold mt-4">2.3 Cookies & Tracking</h5>
        <p>
          Cookies help us remember your preferences, maintain login sessions,
          and enhance the speed and performance of the website. More information
          is available in our Cookies Policy.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">3. How We Use Your Data</h3>
        <p>We use your information to:</p>
        <ul>
          <li>Provide access to study and trading materials</li>
          <li>Improve platform performance and reliability</li>
          <li>Customize your learning experience</li>
          <li>Secure your account and prevent unauthorized activities</li>
          <li>Respond to inquiries and provide support</li>
          <li>Analyze user behavior to improve features</li>
        </ul>
        <p>
          <strong>We never sell your data</strong> to any third-party
          organization.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">4. How We Protect Your Data</h3>
        <p>
          We use strong industry-standard security systems including Firebase
          Authentication, Firestore encryption, and Cloudflare R2 secure
          storage. These technologies protect against unauthorized access,
          breaches, and data misuse.
        </p>
        <p>
          While we take strong measures, no system is 100% secure. We continually
          improve our infrastructure to reduce risk.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">5. Data Sharing</h3>
        <p>
          We share data <strong>only when necessary</strong> and only with:
        </p>
        <ul>
          <li>Firebase (authentication, database)</li>
          <li>Cloudflare (content delivery, security)</li>
          <li>Analytics and error monitoring tools</li>
          <li>Law enforcement (only when legally required)</li>
        </ul>
        <p>
          These partners only receive the minimum data necessary to provide
          their respective services.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">6. Your Rights</h3>
        <p>You may request the following at any time:</p>
        <ul>
          <li>Access and review your personal data</li>
          <li>Delete your data and close your account</li>
          <li>Update or correct inaccurate information</li>
          <li>Download your data</li>
          <li>Opt out of cookies or analytics</li>
        </ul>
        <p>Email all requests to: <strong>bibrafx@gmail.com</strong></p>
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">7. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy to reflect improvements or legal
          changes. Updates will always appear here with an updated date.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">8. Contact Us</h3>
        <p>
          If you have questions or concerns about this Privacy Policy, contact
          us anytime at <strong>bibrafx@gmail.com</strong>.
        </p>
      </section>
    </div>
  );
}
