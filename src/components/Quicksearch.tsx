import { Quicksearch } from '../types';
import { useState } from 'react';

export default function QuicksearchComponent({
  quicksearchData,
}: {
  quicksearchData: Quicksearch;
}) {
  const [emailAddress, setEmailAddress] = useState('');
  const [mailStatus, setEmailStatus] = useState('not-sent');

  async function handleSubmit() {
    setEmailStatus('sending');
    const response = await fetch(
      'https://functions.kode24.no/api/sendmail',
      {
        method: 'POST',
        body: JSON.stringify({
          ...quicksearchData,
          applicant: emailAddress,
        } as Quicksearch),
      }
    );
    const data = await response.json();
    setEmailStatus('sent');
  }
  return (
    <section className="quick-job-container">
      <div className="quick-job-content">
        <h4>Vil du heller bli kontaktet? Nysgjerrig på jobben? 💖</h4>
        <p>
          Bare skriv inn e-postadressen din under, så hører du fra
          oss.
        </p>
        <form
          id="quick-job-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="form-row">
            <input
              id="email"
              type="text"
              placeholder="e-postadresse"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div className="form-row">
            {mailStatus === 'not-sent' && (
              <button type="submit" className="button">
                <span className="description">Send</span>
                <span className="rocket">
                  <span>🚀</span>
                </span>
              </button>
            )}
            {mailStatus === 'sending' && (
              <a href="#" className="button action">
                <span className="description">Sender...</span>
              </a>
            )}
            {mailStatus === 'sent' && (
              <p className="mail-sent">
                Takk! Vi kontakter deg på e-post.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
