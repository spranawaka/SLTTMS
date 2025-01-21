import { useEffect, useRef, useState } from 'react';
import { Home, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

type AttendanceRecord = {
  photo: string;
  name: string;
  phone: string;
  email: string;
  laptopSerial: string;
  timestamp: Date;
  department: string;
};

export function AttendanceMarking() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scannedRecord, setScannedRecord] = useState<AttendanceRecord | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from(containerRef.current?.children || [], {
      y: 20,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    });

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate a scan after 3 seconds for demonstration
    const scanTimer = setTimeout(() => {
      setScannedRecord({
        photo: "https://avatars.githubusercontent.com/u/166550337?s=96&v=4",
        name: "sp ranawaka",
        phone: "+94 71 234 5678",
        email: "spranawaka@slt.lk",
        department: "Didital Project",
        laptopSerial: "LAP123",
        timestamp: new Date(),
      });
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(scanTimer);
    };
  }, []);

  useEffect(() => {
    if (scannedRecord) {
      const timer = setTimeout(() => {
        setScannedRecord(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [scannedRecord]);

  return (
    <div ref={containerRef} className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Link 
            to="/" 
            className="p-2 rounded-lg bg-accent/10 text-accent hover:scale-110 transition-transform"
          >
            <Home size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-space font-bold">
              Attendance System
            </h1>
            <p className="text-text-secondary mt-1">
              Mark your attendance using your ID card
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-accent" size={24} />
              <h2 className="text-xl font-space">Current Time</h2>
            </div>
            <p className="text-3xl font-mono text-text-highlight">
              {currentTime.toLocaleTimeString()}
            </p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-accent" size={24} />
              <h2 className="text-xl font-space">Today's Date</h2>
            </div>
            <p className="text-3xl font-mono text-text-highlight">
              {currentTime.toLocaleDateString()}
            </p>
          </div>
        </div>

        {scannedRecord ? (
          <div className="glass-card rounded-xl p-8 text-center animate-[fadeIn_0.3s_ease-out]">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-success/10 rounded-full">
                <CheckCircle2 className="text-success w-12 h-12 animate-[ping_1s_ease-in-out]" />
              </div>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <img
                src={scannedRecord.photo}
                alt={scannedRecord.name}
                className="w-24 h-24 rounded-full border-2 border-accent"
              />
              <div className="text-left">
                <h2 className="text-2xl font-space mb-1">{scannedRecord.name}</h2>
                <p className="text-text-secondary mb-1">{scannedRecord.department}</p>
                <p className="text-text-secondary text-sm">{scannedRecord.email}</p>
                <p className="text-text-secondary text-sm">{scannedRecord.phone}</p>
                <p className="text-text-secondary text-sm">{scannedRecord.laptopSerial}</p>
              </div>
            </div>
            <div className="font-mono text-sm text-accent bg-accent/5 rounded-lg py-2">
              Attendance marked at {scannedRecord.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-xl p-8 text-center">
            <h2 className="text-2xl font-space font-bold mb-4">Ready for Attendance</h2>
            <p className="text-text-secondary">Place your ID card on the scanner</p>
            <div className="mt-8 w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
}