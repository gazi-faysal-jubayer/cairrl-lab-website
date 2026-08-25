'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/shared';

interface StatItem {
  readonly label: string;
  readonly value: number;
}

interface StatsStripProps {
  stats: readonly StatItem[];
}

function AnimatedNumber({ value, visible }: { value: number; visible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible || value === 0) return;

    const duration = 800;
    const steps = 20;
    const stepTime = duration / steps;
    let current = 0;
    const increment = value / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, visible]);

  return <span>{String(count).padStart(2, '0')}</span>;
}

export function StatsStrip({ stats }: StatsStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-border bg-surface-muted">
      <Container className="py-6 md:py-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
                <AnimatedNumber value={stat.value} visible={visible} />
              </p>
              <p className="mt-1 font-mono text-xs font-medium uppercase tracking-widest text-muted-text">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
