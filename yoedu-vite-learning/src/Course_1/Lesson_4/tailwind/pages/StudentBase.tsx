import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  parent: string;
  number: string;
  academicPerformance: string;
  score: number;
}

const getRank = (score: number) => {
  if (score >= 8) return 'Giỏi';
  if (score >= 6.5) return 'Khá';
  if (score >= 5) return 'Trung bình';
  return 'Yếu';
};

const getBadgeClass = (rank: string) => {
  if (rank === 'Giỏi') return 'bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold';
  if (rank === 'Khá') return 'bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold';
  if (rank === 'Trung bình') return 'bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-semibold';
  return 'bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-semibold';
};

const fieldList = [
  { name: 'name', label: 'Họ tên học sinh', type: 'text', placeholder: 'Nhập tên học sinh' },
  { name: 'parent', label: 'Phụ huynh', type: 'text', placeholder: 'Nhập tên phụ huynh' },
  { name: 'number', label: 'Số điện thoại', type: 'text', placeholder: 'Nhập số điện thoại' },
  { name: 'score', label: 'Điểm số', type: 'number', placeholder: 'Nhập điểm (0–10)' },
];

const emptyForm = { name: '', parent: '', number: '', score: '' };

const StudentBase = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form, setForm] = useState<{ [key: string]: string }>(emptyForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredStudents = useMemo(() => {
    if (!search.trim()) return students;
    const lower = search.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(lower) ||
        s.parent.toLowerCase().includes(lower) ||
        s.number.includes(lower)
    );
  }, [students, search]);

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setForm(emptyForm);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setForm({
      name: student.name,
      parent: student.parent,
      number: student.number,
      score: String(student.score),
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    let err = '';
    if (name === 'name' && value.trim() === '') err = 'Họ tên không được để trống';
    if (name === 'number') {
      if (value.trim() === '') err = 'Số điện thoại không được để trống';
      else if (!/^\d*$/.test(value)) err = 'Chỉ được nhập số';
      else if (value.length !== 10) err = 'Phải có đúng 10 chữ số';
    }
    if (name === 'score' && value.trim() !== '') {
      const n = Number(value);
      if (isNaN(n) || n < 0 || n > 10) err = 'Điểm phải từ 0 đến 10';
    }
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalErrors: { [key: string]: string } = {};
    if (!form.name?.trim()) finalErrors.name = 'Họ tên không được để trống';
    if (!form.number?.trim()) finalErrors.number = 'Số điện thoại không được để trống';
    else if (form.number.length !== 10) finalErrors.number = 'Phải có đúng 10 chữ số';
    if (!form.score?.trim()) finalErrors.score = 'Vui lòng nhập điểm số';

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }

    const score = Number(form.score);
    const academicPerformance = getRank(score);

    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id
            ? { ...s, ...form, score, academicPerformance }
            : s
        )
      );
    } else {
      const newStudent: Student = {
        id: crypto.randomUUID(),
        name: form.name,
        parent: form.parent,
        number: form.number,
        score,
        academicPerformance,
      };
      setStudents((prev) => [...prev, newStudent]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Học sinh (Tailwind)</h1>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Thêm mới
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full max-w-xs focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-3 py-2 text-left">Họ tên</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Phụ huynh</th>
              <th className="border border-gray-200 px-3 py-2 text-left">SĐT</th>
              <th className="border border-gray-200 px-3 py-2 text-center">Học lực</th>
              <th className="border border-gray-200 px-3 py-2 text-center">Điểm</th>
              <th className="border border-gray-200 px-3 py-2 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={6} className="border border-gray-200 px-3 py-6 text-center text-gray-400">
                  Chưa có học sinh nào
                </td>
              </tr>
            )}
            {filteredStudents.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-3 py-2">
                  <Link to={`/lesson4/Student/${s.id}`} className="text-blue-600 hover:underline font-medium">
                    {s.name}
                  </Link>
                </td>
                <td className="border border-gray-200 px-3 py-2">{s.parent}</td>
                <td className="border border-gray-200 px-3 py-2">{s.number}</td>
                <td className="border border-gray-200 px-3 py-2 text-center">
                  <span className={getBadgeClass(s.academicPerformance)}>{s.academicPerformance}</span>
                </td>
                <td className="border border-gray-200 px-3 py-2 text-center">{s.score}</td>
                <td className="border border-gray-200 px-3 py-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleOpenEdit(s)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(s.id)}
                      className="bg-white text-red-600 border border-red-300 px-3 py-1 rounded text-xs hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80">
            <h3 className="text-base font-semibold text-gray-800 mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-gray-600 mb-4">Bạn có chắc chắn muốn xóa học sinh này không?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-1.5 rounded border border-gray-300 text-sm text-gray-600 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-1.5 rounded bg-red-500 text-white text-sm hover:bg-red-600"
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {editingStudent ? 'Cập nhật thông tin học sinh' : 'Thêm học sinh mới'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {fieldList.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={`border rounded-lg px-3 py-2 text-sm outline-none transition-all ${
                      errors[field.name]
                        ? 'border-red-400 focus:ring-1 focus:ring-red-200'
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                  />
                  {errors[field.name] && (
                    <span className="text-red-500 text-xs">{errors[field.name]}</span>
                  )}
                </div>
              ))}
              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border border-gray-300 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                >
                  {editingStudent ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentBase;
