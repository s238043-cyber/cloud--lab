import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  const [editId, setEditId] = useState(null);

  const apiUrl = 'http://localhost:5000/api/students';

  // Câu 74: Lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Câu 75 & 77: Thêm / Sửa sinh viên
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await fetch(`${apiUrl}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          alert("Cập nhật sinh viên thành công!");
          setEditId(null);
        }
      } else {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          alert("Thêm sinh viên thành công!");
        }
      }
      setFormData({ studentId: '', name: '', email: '' });
      fetchStudents();
    } catch (err) {
      console.error("Lỗi thao tác:", err);
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

  // Câu 78: Xóa sinh viên
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) {
      try {
        const res = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          alert("Xóa sinh viên thành công!");
          fetchStudents();
        }
      } catch (err) {
        console.error("Lỗi xóa:", err);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Quản lý Sinh viên</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
        <h3>{editId ? 'Cập nhật Sinh viên' : 'Thêm Sinh viên mới'}</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Mã số sinh viên: </label>
          <input
            type="text"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Họ và tên: </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: editId ? '#28a745' : '#007bff',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {editId ? 'Cập nhật Sinh Viên' : 'Thêm Sinh Viên'}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => { setEditId(null); setFormData({ studentId: '', name: '', email: '' }); }}
            style={{ marginLeft: '10px', padding: '10px 15px', borderRadius: '4px' }}
          >
            Hủy
          </button>
        )}
      </form>

      <h2>Danh sách hiện tại:</h2>
      {students.length === 0 ? (
        <p>Chưa có sinh viên nào trong cơ sở dữ liệu.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {students.map((student) => (
            <li key={student._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', backgroundColor: '#f4f4f4', marginBottom: '8px', borderRadius: '5px', borderLeft: '5px solid #007bff' }}>
              <div>
                <strong>{student.studentId}</strong> - {student.name} ({student.email})
              </div>
              <div>
                <button onClick={() => handleEdit(student)} style={{ backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', marginRight: '5px', borderRadius: '3px', cursor: 'pointer' }}>Sửa</button>
                <button onClick={() => handleDelete(student._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Xóa</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
