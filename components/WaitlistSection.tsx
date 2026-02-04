import React, { useState } from 'react';
import Logo from './Logo';

const WAITLIST_API_URL = typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_WAITLIST_API_URL;

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (!WAITLIST_API_URL || WAITLIST_API_URL === '') {
      setStatus('success');
      setMessage("Thanks! We'll be in touch soon.");
      setEmail('');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch(WAITLIST_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus('success');
        const data = await res.json().catch(() => ({}));
        setMessage(data.message || "Thanks! We'll be in touch soon.");
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="waitlist" className="py-28 bg-subtle">
      <div className="max-w-xl mx-auto px-6 lg:px-8 text-center">
        <Logo size={64} className="mx-auto mb-6" />
        <h2 className="text-h2 md:text-h2-lg font-bold text-[#1a1a2e] mb-4">Join the Beta</h2>
        <p className="text-[#4a4a5a] text-body mb-8">
          Be among the first to experience the future of product development.
        </p>
        {status === 'success' ? (
          <div className="text-[#059669] font-medium">{message}</div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field flex-1 px-4 py-3 rounded-xl text-sm"
              required
              disabled={status === 'loading'}
              aria-label="Email for waitlist"
            />
            <button
              type="submit"
              className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap disabled:opacity-70"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        )}
        {status === 'error' && <p className="mt-3 text-sm text-red-600">{message}</p>}
        <p className="text-[#6b7280] text-caption mt-4">We&apos;ll only email you about product updates. Unsubscribe anytime.</p>
      </div>
    </section>
  );
};

export default WaitlistSection;
