import { useState, useMemo } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Student } from '../types/student';
import StudentTableFormAntd from '../components/StudentTableFormAntd';
import StudentModalAntd from '../components/StudentModalAntd';

const getRank = (score: number) => {
  if (score >= 8) return "Giỏi";
  if (score >= 6.5) return "Khá";
  if (score >= 5) return "Trung bình";
  return "Yếu";
};

const StudentAntd = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [search, setSearch] = useState("");

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setIsModalVisible(true);
  };

  const handleOpenEdit = (record: Student) => {
    setEditingStudent(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
    message.success('Đã xóa học sinh thành công');
  };

  const handleModalSubmit = (values: Student) => {
    const newValues = { ...values, academicPerformance: getRank(values.score) };

    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...newValues } : s));
      message.success('Cập nhật học sinh thành công');
    } else {
      const newStudent = { ...newValues, id: crypto.randomUUID() };
      setStudents([...students, newStudent]);
      message.success('Thêm học sinh thành công');
    }
  };

  const filteredStudents = useMemo(() => {
    if (!search.trim()) return students;
    const lowerSearch = search.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(lowerSearch) ||
        s.parent.toLowerCase().includes(lowerSearch) ||
        s.phone.toLowerCase().includes(lowerSearch)
    );
  }, [students, search]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 m-0">Quản lý Học sinh (Antd)</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenAdd} size="large">
          Thêm mới
        </Button>
      </div>

      <StudentTableFormAntd
        students={filteredStudents}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        search={search}
        onSearch={setSearch}
      />

      {isModalVisible && (
        <StudentModalAntd
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleModalSubmit}
          editingStudent={editingStudent}
        />
      )}
    </div>
  );
};

export default StudentAntd;
