import React, { useState, useRef } from 'react';

const NAVY = '#0D1B2A';
const GOLD = '#C9A84C';
const LIGHT_NAVY = '#1A2E45';
const MUTED = '#8A9BB0';

const questions = [
  { key: 'firstName', label: 'First Name', placeholder: 'e.g. Sarah' },
  { key: 'roleTitle', label: 'Role / Title', placeholder: 'e.g. VP of Sales, Account Executive, Business Owner' },
  { key: 'industry', label: 'Industry & What They Sell', placeholder: 'e.g. SaaS to mid-market HR teams' },
  { key: 'yearsInSales', label: 'Years in Sales / Business Development', placeholder: 'e.g. 8 years' },
  { key: 'currentChallenge', label: 'Biggest Current Sales Challenge', placeholder: "What's the #1 thing stopping more revenue right now?" },
  { key: 'leadSources', label: 'How They Currently Generate Leads', placeholder: 'e.g. cold outreach, referrals, events, inbound...' },
  { key: 'contentCreated', label: 'Content, IP, or Frameworks They\'ve Created', placeholder: 'Presentations, processes, videos, guides, case studies...' },
  { key: 'keyRelationships', label: 'Their Best Client / Partner Relationships', placeholder: 'Who are the best people in their network they could leverage?' },
  { key: 'techTools', label: 'Technology & Tools They Use', placeholder: 'CRM, LinkedIn, email tools, AI tools, automation...' },
  { key: 'biggestTimeWaste', label: 'Biggest Time Wasters Each Week', placeholder: 'e.g. manual follow-up, CRM admin, prospecting from scratch...' },
  { key: 'whatIsWorking', label: 'What\'s Working (Even a Little)', placeholder: 'Any wins, patterns, or activities that are showing results...' },
];

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: NAVY,
    fontFamily: "'Jost', sans-serif",
    color: '#fff',
  },
  header: {
    borderBottom: `1px solid ${LIGHT_NAVY}`,
    padding: '20px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#08111C',
  },
  headerLeft: { display: 'flex', flexDirection: 'column', gap: 2 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: '0.2em',
    color: GOLD,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 26,
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    lineHeight: 1.1,
  },
  headerRight: {
    fontSize: 12,
    color: MUTED,
    textAlign: 'right',
    lineHeight: 1.6,
  },
  main: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '40px 24px 80px',
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: '0.25em',
    color: GOLD,
    textTransform: 'uppercase',
    fontWeight: 600,
    marginBottom: 8,
  },
  intro: {
    borderLeft: `3px solid ${GOLD}`,
    paddingLeft: 20,
    marginBottom: 48,
  },
  introTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 32,
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 8px',
  },
  introSub: {
    fontSize: 15,
    color: MUTED,
    lineHeight: 1.6,
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
    marginBottom: 28,
  },
  fieldFull: { gridColumn: '1 / -1' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: {
    fontSize: 11,
    letterSpacing: '0.12em',
    color: GOLD,
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  input: {
    backgroundColor: LIGHT_NAVY,
    border: `1px solid #2A3F58`,
    borderRadius: 4,
    color: '#fff',
    fontFamily: "'Jost', sans-serif",
    fontSize: 14,
    padding: '10px 14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    backgroundColor: LIGHT_NAVY,
    border: `1px solid #2A3F58`,
    borderRadius: 4,
    color: '#fff',
    fontFamily: "'Jost', sans-serif",
    fontSize: 14,
    padding: '10px 14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
    boxSizing: 'border-box',
    resize: 'vertical',
    minHeight: 72,
    lineHeight: 1.5,
  },
  generateBtn: {
    backgroundColor: GOLD,
    color: NAVY,
    border: 'none',
    borderRadius: 4,
    padding: '14px 36px',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "'Jost', sans-serif",
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    display: 'block',
    width: '100%',
    marginTop: 8,
  },
  divider: {
    border: 'none',
    borderTop: `1px solid ${LIGHT_NAVY}`,
    margin: '48px 0',
  },
  reportCard: {
    backgroundColor: '#08111C',
    border: `1px solid ${LIGHT_NAVY}`,
    borderRadius: 8,
    padding: '36px 40px',
  },
  reportHeader: {
    borderBottom: `2px solid ${GOLD}`,
    paddingBottom: 20,
    marginBottom: 28,
  },
  reportName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 36,
    fontWeight: 700,
    color: '#fff',
    margin: '4px 0 0',
  },
  reportBody: {
    whiteSpace: 'pre-wrap',
    fontSize: 15,
    lineHeight: 1.85,
    color: '#D0DBE8',
    fontFamily: "'Jost', sans-serif",
  },
  reportFooter: {
    borderTop: `1px solid ${LIGHT_NAVY}`,
    marginTop: 28,
    paddingTop: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerSite: { fontSize: 12, color: GOLD, letterSpacing: '0.1em' },
  footerUpward: { fontSize: 12, color: MUTED, letterSpacing: '0.15em', textTransform: 'uppercase' },
  resetBtn: {
    background: 'transparent',
    border: `1px solid ${LIGHT_NAVY}`,
    color: MUTED,
    borderRadius: 4,
    padding: '8px 20px',
    fontSize: 12,
    fontFamily: "'Jost', sans-serif",
    cursor: 'pointer',
    letterSpacing: '0.08em',
    marginTop: 20,
  },
  loading: {
    textAlign: 'center',
    padding: '60px 0',
  },
  loadingDot: {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: GOLD,
    margin: '0 4px',
    animation: 'pulse 1.2s ease-in-out infinite',
  },
  loadingText: {
    color: MUTED,
    fontSize: 14,
    marginTop: 20,
    letterSpacing: '0.1em',
  },
  error: {
    backgroundColor: '#2A1010',
    border: '1px solid #8B2020',
    borderRadius: 4,
    padding: '16px 20px',
    color: '#FF8080',
    fontSize: 14,
    marginTop: 16,
  },
  printBtn: {
    background: 'transparent',
    border: `1px solid ${GOLD}`,
    color: GOLD,
    borderRadius: 4,
    padding: '8px 20px',
    fontSize: 12,
    fontFamily: "'Jost', sans-serif",
    cursor: 'pointer',
    letterSpacing: '0.08em',
    marginTop: 20,
    marginLeft: 10,
  },
  footer: {
    textAlign: 'center',
    color: MUTED,
    fontSize: 12,
    padding: '24px 0',
    borderTop: `1px solid ${LIGHT_NAVY}`,
    letterSpacing: '0.1em',
  },
};

export default function App() {
  const [form, setForm] = useState(() => Object.fromEntries(questions.map(q => [q.key, ''])));
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const reportRef = useRef(null);

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleGenerate = async () => {
    if (!form.firstName.trim()) {
      setError('Please enter the participant\'s first name before generating.');
      return;
    }
    setError('');
    setLoading(true);
    setReport('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intake: form }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReport(data.report);
      setTimeout(() => reportRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      setError('Something went wrong generating the report. Check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(Object.fromEntries(questions.map(q => [q.key, ''])));
    setReport('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => window.print();

  const multiline = ['currentChallenge', 'leadSources', 'contentCreated', 'keyRelationships', 'biggestTimeWaste', 'whatIsWorking'];
  const fullWidth = ['currentChallenge', 'leadSources', 'contentCreated', 'keyRelationships', 'biggestTimeWaste', 'whatIsWorking'];

  return (
    <div style={styles.app}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        input::placeholder, textarea::placeholder { color: #4A6080; }
        input:focus, textarea:focus { border-color: ${GOLD} !important; }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .dot2 { animation-delay: 0.2s; }
        .dot3 { animation-delay: 0.4s; }
        @media print {
          .no-print { display: none !important; }
          body { background: white; color: black; }
        }
        @media (max-width: 640px) {
          .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.eyebrow}>Bill Caskey · Hot Seat Tool</span>
          <h1 style={styles.headerTitle}>Asset Leverage Audit</h1>
        </div>
        <div style={styles.headerRight}>
          billcaskey.com<br />
          <span style={{ color: GOLD }}>UPWARD.</span>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.intro} className="no-print">
          <p style={styles.sectionLabel}>Live Webinar Tool</p>
          <h2 style={styles.introTitle}>Fill in as you interview your hot seat volunteer.</h2>
          <p style={styles.introSub}>
            Type their answers into each field during the live session. Hit Generate when you're ready —
            the AI will produce their personalized Asset Leverage Plan in real time.
          </p>
        </div>

        <div className="no-print">
          <div className="grid" style={styles.grid}>
            {questions.map((q) => {
              const isFull = fullWidth.includes(q.key);
              const isMulti = multiline.includes(q.key);
              return (
                <div key={q.key} style={isFull ? { ...styles.fieldGroup, ...styles.fieldFull } : styles.fieldGroup}>
                  <label style={styles.label}>{q.label}</label>
                  {isMulti ? (
                    <textarea
                      style={styles.textarea}
                      placeholder={q.placeholder}
                      value={form[q.key]}
                      onChange={e => handleChange(q.key, e.target.value)}
                    />
                  ) : (
                    <input
                      style={styles.input}
                      placeholder={q.placeholder}
                      value={form[q.key]}
                      onChange={e => handleChange(q.key, e.target.value)}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button
            style={{ ...styles.generateBtn, opacity: loading ? 0.6 : 1 }}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating Plan...' : '⚡ Generate Asset Leverage Plan'}
          </button>
        </div>

        {loading && (
          <div style={styles.loading}>
            <div>
              <span style={styles.loadingDot} />
              <span style={{ ...styles.loadingDot }} className="dot2" />
              <span style={{ ...styles.loadingDot }} className="dot3" />
            </div>
            <p style={styles.loadingText}>Building {form.firstName || 'their'}'s personalized plan...</p>
          </div>
        )}

        {report && (
          <div ref={reportRef}>
            <hr style={styles.divider} />
            <div style={styles.reportCard}>
              <div style={styles.reportHeader}>
                <p style={{ ...styles.sectionLabel, marginBottom: 4 }}>Asset Leverage Plan</p>
                <h2 style={styles.reportName}>{form.firstName} {form.roleTitle ? `· ${form.roleTitle}` : ''}</h2>
              </div>
              <div style={styles.reportBody}>{report}</div>
              <div style={styles.reportFooter}>
                <span style={styles.footerSite}>billcaskey.com</span>
                <span style={styles.footerUpward}>UPWARD.</span>
              </div>
            </div>
            <div className="no-print">
              <button style={styles.resetBtn} onClick={handleReset}>← New Hot Seat</button>
              <button style={styles.printBtn} onClick={handlePrint}>🖨 Print / Save PDF</button>
            </div>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        billcaskey.com &nbsp;|&nbsp; <span style={{ color: GOLD }}>UPWARD.</span>
      </footer>
    </div>
  );
}
