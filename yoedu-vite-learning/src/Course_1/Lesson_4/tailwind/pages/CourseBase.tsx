import { useState, useMemo } from 'react';
import type { Course } from '../../antdesign/types/course';

const statusOptions = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'pending', label: 'Chờ duyệt' },
  { value: 'closed', label: 'Đã đóng' },
];

const getStatusStyle = (status: string) => {
  if (status === 'active') return 'bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold';
  if (status === 'pending') return 'bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-semibold';
  return 'bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-semibold';
};

const getStatusLabel = (status: string) => {
  if (status === 'active') return 'Hoạt động';
  if (status === 'pending') return 'Chờ duyệt';
  return 'Đã đóng';
};

const emptyForm = { code: '', name: '', instructor: '', price: '', status: 'active' };

const CourseBase = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form, setForm] = useState<{ [key: string]: string }>(emptyForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filteredCourses = useMemo(() => {
    if (!search.trim()) return courses;
    const lower = search.toLowerCase();
    return courses.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.code.toLowerCase().includes(lower) ||
        c.instructor.toLowerCase().includes(lower)
    );
  }, [courses, search]);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setForm(emptyForm);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setForm({
      code: course.code,
      name: course.name,
      instructor: course.instructor,
      price: String(course.price),
      status: course.status,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    let err = '';
    if (name === 'code' && value.trim() === '') err = 'Vui lòng nhập mã khóa học';
    if (name === 'name' && value.trim() === '') err = 'Vui lòng nhập tên khóa học';
    if (name === 'instructor' && value.trim() === '') err = 'Vui lòng nhập tên giảng viên';
    if (name === 'price' && value.trim() !== '') {
      const n = Number(value);
      if (isNaN(n) || n < 0) err = 'Giá phải là số dương';
    }
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalErrors: { [key: string]: string } = {};
    if (!form.code?.trim()) finalErrors.code = 'Vui lòng nhập mã khóa học';
    if (!form.name?.trim()) finalErrors.name = 'Vui lòng nhập tên khóa học';
    if (!form.instructor?.trim()) finalErrors.instructor = 'Vui lòng nhập tên giảng viên';
    if (!form.price?.trim()) finalErrors.price = 'Vui lòng nhập giá khóa học';

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }

    const price = Number(form.price);

    if (editingCourse) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id
            ? { ...c, code: form.code, name: form.name, instructor: form.instructor, price, status: form.status as Course['status'] }
            : c
        )
      );
    } else {
      const newCourse: Course = {
        id: Date.now(),
        code: form.code,
        name: form.name,
        instructor: form.instructor,
        price,
        status: form.status as Course['status'],
      };
      setCourses((prev) => [...prev, newCourse]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Khóa học (Tailwind)</h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-52 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + Thêm mới
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-3 py-2 text-left">Mã</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Tên Khóa Học</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Giảng Viên</th>
              <th className="border border-gray-200 px-3 py-2 text-right">Giá</th>
              <th className="border border-gray-200 px-3 py-2 text-center">Trạng thái</th>
              <th className="border border-gray-200 px-3 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length === 0 && (
              <tr>
                <td colSpan={6} className="border border-gray-200 px-3 py-6 text-center text-gray-400">
                  Chưa có khóa học nào
                </td>
              </tr>
            )}
            {filteredCourses.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-3 py-2 font-mono text-xs">{c.code}</td>
                <td className="border border-gray-200 px-3 py-2 font-medium">{c.name}</td>
                <td className="border border-gray-200 px-3 py-2">{c.instructor}</td>
                <td className="border border-gray-200 px-3 py-2 text-right">{c.price.toLocaleString()} VND</td>
                <td className="border border-gray-200 px-3 py-2 text-center">
                  <span className={getStatusStyle(c.status)}>{getStatusLabel(c.status)}</span>
                </td>
                <td className="border border-gray-200 px-3 py-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="bg-blue-50 text-blue-600 border border-blue-300 px-3 py-1 rounded text-xs hover:bg-blue-100 transition-colors"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(c.id)}
                      className="bg-white text-red-600 border border-red-300 px-3 py-1 rounded text-xs hover:bg-red-50 transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80">
            <h3 className="text-base font-semibold text-gray-800 mb-2">Xác nhận xóa</h3>
            <p className="text-sm text-gray-600 mb-4">Bạn có chắc chắn muốn xóa khóa học này không?</p>
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
              {editingCourse ? 'Cập nhật khóa học' : 'Thêm khóa học mới'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Mã khóa học */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Mã khóa học</label>
                <input
                  type="text"
                  placeholder="Nhập mã khóa học (vd: RE01)"
                  value={form.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  className={`border rounded-lg px-3 py-2 text-sm outline-none transition-all ${
                    errors.code ? 'border-red-400' : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
                {errors.code && <span className="text-red-500 text-xs">{errors.code}</span>}
              </div>

              {/* Tên khóa học */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Tên khóa học</label>
                <input
                  type="text"
                  placeholder="Nhập tên khóa học"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`border rounded-lg px-3 py-2 text-sm outline-none transition-all ${
                    errors.name ? 'border-red-400' : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
              </div>

              {/* Giảng viên */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Giảng viên</label>
                <input
                  type="text"
                  placeholder="Nhập tên giảng viên"
                  value={form.instructor}
                  onChange={(e) => handleChange('instructor', e.target.value)}
                  className={`border rounded-lg px-3 py-2 text-sm outline-none transition-all ${
                    errors.instructor ? 'border-red-400' : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
                {errors.instructor && <span className="text-red-500 text-xs">{errors.instructor}</span>}
              </div>

              {/* Giá */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Giá khóa học</label>
                <input
                  type="number"
                  placeholder="Nhập giá khóa học"
                  value={form.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  className={`border rounded-lg px-3 py-2 text-sm outline-none transition-all ${
                    errors.price ? 'border-red-400' : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
                {errors.price && <span className="text-red-500 text-xs">{errors.price}</span>}
              </div>

              {/* Trạng thái */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Trạng thái</label>
                <select
                  value={form.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

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
                  {editingCourse ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseBase;
