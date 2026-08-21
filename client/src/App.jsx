import { useState, useEffect } from 'react'

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: ''
  });
  
  const [editId, setEditId] = useState(null);

  const apiUrl = 'https://friendly-space-couscous-jrq5wjqrq7vx2j55g-5000.app.github.dev/api/students';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await fetch(`${apiUrl}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Cập nhật sinh viên thành công!");
          setEditId(null); 
        }
      } else {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Thêm sinh viên thành công!");
        }
      }
      
      setFormData({ studentId: '', name: '', email: '' }); 
      fetchStudents(); 
    } catch (error) {
      console.error('Lỗi khi lưu sinh viên:', error);
    }
  };

  const handleEdit = (student) => {
    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email
    });
    setEditId(student._id); 
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) {
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert("Xóa sinh viên thành công!");
          fetchStudents(); 
        }
      } catch (error) {
        console.error('Lỗi khi xóa dữ liệu:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Quản lý Sinh viên</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <input type="text" name="studentId" placeholder="Mã số sinh viên" value={formData.studentId} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="text" name="name" placeholder="Họ và tên" value={formData.name} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: editId ? '#28a745' : '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          {editId ? 'Cập nhật Sinh Viên' : 'Thêm Sinh Viên'}
        </button>
      </form>

      <h2>Danh sách hiện tại:</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {students.map((student) => (
          <li key={student._id} style={{ padding: '10px 15px', backgroundColor: '#f4f4f4', marginBottom: '8px', borderRadius: '5px', borderLeft: '5px solid #007bff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* Vùng chứa text: Cho phép xuống dòng nếu chữ quá dài, không đẩy nút */}
            <span style={{ flex: 1, paddingRight: '15px', wordBreak: 'break-word', textAlign: 'left' }}>
              <strong>{student.studentId}</strong> - {student.name} ({student.email})
            </span>
            
            {/* Vùng chứa nút bấm: Cố định kích thước, luôn nằm ngang */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => handleEdit(student)} style={{ padding: '6px 12px', backgroundColor: '#ffc107', border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>Sửa</button>
              <button onClick={() => handleDelete(student._id)} style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;