import { useState, useEffect } from 'react'

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  const [editId, setEditId] = useState(null);

  const apiUrl = 'http://localhost:5000/api/students';

  // Hàm gọi API GET lấy danh sách sinh viên (Câu 74)
  const fetchStudents = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Quản lý Sinh viên</h1>

      <h2>Danh sách hiện tại:</h2>
      {students.length === 0 ? (
        <p>Chưa có sinh viên nào trong cơ sở dữ liệu.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {students.map((student) => (
            <li key={student._id} style={{ padding: '10px 15px', backgroundColor: '#f4f4f4', marginBottom: '8px', borderRadius: '5px', borderLeft: '5px solid #007bff' }}>
              <strong>{student.studentId}</strong> - {student.name} ({student.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App;
