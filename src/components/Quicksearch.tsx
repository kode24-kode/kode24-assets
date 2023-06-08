import { useState } from 'react';

/**
 * Used in listings to add a quick search form
 * where applicants can make quick contact with an e-mail
 * @returns
 */
export default function Quicksearch() {
  const [emailAddress, setEmailAddress] = useState('');
  const [mailSent, setEmailSent] = useState(false);

  window.addEventListener('click', (e) => {
    console.log(e.target);
  });
  return (
    <section className="quick-job-container">
      <div className="quick-job-content">
        <h4>Vil du heller bli kontaktet? Nysgjerrig på jobben? 💖</h4>
        <p>
          Bare skriv inn e-postadressen din under, så hører du fra
          oss.{' '}
        </p>
        <form id="quick-job-form">
          <div className="form-row">
            <input
              id="email"
              type="text"
              placeholder="e-postadresse"
            />
          </div>
          <div className="form-row">
            <button type="submit" className="button">
              <span className="description">Send</span>{' '}
              <span className="rocket">
                <span>🚀</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
