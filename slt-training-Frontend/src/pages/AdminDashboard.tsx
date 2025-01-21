import { useEffect, useRef, useState } from 'react';
import { Home, Plus, Building2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import axios from 'axios';

type Department = {
  _id: string;
  name: string;
  location: string;
  departmentId: string;
  description: string;
  DeviceCode: string;
};

const API_URL = 'http://localhost:8088/api';

export function AdminDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    departmentId: '',
    description: '',
    DeviceCode: ''
  });

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Animation effect
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

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${API_URL}/department/all`);
      setDepartments(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch departments');
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.departmentId || !formData.DeviceCode) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/department/create`, formData);
      if (response.data.success !== false) {
        // Refresh departments list
        fetchDepartments();
        // Reset form and close modal
        setFormData({
          name: '',
          location: '',
          departmentId: '',
          description: '',
          DeviceCode: ''
        });
        setIsModalOpen(false);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create department');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div ref={containerRef} className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-accent hover:scale-110 transition-transform">
              <ArrowLeft size={20} />
              <Home size={24} />
            </Link>
            <h1 className="text-3xl font-space font-bold text-text-highlight">Admin Dashboard</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-primary font-medium hover:scale-105 transition-transform shadow-lg shadow-accent/20"
          >
            <Plus size={20} />
            Add Department
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Link
              key={dept._id}
              to={`/admin/department/${dept._id}`}
              className="bg-card-bg/80 backdrop-blur-lg rounded-xl p-6 group hover:scale-105 transition-all duration-300 border border-accent/10 hover:border-accent/30 shadow-lg shadow-black/20"
            >
              <div className="flex items-start justify-between mb-4">
                <Building2 className="text-accent group-hover:rotate-12 transition-transform" size={24} />
                <span className="text-sm font-mono text-text-secondary">{dept.departmentId}</span>
              </div>
              <h2 className="text-xl font-space text-text-highlight mb-2">{dept.name}</h2>
              <p className="text-text-secondary text-sm mb-2">{dept.location}</p>
              <p className="text-text-secondary text-sm mb-2">{dept.description}</p>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-xs font-mono text-accent/80">Device: {dept.DeviceCode}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card-bg/90 backdrop-blur-lg rounded-xl p-8 max-w-md w-full border border-accent/20 shadow-xl shadow-black/30">
            <h2 className="text-2xl font-space text-text-highlight mb-6">Add New Department</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Department ID</label>
                <input
                  type="text"
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 focus:border-accent/60 outline-none transition-colors text-text-primary"
                  placeholder="Enter department ID (e.g., IT001)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Department Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 focus:border-accent/60 outline-none transition-colors text-text-primary"
                  placeholder="Enter department name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 focus:border-accent/60 outline-none transition-colors text-text-primary"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 focus:border-accent/60 outline-none transition-colors text-text-primary"
                  placeholder="Enter department description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Device Code</label>
                <input
                  type="text"
                  name="DeviceCode"
                  value={formData.DeviceCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 focus:border-accent/60 outline-none transition-colors text-text-primary"
                  placeholder="Enter device code (e.g., DEV001)"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-secondary/50 transition-colors text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-accent text-primary font-medium hover:scale-105 transition-transform shadow-lg shadow-accent/20"
                >
                  Create Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}