import { useEffect, useRef, useState } from 'react';
import { Home, Edit2, Laptop2, Phone, Mail, User, ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { userService } from '../services/api';


type Student = {
  id: string;
  photo: string;
  name: string;
  phone: string;
  email: string;
  uid: string;
  laptopSerial: string;
  deviceCode: string;
  department: {
    _id: string;
    name: string;
    departmentId: string;
  };
  startDate: string;
  endDate: string;
  joinDate: string;
  status: 'active' | 'inactive';
};

type Department = {
  _id: string;
  name: string;
  departmentId: string;
};

export function DepartmentView() {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    laptopSerial: '',
    deviceCode: '',
    uid: '',
    departmentId: '',
    startDate: '',
    endDate: '',
    photo: ''
  });

  // Fetch departments and students data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch departments
        const deptResponse = await fetch('http://localhost:8088/api/department/all');
        const deptData = await deptResponse.json();
        
        if (!deptData.success) {
          throw new Error(deptData.message || 'Failed to fetch departments');
        }
        
        setDepartments(deptData.data);

        // Fetch students
        const studentsResponse = await userService.getUsers();
        
        if (!studentsResponse.success) {
          throw new Error(studentsResponse.message || 'Failed to fetch students');
        }

        const transformedData = studentsResponse.data.map((user: any) => ({
          id: user._id,
          photo: user.photo || '/api/placeholder/150/150',
          name: user.name,
          phone: user.phone || '',
          email: user.email,
          uid: user.uid,
          laptopSerial: user.laptopSerial || '',
          deviceCode: user.deviceCode,
          department: user.department,
          startDate: user.startDate || '',
          endDate: user.endDate || '',
          joinDate: user.createdAt,
          status: user.status ? 'active' : 'inactive'
        }));

        setStudents(transformedData);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline();
      tl.from(containerRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      phone: student.phone,
      email: student.email,
      laptopSerial: student.laptopSerial,
      deviceCode: student.deviceCode,
      uid: student.uid,
      departmentId: student.department?._id || '',
      startDate: student.startDate,
      endDate: student.endDate,
      photo: student.photo
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.departmentId) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      if (editingStudent) {
        const response = await userService.updateUser(editingStudent.id, {
          ...formData,
          module: formData.deviceCode
        });

        if (response.success) {
          setSuccessMessage('Student updated successfully');
          
          // Update local state
          setStudents(prev => prev.map(student => 
  student.id === editingStudent.id 
    ? {
        ...student,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        laptopSerial: formData.laptopSerial,
        deviceCode: formData.deviceCode,
        uid: formData.uid,
        department: {
          _id: formData.departmentId,
          name: departments.find(d => d._id === formData.departmentId)?.name || student.department.name,
          departmentId: departments.find(d => d._id === formData.departmentId)?.departmentId || student.department.departmentId
        },
        startDate: formData.startDate,
        endDate: formData.endDate,
        photo: formData.photo || student.photo,
        status: student.status
      }
    : student
));

          // Reset form and close modal
          setIsModalOpen(false);
          setEditingStudent(null);
          setFormData({
            name: '',
            phone: '',
            email: '',
            laptopSerial: '',
            deviceCode: '',
            uid: '',
            departmentId: '',
            startDate: '',
            endDate: '',
            photo: ''
          });
        } else {
          setError(response.message || 'Failed to update student');
        }
      }
    } catch (err: any) {
      console.error('Error updating student:', err);
      setError(err.response?.data?.message || 'Failed to update student');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="p-6 min-h-screen">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h3 className="font-bold">Error</h3>
          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <h3 className="font-bold">Success</h3>
          <p>{successMessage}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link 
              to="/admin" 
              className="flex items-center gap-2 text-accent hover:scale-110 transition-transform"
            >
              <ArrowLeft size={24} />
              <Home size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-space font-bold text-text-highlight">
                Department {id}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4"> 
            <Link
              to={`/admin/department/${id}/attendance`}
              className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg text-primary font-medium
                     hover:scale-105 transition-transform shadow-lg shadow-accent/10"
            >
              <Clock size={20} />
              View Attendance
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div
              key={student.id}
              className="glass-card rounded-xl p-6 group relative"
            >
              <button
                onClick={() => handleEdit(student)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-accent/10 text-accent 
                         hover:bg-accent/20 transition-colors"
              >
                <Edit2 size={18} />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-16 h-16 rounded-full border-2 border-accent object-cover"
                />
                <div>
                  <h2 className="text-xl font-space">{student.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-mono text-text-secondary">
                      UID: {student.uid}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                      ${student.status === 'active' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-error/10 text-error'
                      }`}
                    >
                      {student.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Phone size={16} className="text-accent" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Mail size={16} className="text-accent" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Laptop2 size={16} className="text-accent" />
                  <span>{student.laptopSerial}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <User size={16} className="text-accent" />
                  <span>Device: {student.deviceCode}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Calendar size={16} className="text-accent" />
                  <span>Training: {new Date(student.startDate).toLocaleDateString()} - {new Date(student.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-xl p-6 max-w-lg w-full">
            <h2 className="text-2xl font-space mb-6">
              {editingStudent ? 'Edit Student' : 'Add Student'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 
                           focus:border-accent/60 outline-none transition-colors text-text-primary"
                  placeholder="Enter student's full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  UID
                </label>
                <input
                  type="text"
                  name="uid"
                  value={formData.uid}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 
                           focus:border-accent/60 outline-none transition-colors text-text-primary"
                  placeholder="e.g., a4b8c15d"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Device Code
                </label>
                <input
                  type="text"
                  name="deviceCode"
                  value={formData.deviceCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 
                           focus:border-accent/60 outline-none transition-colors text-text-primary"
                  placeholder="e.g., DPSG0010"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 
                           focus:border-accent/60 outline-none transition-colors text-text-primary"
                  placeholder="+94 7X XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 
                           focus:border-accent/60 outline-none transition-colors text-text-primary"
                  placeholder="student@slt.lk"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Department
                </label>
                <select
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 
                           focus:border-accent/60 outline-none transition-colors text-text-primary"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name} ({dept.departmentId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Laptop Serial
                </label>
                <input
                  type="text"
                  name="laptopSerial"
                  value={formData.laptopSerial}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 
                           focus:border-accent/60 outline-none transition-colors text-text-primary"
                  placeholder="LT-2024-XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 
                           focus:border-accent/60 outline-none transition-colors text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 
                           focus:border-accent/60 outline-none transition-colors text-text-primary"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-accent/20 
                           focus:border-accent/60 outline-none transition-colors text-text-primary"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingStudent(null);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      laptopSerial: '',
                      deviceCode: '',
                      uid: '',
                      departmentId: '',
                      startDate: '',
                      endDate: '',
                      photo: ''
                    });
                  }}
                  className="px-4 py-2 rounded-lg hover:bg-secondary/50 transition-colors
                           text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-accent text-primary font-medium
                           hover:scale-105 transition-transform shadow-lg shadow-accent/20"
                >
                  {editingStudent ? 'Save Changes' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}