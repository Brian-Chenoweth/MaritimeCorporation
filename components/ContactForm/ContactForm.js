'use client';

// import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

import styles from './ContactForm.module.scss';

export default function ContactForm() {
  const [state, formspreeSubmit] = useForm('mzzjndgn');

  const handleSubmit = (e) => {
    // setConfirmError('');
    // const form = e.currentTarget;
    formspreeSubmit(e);
  };

  if (state.succeeded) {
    return <h3 className={styles.successMsg}>Thank you for submitting your request to comment at the Cal Maritime Corporation board meeting. Please arrive at least 15 minutes before the meeting begins, and check in with the meeting facilitator.</h3>;
  }

  return (
<form onSubmit={handleSubmit} className={`${styles.form || ''} contact-form`} noValidate>
  {/* Honeypot for bots */}
  <input
    type="text"
    name="website"
    tabIndex={-1}
    autoComplete="off"
    className="hidden"
    style={{ display: 'none' }}
    aria-hidden="true"
  />

  <label htmlFor="name">
    <span>Name:</span>
    <input id="name" name="name" type="text" />
  </label>

  <label htmlFor="agendaItem">
    <span>Agenda Item:</span>
    <input id="agendaItem" name="agendaItem" type="text" />
  </label>

  <label htmlFor="issue">
    <span>Issue:</span>
    <textarea id="issue" name="issue" />
  </label>

  <label htmlFor="phone">
    <span>Phone:</span>
    <input id="phone" name="phone" type="tel" />
  </label>

  <label htmlFor="email">
    <span>Email:</span>
    <input id="email" name="email" type="email" />
  </label>

  <label htmlFor="date">
    <span>Date:</span>
    <input id="date" name="date" type="date" />
  </label>

  {/* Formspree field-level errors */}
  <ValidationError prefix="Email" field="email" errors={state.errors} />
  <ValidationError prefix="Issue" field="issue" errors={state.errors} />

  <button type="submit" disabled={state.submitting} className={styles.submitBtn}>
    {state.submitting ? 'Submitting…' : 'Submit'}
  </button>
</form>

  );
}
