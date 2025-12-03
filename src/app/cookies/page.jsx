export default function CookiesPage() {
  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4">Cookies Policy</h1>
      <p className="text-muted">Last Updated: January 2025</p>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">1. What Are Cookies?</h3>
        <p>
          Cookies are small text files stored on your device by your browser.
          They help websites remember your actions, preferences, and improve the
          performance of the platform. Without cookies, certain features would
          not function correctly.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">2. Why We Use Cookies</h3>
        <p>We use cookies to:</p>
        <ul>
          <li>Improve page load speed and performance</li>
          <li>Remember login sessions</li>
          <li>Store your preferred subjects or settings</li>
          <li>Enable improved navigation</li>
          <li>Track platform errors</li>
          <li>Analyze how users interact with different content</li>
        </ul>
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">3. Types of Cookies We Use</h3>

        <h5 className="fw-bold mt-3">3.1 Essential Cookies</h5>
        <p>
          These cookies are required for core platform functions such as login,
          document access, and navigation.
        </p>

        <h5 className="fw-bold mt-4">3.2 Performance Cookies</h5>
        <p>
          These collect data about how users interact with BibraFX to help us
          improve reliability and speed.
        </p>

        <h5 className="fw-bold mt-4">3.3 Analytics Cookies</h5>
        <p>
          Used to understand what content is most useful or popular. We may use
          tools such as Firebase Analytics or Google Analytics.
        </p>

        <h5 className="fw-bold mt-4">3.4 Preference Cookies</h5>
        <p>
          These save your preferences, such as language, theme, and subject
          choices.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">4. Managing Cookies</h3>
        <p>
          Most browsers allow you to control cookies through their settings.
          However, disabling essential cookies may cause parts of BibraFX to
          stop working.
        </p>
        <p>
          Instructions differ for each browser (Chrome, Edge, Firefox, Safari).
        </p>
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">5. Third-Party Cookies</h3>
        <p>
          Some services we use may place their own cookies, including:
        </p>
        <ul>
          <li>Firebase Authentication</li>
          <li>Firebase Analytics</li>
          <li>Cloudflare CDN</li>
          <li>Embedded PDF viewer components</li>
        </ul>
        <p>
          These providers have their own policies regarding data usage and
          cookie behavior.
        </p>
      </section>

      <section>
        <h3 className="fw-semibold mb-3">6. Updates to This Policy</h3>
        <p>
          This Cookies Policy may be updated to match new features or legal
          requirements.
        </p>
      </section>
    </div>
  );
}
