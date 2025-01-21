import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

type AttendanceRecord = {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  phoneNumber: string;
  inTime: string;
  outTime: string | null;
};

const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: '1',
    date: '2024-03-15',
    studentId: 'STU001',
    studentName: 'John Doe',
    phoneNumber: '+94 71 234 5678',
    inTime: '09:00 AM',
    outTime: '05:00 PM'
  },
  {
    id: '2',
    date: '2024-03-15',
    studentId: 'STU002',
    studentName: 'Jane Smith',
    phoneNumber: '+94 71 987 6543',
    inTime: '08:45 AM',
    outTime: '04:30 PM'
  },
  {
    id: '3',
    date: '2024-03-15',
    studentId: 'STU003',
    studentName: 'Mike Johnson',
    phoneNumber: '+94 71 555 1234',
    inTime: '09:15 AM',
    outTime: null
  }
];

export function AttendanceTable() {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from(containerRef.current?.children || [], {
      y: 20,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, []);

  

  return (
    <div ref={containerRef} className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to={`/admin/department/${id}`}
              className="p-2 rounded-lg bg-accent/10 text-accent hover:scale-110 transition-transform"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-space font-bold text-text-highlight">
                Attendance Records Department {id}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-card px-4 py-2 flex items-center gap-2 rounded-xl">
              <Calendar size={20} className="text-accent" />
              <span className="text-text-secondary">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-card/90 hover:bg-card-hover/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-highlight">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-highlight">Student ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-highlight">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-highlight">Phone Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-highlight">In Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-highlight">Out Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-highlight">Status</th>
                </tr>
              </thead> 
              <tbody className="divide-y divide-border-light">
                {MOCK_ATTENDANCE.map((record) => (
                  <tr key={record.id} className="hover:bg-card-hover/30 transition-colors">
                    <td className="px-6 py-4 text-text-primary">{record.date}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-text-secondary">{record.studentId}</span>
                    </td>
                    <td className="px-6 py-4 text-text-primary">{record.studentName}</td>
                    <td className="px-6 py-4 text-text-secondary">{record.phoneNumber}</td>
                    <td className="px-6 py-4 text-text-primary">{record.inTime}</td>
                    <td className="px-6 py-4 text-text-primary">{record.outTime || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium
                        ${record.outTime 
                          ? 'bg-success/10 text-success' 
                          : 'bg-warning/10 text-warning'
                        }`}
                      >
                        {record.outTime ? 'Completed' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}