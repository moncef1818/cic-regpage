import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SCHOOLS, YEARS, DEPT_VALUES, API_URL } from '../../assets/data/formOptions';

const STEPS = [
  { id: 'identity', title: 'Identity', num: '01' },
  { id: 'motivation', title: 'Motivation', num: '02' },
  { id: 'departments', title: 'Department Selection', num: '03' },
];

const STEP_DESCS = [
  'Provide your primary contact and academic profile details for team communication and verification.',
  'Tell us about your background, ambition, and what drives you to join the Cyber Innovators Club.',
  'Rank your top 3 department choices. Department ranking directly affects your placement and team assignment.',
];

const STEP_TIPS = [
  'Use your active university email and official phone number so lead mentors can reach you quickly.',
  'Be concise but authentic. Highlight previous projects, CTF experience, or technical topics you are passionate about.',
  'Selecting 3 distinct departments increases your chance of placement. Make sure each preference is unique.',
];

const emptyForm = {
  first_name: '', last_name: '', age: '', email: '', phone_number: '',
  school: '', year: '',
  why_this_club: '', discord_username: '', telegram_username: '', links: '',
  dept1: '', why_dept1: '', dept2: '', why_dept2: '', dept3: '', why_dept3: '',
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
      if (!form.year) e.year = 'Please select your current year.';
    }

    if (s === 1) {
      if (form.why_this_club.trim().length < 30) e.why_this_club = 'Please write at least 30 characters explaining your motivation.';
      if (!form.discord_username.trim()) e.discord_username = 'Discord handle is required for club communications.';
    }

    if (s === 2) {
      const { dept1, dept2, dept3 } = form;
      if (!dept1) e.dept1 = '1st choice department is required.';
      if (!dept2) e.dept2 = '2nd choice department is required.';
      if (!dept3) e.dept3 = '3rd choice department is required.';
      if (dept1 && dept2 && dept3 && new Set([dept1, dept2, dept3]).size < 3) {
        e.depts = 'All three department preferences must be different.';
      }
      if (form.why_dept1.trim().length < 20) e.why_dept1 = 'Write at least 20 characters for your 1st choice.';
      if (form.why_dept2.trim().length < 20) e.why_dept2 = 'Write at least 20 characters for your 2nd choice.';
      if (form.why_dept3.trim().length < 20) e.why_dept3 = 'Write at least 20 characters for your 3rd choice.';
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

    const body = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      age: parseInt(form.age, 10),
      email: form.email.trim(),
      phone_number: form.phone_number.trim(),
      school: form.school,
      year: form.year,
      why_this_club: form.why_this_club.trim(),
      discord_username: form.discord_username.trim(),
      department_preferences: [
        { department: form.dept1, preference_order: 1, why_this_department: form.why_dept1.trim() },
        { department: form.dept2, preference_order: 2, why_this_department: form.why_dept2.trim() },
        { department: form.dept3, preference_order: 3, why_this_department: form.why_dept3.trim() },
      ],
    };
    if (form.telegram_username.trim()) body.telegram_username = form.telegram_username.trim();
    if (form.links.trim()) body.links = form.links.trim();

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
            Secure enrollment process for prospective Cyber Innovators Club candidates.
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
              <div className="reg-timeline-title">Next Steps & Timeline</div>
              <div className="reg-timeline-grid">
                <div className="reg-timeline-item">
                  <span className="reg-timeline-num">01</span>
                  <span>Application Review (~48h)</span>
                </div>
                <div className="reg-timeline-item">
                  <span className="reg-timeline-num">02</span>
                  <span>Discord Mentorship Invite</span>
                </div>
                <div className="reg-timeline-item">
                  <span className="reg-timeline-num">03</span>
                  <span>Department Orientation</span>
                </div>
              </div>
            </div>

            <div className="reg-community-links">
              <span className="reg-community-label">Join Official Channels</span>
              <div className="reg-community-btns">
                <a href="https://discord.com/invite/aYSaCa9uqk" target="_blank" rel="noreferrer" className="reg-social-btn discord">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" />
                  </svg>
                  <span>Discord Server</span>
                </a>
                <a href="https://t.me/CIC_Enscs" target="_blank" rel="noreferrer" className="reg-social-btn telegram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18.716-.958 4.228-1.464 6.446-.214.938-.56 1.252-.894 1.283-.726.067-1.277-.478-1.98-.939-1.1-.722-1.722-1.171-2.788-1.874-1.233-.813-.434-1.26.269-1.988.184-.19 3.385-3.103 3.447-3.367.008-.033.015-.157-.059-.223s-.185-.044-.265-.026c-.113.026-1.916 1.218-5.41 3.576-.512.351-.976.523-1.392.514-.459-.01-1.341-.259-1.997-.473-.804-.262-1.444-.401-1.388-.846.029-.232.348-.47.957-.714 3.754-1.635 6.259-2.714 7.514-3.237 3.587-1.493 4.333-1.753 4.819-1.761.107-.002.346.025.501.15.131.106.167.248.178.347.012.099.027.324.016.502z" />
                  </svg>
                  <span>Telegram Channel</span>
                </a>
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
                            isValid={Boolean(form.school)}
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

                        <div className="reg-row-2">
                          <Field
                            label="Discord Username"
                            required
                            error={errors.discord_username}
                            isValid={Boolean(form.discord_username.trim())}
                          >
                            <input
                              type="text"
                              value={form.discord_username}
                              onChange={(e) => set('discord_username', e.target.value)}
                              placeholder="username#0000 or handle"
                            />
                          </Field>

                          <Field
                            label="Telegram Handle"
                            optional
                            error={errors.telegram_username}
                            isValid={Boolean(form.telegram_username.trim())}
                          >
                            <input
                              type="text"
                              value={form.telegram_username}
                              onChange={(e) => set('telegram_username', e.target.value)}
                              placeholder="@handle"
                            />
                          </Field>
                        </div>

                        <div className="reg-row-1">
                          <Field
                            label="Portfolio / Links"
                            optional
                            error={errors.links}
                            isValid={Boolean(form.links.trim())}
                          >
                            <input
                              type="text"
                              value={form.links}
                              onChange={(e) => set('links', e.target.value)}
                              placeholder="GitHub, LinkedIn, CTFtime, personal website…"
                            />
                          </Field>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: DEPARTMENT SELECTION (PREMIUM RANKING CARDS) */}
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
                          const whyVal = form[`why_dept${num}`];
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

                                <Field
                                  label={`Why ${num === 1 ? '1st' : num === 2 ? '2nd' : '3rd'} Choice Department?`}
                                  required
                                  error={errors[`why_dept${num}`]}
                                  isValid={whyVal.trim().length >= 20}
                                >
                                  <textarea
                                    rows="3"
                                    value={whyVal}
                                    onChange={(e) => set(`why_dept${num}`, e.target.value)}
                                    placeholder={
                                      num === 1
                                        ? 'What specifically draws you to this primary department?'
                                        : num === 2
                                        ? 'Your second choice — what interests you here?'
                                        : 'Why would you be a good fit for this third department?'
                                    }
                                  />
                                </Field>
                              </div>
                            </div>
                          );
                        })}
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
