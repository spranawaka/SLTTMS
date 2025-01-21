import { useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';
import gsap from 'gsap';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from(logoRef.current, {
      scale: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    })
    .to(logoRef.current, {
      scale: 1.1,
      duration: 0.2,
      repeat: 1,
      yoyo: true,
      ease: "power1.inOut"
    })
    .to(logoRef.current, {
      opacity: 1,
      scale: 0.8,
      duration: 0.3,
      delay: 1.5,
      onComplete
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center">
      <div ref={logoRef} className="text-accent flex flex-col items-center">
        <Phone size={64} className="animate-pulse" />
        <h1 className="mt-4 text-2xl font-space font-bold text-text-primary">
          Sri Lanka Telecom
        </h1>
        <p className="text-slate mt-2 font-mono">Training Management System</p>
      </div>
    </div>
  );
}