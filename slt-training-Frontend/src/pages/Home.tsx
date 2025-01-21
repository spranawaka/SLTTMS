import { useNavigate } from 'react-router-dom';
import { Users, Fingerprint } from 'lucide-react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export function Home() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from(containerRef.current?.children || [], {
      y: 30,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-4"
    >
      
        <div className="flex justify-center items-center gap-4 mb-6">
          <h1 className="text-5xl md:text-6xl font-space font-bold">
            SLTTMS
          </h1>
        </div>
      <h1 className="text-4xl md:text-5xl font-space font-bold text-center mb-8">
        Training Management System
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <button
          onClick={() => navigate('/attendance')}
          className="group p-8 rounded-xl backdrop-blur-lg bg-primary/10
                   border border-accent/20 hover:border-accent/40 transition-all
                   flex flex-col items-center gap-4 hover:scale-105 transition-all duration-300"
        >
          <Fingerprint 
            size={48} 
            className="text-accent group-hover:scale-110 transition-transform"  
          />
          <span className="text-xl font-space">Attendance Marking</span>
        </button>

        <button
          onClick={() => navigate('/admin')}
          className="group p-8 rounded-xl backdrop-blur-lg bg-primary/10 
                   border border-accent/20 hover:border-accent/40 transition-all
                   flex flex-col items-center gap-4 hover:scale-105 transition-all duration-300"
        >
          <Users 
            size={48} 
            className="text-accent group-hover:scale-110 transition-transform" 
          />
          <span className="text-xl font-space">Admin Dashboard</span>
        </button>
      </div>
    </div>
  );
}

