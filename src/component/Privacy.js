import React from "react";

const PrivacyPolicy = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h1 style={{ fontSize: "2em", fontWeight: "bold", marginBottom: "20px" }}>
        Privacy Policy – Sticky Notes (Chrome Extension)
      </h1>

      <p style={{ fontSize: "0.9em", color: "#666", marginBottom: "20px" }}>
        Effective Date: [2025/05/20]
      </p>

      <p style={{ marginBottom: "16px" }}>
        Your privacy is important to us. This Privacy Policy explains what data
        the Sticky Notes Chrome Extension collects, how it is used, and how we
        protect your information.
      </p>

      <h2 style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "30px" }}>
        1. Data Collection
      </h2>
      <p style={{ marginBottom: "16px" }}>
        Sticky Notes does <strong>not collect</strong>, <strong>track</strong>,
        or <strong>transmit</strong> any personal information. All data you
        enter (such as your notes or settings) is stored{" "}
        <strong>locally</strong> on your device.
      </p>

      <h2 style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "30px" }}>
        2. Data Storage
      </h2>
      <p style={{ marginBottom: "16px" }}>
        We use Chrome's built-in <code>storage</code> API to save your notes and
        preferences (such as light/dark mode). This data:
        <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
          <li>Remains on your device.</li>
          <li>Is never uploaded or sent to any external server.</li>
          <li>
            Can be cleared at any time by uninstalling the extension or clearing
            Chrome’s extension data.
          </li>
        </ul>
      </p>

      <h2 style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "30px" }}>
        3. Permissions Usage
      </h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li>
          <strong>Storage:</strong> To locally save your notes and theme
          settings.
        </li>
        <li>
          <strong>Alarms:</strong> To support automatic saving at intervals.
        </li>
        <li>
          <strong>Background:</strong> To ensure your notes persist across
          sessions and are autosaved.
        </li>
        <li>
          <strong>Host Permissions:</strong> Not used unless future features
          require it, and only with explicit user consent.
        </li>
        <li>
          <strong>Remote Code:</strong> The extension does not use or load any
          code from external sources.
        </li>
      </ul>

      <h2 style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "30px" }}>
        4. Import/Export Feature
      </h2>
      <p style={{ marginBottom: "16px" }}>
        The import and export functionality allows you to back up or transfer
        your notes. These files are handled entirely on your device and are
        never shared.
      </p>

      <h2 style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "30px" }}>
        5. Security
      </h2>
      <p style={{ marginBottom: "16px" }}>
        We do not transmit any data over the internet, which minimizes security
        risks. However, it is your responsibility to secure your device and
        browser environment.
      </p>

      <h2 style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "30px" }}>
        6. Contact
      </h2>
      <p style={{ marginBottom: "16px" }}>
        If you have any questions or concerns about this Privacy Policy or the
        extension, please contact us at:
        <br />
        📧 <a href="mailto:nishcyber420@gmail.com">nishcyber420@gmail.com</a>
      </p>

      <h2 style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "30px" }}>
        7. Changes to This Policy
      </h2>
      <p>
        We may update this policy from time to time. Any changes will be posted
        on this page with an updated effective date.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
