import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SCHOOLS, YEARS, DEPT_VALUES, API_URL } from '../../assets/data/formOptions';

const STEPS = [
  { id: 'identity', title: 'Identity', num: '01' },
  { id: 'motivation', title: 'Motivation', num: '02' },
  { id: 'departments', title: 'Department Selection', num: '03' },
  { id: 'privacy', title: 'Privacy & Confirm', num: '04' },
];

const STEP_DESCS = [
  'Provide your primary contact and academic profile details for team communication and verification.',
  'Tell us about your background, ambition, and what drives you to join the Cyber Innovators Club.',
  'Rank your top 3 department choices. Department ranking directly affects your placement and team assignment.',
  'Review and accept the CIC data privacy policy before submitting your application.',
];

const STEP_TIPS = [
  'Use your active university email and official phone number so lead mentors can reach you quickly.',
  'Be concise but authentic. Highlight previous projects, CTF experience, or technical topics you are passionate about.',
  'Selecting 3 distinct departments increases your chance of placement. Make sure each preference is unique.',
  'Your data is handled with full confidentiality in accordance with the CIC Club Statute.',
];

const PRIVACY_POLICY = `The CIC Club collects only the necessary personal information (name, academic details, contact information, department preferences, and participation records) for membership management and club activities. Your data is accessible only to authorized club officers, kept confidential and securely stored, and never sold or shared with external parties without consent, except for formal administrative requests. Data is retained only as long as necessary, in accordance with Article 27 of the Club Statute.`;

const emptyForm = {
  first_name: '', last_name: '', age: '', email: '', phone_number: '',
  school: '', school_other: '', year: '',
  why_this_club: '',
  dept1: '', dept2: '', dept3: '',
  privacy_agreed: false,
};

function Field({ label, required, optional, error, isValid, children }) {
  return (
    <div className={`cyber-field ${error ? 'is-error' : ''} ${isValid ? 'is-valid' : ''}`}>
      <div className="cyber-label-row">
        <label className="cyber-label">
          {label}
          {required && <span className="cyber-req">*</span>}
          {optional && <span className="cyber-opt">(optional)</span>}
        </label>
        {isValid && (
          <span className="cyber-valid-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </div>
      <div className="cyber-input-wrapper">
        {children}
      </div>
      {error && <span className="cyber-err-msg">{error}</span>}
    </div>
  );
}

export default function RegistrationForm({ registerRef }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState('');

  function set(id, value) {
    setForm((f) => ({ ...f, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 4800);
  }

  function validate(s) {
    const e = {};

    if (s === 0) {
      if (!form.first_name.trim()) e.first_name = 'First name is required.';
      if (!form.last_name.trim()) e.last_name = 'Last name is required.';
      const age = parseInt(form.age, 10);
      if (!age || age < 15 || age > 40) e.age = 'Enter a valid age (15–40).';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
      if (!form.phone_number.trim()) e.phone_number = 'Phone number is required.';
      if (!form.school) e.school = 'Please select your academic school.';
      if (form.school === 'Other' && !form.school_other.trim()) e.school_other = 'Please specify your school name.';
      if (!form.year) e.year = 'Please select your current year.';
    }

    if (s === 1) {
      if (form.why_this_club.trim().length < 30) e.why_this_club = 'Please write at least 30 characters explaining your motivation.';
    }

    if (s === 2) {
      const { dept1, dept2, dept3 } = form;
      if (!dept1) e.dept1 = '1st choice department is required.';
      if (!dept2) e.dept2 = '2nd choice department is required.';
      if (!dept3) e.dept3 = '3rd choice department is required.';
      if (dept1 && dept2 && dept3 && new Set([dept1, dept2, dept3]).size < 3) {
        e.depts = 'All three department preferences must be different.';
      }
    }

    if (s === 3) {
      if (!form.privacy_agreed) e.privacy_agreed = 'You must accept the privacy policy to continue.';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function warnDupes() {
    const d = [form.dept1, form.dept2, form.dept3].filter(Boolean);
    const hasDupe = new Set(d).size < d.length;
    setErrors((prev) => ({ ...prev, depts: hasDupe ? 'Duplicate department selected. Each choice must be unique.' : '' }));
  }

  function next() {
    if (!validate(step)) return;
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    submit();
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  async function submit() {
    setSubmitting(true);

    const schoolValue = form.school === 'Other' ? form.school_other.trim() : form.school;

    const body = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      age: parseInt(form.age, 10),
      email: form.email.trim(),
      phone_number: form.phone_number.trim(),
      school: schoolValue,
      school_other: form.school === 'Other' ? form.school_other.trim() : '',
      year: form.year,
      why_this_club: form.why_this_club.trim(),
      privacy_agreed: true,
      department_preferences: [
        { department: form.dept1, preference_order: 1 },
        { department: form.dept2, preference_order: 2 },
        { department: form.dept3, preference_order: 3 },
      ],
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(firstErr(data) || `Error ${res.status} — please verify form details.`);
        setSubmitting(false);
      }
    } catch {
      showToast('Network error — please check your connection and retry.');
      setSubmitting(false);
    }
  }

  function firstErr(d) {
    if (!d || typeof d !== 'object') return null;
    const v = Object.values(d)[0];
    if (!v) return null;
    return Array.isArray(v) ? v[0] : typeof v === 'string' ? v : JSON.stringify(v);
  }

  const progressPercent = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <section className="reg-container" id="register" ref={registerRef}>
      <div className="reg-background-glow" aria-hidden="true" />
      <div className="reg-grid-overlay" aria-hidden="true" />

      <div className="reg-wrapper">
        <header className="reg-header">
          <div className="reg-badge">
            <span className="reg-badge-dot" />
            <span>CIC ENROLLMENT PORTAL 2026/2027</span>
          </div>
          <h1 className="reg-main-title">Candidate Onboarding</h1>
          <p className="reg-main-subtitle">
            Enrollment process for prospective Cyber Innovators Club candidates.
          </p>
        </header>

        {submitted ? (
          <motion.div
            className="reg-success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="reg-success-icon-wrap">
              <div className="reg-success-pulse" />
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 9" />
              </svg>
            </div>

            <h2 className="reg-success-title">Enrollment Application Received</h2>
            <p className="reg-success-desc">
              Your candidate profile has been securely submitted to the CIC Admissions Board.
              We are reviewing your application and department preferences.
            </p>

            <div className="reg-timeline-box">
              <div className="reg-timeline-title">Next Steps &amp; Timeline</div>
              <div className="reg-timeline-grid">
                <div className="reg-timeline-item">
                  <span className="reg-timeline-num">01</span>
                  <span>Application Review (~48h)</span>
                </div>
                <div className="reg-timeline-item">
                  <span className="reg-timeline-num">02</span>
                  <span>Onboarding &amp; Mentorship Invite</span>
                </div>
                <div className="reg-timeline-item">
                  <span className="reg-timeline-num">03</span>
                  <span>Department Orientation</span>
                </div>
              </div>
            </div>

            <button className="reg-home-btn" onClick={() => navigate('/')}>
              <span>Return to Homepage</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        ) : (
          <div className="reg-split-layout">
            {/* Left Sidebar Info & Progress Panel */}
            <aside className="reg-sidebar">
              <div className="reg-sidebar-inner">
                {/* Progress Status Header */}
                <div className="reg-progress-card">
                  <div className="reg-progress-header">
                    <span className="reg-progress-title">ENROLLMENT PROGRESS</span>
                    <span className="reg-progress-pct">{progressPercent}%</span>
                  </div>

                  <div className="reg-progress-track">
                    <motion.div
                      className="reg-progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  <div className="reg-step-indicators">
                    {STEPS.map((s, i) => (
                      <div
                        key={s.id}
                        className={`reg-step-item ${i === step ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`}
                      >
                        <span className="reg-step-badge">
                          {i < step ? (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            s.num
                          )}
                        </span>
                        <span className="reg-step-name">{s.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Helpful Tip for Current Step */}
                <div className="reg-tip-card">
                  <div className="reg-tip-header">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span>STEP {STEPS[step].num} ADVISORY</span>
                  </div>
                  <p className="reg-tip-text">{STEP_TIPS[step]}</p>
                </div>
              </div>
            </aside>

            {/* Right Main Form Container */}
            <main className="reg-main-form">
              <div className="reg-form-card">
                {/* Step Banner Introduction */}
                <div className="reg-step-intro">
                  <span className="reg-step-tag">STEP {STEPS[step].num} // {STEPS[step].title}</span>
                  <h2 className="reg-step-heading">{STEPS[step].title} Details</h2>
                  <p className="reg-step-desc">{STEP_DESCS[step]}</p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="reg-step-body"
                  >
                    {/* STEP 0: IDENTITY */}
                    {step === 0 && (
                      <div className="reg-fields-grid">
                        <div className="reg-row-2">
                          <Field
                            label="First Name"
                            required
                            error={errors.first_name}
                            isValid={Boolean(form.first_name.trim())}
                          >
                            <input
                              type="text"
                              value={form.first_name}
                              onChange={(e) => set('first_name', e.target.value)}
                              placeholder="e.g. Moncef"
                              autoComplete="given-name"
                            />
                          </Field>

                          <Field
                            label="Last Name"
                            required
                            error={errors.last_name}
                            isValid={Boolean(form.last_name.trim())}
                          >
                            <input
                              type="text"
                              value={form.last_name}
                              onChange={(e) => set('last_name', e.target.value)}
                              placeholder="e.g. Yak"
                              autoComplete="family-name"
                            />
                          </Field>
                        </div>

                        <div className="reg-row-2">
                          <Field
                            label="Age"
                            required
                            error={errors.age}
                            isValid={Boolean(parseInt(form.age, 10) >= 15 && parseInt(form.age, 10) <= 40)}
                          >
                            <input
                              type="number"
                              value={form.age}
                              onChange={(e) => set('age', e.target.value)}
                              placeholder="21"
                              min="15"
                              max="40"
                            />
                          </Field>

                          <Field
                            label="Email Address"
                            required
                            error={errors.email}
                            isValid={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)}
                          >
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => set('email', e.target.value)}
                              placeholder="moncef@nscs.dz"
                              autoComplete="email"
                            />
                          </Field>
                        </div>

                        <div className="reg-row-2">
                          <Field
                            label="Phone Number"
                            required
                            error={errors.phone_number}
                            isValid={Boolean(form.phone_number.trim().length >= 8)}
                          >
                            <input
                              type="tel"
                              value={form.phone_number}
                              onChange={(e) => set('phone_number', e.target.value)}
                              placeholder="0550123456"
                              autoComplete="tel"
                            />
                          </Field>

                          <Field
                            label="Academic Year"
                            required
                            error={errors.year}
                            isValid={Boolean(form.year)}
                          >
                            <select
                              value={form.year}
                              onChange={(e) => set('year', e.target.value)}
                            >
                              <option value="">— Select Academic Year —</option>
                              {YEARS.map((y) => (
                                <option key={y.value} value={y.value}>
                                  {y.label}
                                </option>
                              ))}
                            </select>
                          </Field>
                        </div>

                        <div className="reg-row-1">
                          <Field
                            label="School / University"
                            required
                            error={errors.school}
                            isValid={Boolean(form.school) && !(form.school === 'Other' && !form.school_other.trim())}
                          >
                            <select
                              value={form.school}
                              onChange={(e) => set('school', e.target.value)}
                            >
                              <option value="">— Select School / Institution —</option>
                              {SCHOOLS.map((s) => (
                                <option key={s.value} value={s.value}>
                                  {s.label}
                                </option>
                              ))}
                            </select>
                          </Field>
                        </div>

                        {form.school === 'Other' && (
                          <div className="reg-row-1">
                            <Field
                              label="School Name"
                              required
                              error={errors.school_other}
                              isValid={Boolean(form.school_other.trim())}
                            >
                              <input
                                type="text"
                                value={form.school_other}
                                onChange={(e) => set('school_other', e.target.value)}
                                placeholder="Enter your school or university name"
                                autoComplete="organization"
                              />
                            </Field>
                          </div>
                        )}
                      </div>
                    )}

                    {/* STEP 1: MOTIVATION */}
                    {step === 1 && (
                      <div className="reg-fields-grid">
                        <div className="reg-row-1">
                          <Field
                            label="Why do you want to join CIC?"
                            required
                            error={errors.why_this_club}
                            isValid={form.why_this_club.trim().length >= 30}
                          >
                            <textarea
                              rows="5"
                              value={form.why_this_club}
                              onChange={(e) => set('why_this_club', e.target.value)}
                              placeholder="Tell us what drives you to apply — what do you want to learn, build, or contribute inside the Cyber Innovators Club?"
                            />
                          </Field>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: DEPARTMENT SELECTION */}
                    {step === 2 && (
                      <div className="reg-departments-wrap">
                        {errors.depts && (
                          <div className="reg-dupe-alert">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="12" />
                              <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span>{errors.depts}</span>
                          </div>
                        )}

                        {[1, 2, 3].map((num) => {
                          const deptVal = form[`dept${num}`];
                          const otherDepts = [form.dept1, form.dept2, form.dept3].filter((_, idx) => idx !== num - 1);

                          return (
                            <div key={num} className={`reg-pref-card card-p${num} ${deptVal ? 'selected' : ''}`}>
                              <div className="reg-card-header">
                                <div className="reg-card-badge">
                                  <span className="reg-badge-p">PREFERENCE 0{num}</span>
                                  <span className="reg-badge-label">
                                    {num === 1 ? '1ST CHOICE' : num === 2 ? '2ND CHOICE' : '3RD CHOICE'}
                                  </span>
                                </div>
                                {deptVal && (
                                  <span className="reg-card-selected-tag">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    SELECTED
                                  </span>
                                )}
                              </div>

                              <div className="reg-card-body">
                                <Field
                                  label="Department"
                                  required
                                  error={errors[`dept${num}`]}
                                  isValid={Boolean(deptVal)}
                                >
                                  <select
                                    value={deptVal}
                                    onChange={(e) => {
                                      set(`dept${num}`, e.target.value);
                                      setTimeout(warnDupes, 0);
                                    }}
                                  >
                                    <option value="">— Select {num === 1 ? 'First' : num === 2 ? 'Second' : 'Third'} Department —</option>
                                    {DEPT_VALUES.map((d) => {
                                      const isAlreadyPicked = otherDepts.includes(d);
                                      return (
                                        <option key={d} value={d} disabled={isAlreadyPicked}>
                                          {d} {isAlreadyPicked ? '(Selected in another choice)' : ''}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </Field>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* STEP 3: PRIVACY POLICY & CONFIRMATION */}
                    {step === 3 && (
                      <div className="reg-fields-grid">
                        <div className="reg-privacy-box">
                          <div className="reg-privacy-header">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            <span>CIC Data Privacy Policy</span>
                          </div>
                          <p className="reg-privacy-text">{PRIVACY_POLICY}</p>
                        </div>

                        <div className={`reg-privacy-check-wrap ${errors.privacy_agreed ? 'is-error' : ''}`}>
                          <label className="reg-privacy-label">
                            <input
                              type="checkbox"
                              className="reg-privacy-checkbox"
                              checked={form.privacy_agreed}
                              onChange={(e) => set('privacy_agreed', e.target.checked)}
                            />
                            <span className="reg-privacy-check-text">
                              I have read and agree to the CIC Privacy Policy and consent to the collection and use of my personal data as described above.
                            </span>
                          </label>
                          {errors.privacy_agreed && (
                            <span className="cyber-err-msg">{errors.privacy_agreed}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Form Footer Action Buttons */}
                <div className="reg-form-actions">
                  <button
                    type="button"
                    className={`reg-btn-back ${step === 0 ? 'is-hidden' : ''}`}
                    onClick={back}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    className="reg-btn-next"
                    onClick={next}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="reg-btn-spinner-wrap">
                        <span className="reg-spinner" />
                        <span>Submitting Application…</span>
                      </span>
                    ) : step === STEPS.length - 1 ? (
                      <>
                        <span>Submit Application</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </main>
          </div>
        )}
      </div>

      <div className={`cyber-toast ${toast ? 'is-show' : ''}`}>{toast}</div>
    </section>
  );
}
