import { useState } from "react";
import HeaderStudentList from "../components/HeaderStudentList";
import StudentModal from "../components/StudentModal";


interface Student {
    id: number;
    name: string;
    parents: string;
    phoneNumber: string;
    academicPerformance: string;
    score: string;
}

function StudentFormPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("");
    const [formKey, setFormKey] = useState(0);

    const handleSubmitData = (data: { [key: string]: string }) => {
        const newStudent: Student = {
            id: Date.now(),
            name: data.name || "",
            parents: data.parents || "",
            phoneNumber: data.phoneNumber || "",
            academicPerformance: data.academicPerformance || "",
            score: data.score || "",
        };
        setStudents((prev) => [...prev, newStudent]);
        setShowForm(false);
        setFormKey((k) => k + 1);
    };

    const handleDelete = (id: number) => {
        setStudents((prev) => prev.filter((s) => s.id !== id));
    };

    const filtered = students.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.parents.toLowerCase().includes(search.toLowerCase()) ||
        s.phoneNumber.includes(search) ||
        s.academicPerformance.toLowerCase().includes(search.toLowerCase())
    );

    const getBadgeClass = (perf: string) => {
        const p = perf.toLowerCase();
        if (p.includes("yếu") || p.includes("weak"))
            return "bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs";
        if (p.includes("xuất sắc") || p.includes("giỏi"))
            return "bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs";
        if (p.includes("khá"))
            return "bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs";
        return "bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs";
    };

    return (
        <div>
           
            <div onClick={(e) => {
                const btn = (e.target as HTMLElement).closest("button");
                if (btn?.textContent?.includes("Thêm học viên")) setShowForm(true);
            }}>
                <HeaderStudentList />
            </div>

           
            <table className="w-full border-collapse text-sm border border-gray-300">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-center">Họ tên học viên</th>
                        <th className="border border-gray-300 px-3 py-2 text-center">Phụ huynh</th>
                        <th className="border border-gray-300 px-3 py-2 text-center">SĐT</th>
                        <th className="border border-gray-300 px-3 py-2 text-center">Học lực</th>
                        <th className="border border-gray-300 px-3 py-2 text-center">Điểm</th>
                        <th className="border border-gray-300 px-3 py-2 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={6} className="border border-gray-300 px-3 py-6 text-center text-gray-400">
                                Chưa có học viên nào
                            </td>
                        </tr>
                    )}
                    {filtered.map((s) => (
                        <tr key={s.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-3 py-2 text-center">{s.name}</td>
                            <td className="border border-gray-300 px-3 py-2 text-center">{s.parents}</td>
                            <td className="border border-gray-300 px-3 py-2 text-center">{s.phoneNumber}</td>
                            <td className="border border-gray-300 px-3 py-2 text-center">
                                <span className={getBadgeClass(s.academicPerformance)}>
                                    {s.academicPerformance}
                                </span>
                            </td>
                            <td className="border border-gray-300 px-3 py-2 text-center">{s.score}</td>
                            <td className="border border-gray-300 px-3 py-2 text-center">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 text-xs cursor-pointer hover:bg-blue-600">
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(s.id)}
                                    className="bg-white text-gray-700 border border-gray-300 px-3 py-1 rounded text-xs cursor-pointer hover:bg-gray-100"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

           
            <StudentModal
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                onSubmitData={handleSubmitData}
                formKey={formKey}
            />
        </div>
    );
}

export default StudentFormPage;
