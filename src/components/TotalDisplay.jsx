import { useState, useEffect, useRef } from 'react';

export default function TotalDisplay({ total }) {
  const [displayTotal, setDisplayTotal] = useState(total);
  const animRef = useRef(null);
  const prevTotal = useRef(total);

  useEffect(() => {
    const from = prevTotal.current;
    const to = total;
    prevTotal.current = total;

    if (from === to) {
      setDisplayTotal(to);
      return;
    }

    const duration = 400; // ms
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setDisplayTotal(current);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    }

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [total]);

  return (
    <div className="total-card" id="total-display">
      <div className="total-label">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 10H2" />
          <path d="M6 14h.01" />
          <path d="M10 14h.01" />
        </svg>
        Total Spent
      </div>
      <div className="total-amount" id="total-amount">
        ${displayTotal.toFixed(2)}
      </div>
    </div>
  );
}
