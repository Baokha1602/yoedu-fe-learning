import { useState } from "react";

const FieldList = [
    { name: "name", label: "Họ tên học sinh" },
    { name: "parents", label: "Phụ huynh" },
    { name: "phoneNumber", label: "Số điện thoại" },
    { name: "academicPerformance", label: "Học lực" },
    { name: "score", label: "Điểm số" },
];

interface Props {
    onSubmitData?: (data: { [key: string]: string }) => void;
}

function StudentListForm({ onSubmitData }: Props) {
    const [form, setForm] = useState<{ [key: string]: string }>({});


    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (name: string, value: string) => {

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // 2. Tiến hành validate real-time dựa trên tên trường (name)
        let errorMsg = "";

        if (name === "name" && value.trim() === "") {
            errorMsg = "Họ tên không được để trống";
        }

        if (name === "phoneNumber") {
            if (value.trim() === "") {
                errorMsg = "Số điện thoại không được để trống";
            } else if (!/^\d*$/.test(value)) {
                errorMsg = "Số điện thoại chỉ được phép nhập số";
            } else if (value.length !== 10) {
                errorMsg = "Số điện thoại phải có đúng 10 chữ số";
            }
        }

        if (name === "score" && value.trim() !== "") {
            const numScore = Number(value);
            if (isNaN(numScore)) {
                errorMsg = "Điểm số phải là số";
            } else if (numScore < 0 || numScore > 10) {
                errorMsg = "Điểm số phải nằm trong khoảng từ 0 đến 10";
            }
        }


        setErrors((prev) => ({
            ...prev,
            [name]: errorMsg,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const finalErrors: { [key: string]: string } = {};

        if (!form.name || form.name.trim() === "") {
            finalErrors.name = "Họ tên không được để trống";
        }
        if (!form.phoneNumber || form.phoneNumber.trim() === "") {
            finalErrors.phoneNumber = "Số điện thoại không được để trống";
        } else if (form.phoneNumber.length !== 10) {
            finalErrors.phoneNumber = "Số điện thoại phải có đúng 10 chữ số";
        }


        if (Object.keys(finalErrors).length > 0) {
            setErrors(finalErrors);
            return;
        }

        console.log(form);
        if (onSubmitData) onSubmitData(form);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
            {FieldList.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                        className={`border rounded-lg px-3 py-1.5 text-sm outline-none transition-all w-full ${errors[field.name]
                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-100"
                                : "border-gray-300 focus:border-blue-500"
                            }`}
                        value={form[field.name] || ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                    />

                    {errors[field.name] && (
                        <span className="text-red-500 text-xs font-medium mt-0.5 ml-1">
                            {errors[field.name]}
                        </span>
                    )}
                </div>
            ))}
            <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg text-sm font-medium mt-2 hover:bg-blue-700">
                Lưu
            </button>
        </form>
    );
}

export default StudentListForm;