import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/AdminDashboard';
import { DepartmentView } from './pages/DepartmentView';
import { AttendanceMarking } from './pages/AttendanceMarking';
import { Footer } from './components/Footer';
import { AttendanceTable } from './pages/AttendanceTable';
import { ParticleBackground } from './components/ParticleBackground';


function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ParticleBackground />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/department/:id" element={<DepartmentView />} />
            <Route path="/attendance" element={<AttendanceMarking />} />
            <Route path="/admin/department/:id/attendance" element={<AttendanceTable />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;