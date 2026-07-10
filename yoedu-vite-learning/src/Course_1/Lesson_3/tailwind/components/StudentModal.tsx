import ReactDOM from "react-dom";
import StudentListForm from "./StudentFromTailwind";


interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmitData: (data: { [key: string]: string }) => void;
    formKey: number;
}

function StudentModal({ isOpen, onClose, onSubmitData, formKey }: Props) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            className="fixed inset-0 bg-black/45 flex items-center justify-center z-[9999]"
        >
            <div className="bg-white rounded-xl p-6 w-[440px] max-w-[90vw] relative shadow-2xl">
                {/* Nút đóng */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl bg-transparent border-none cursor-pointer leading-none"
                >
                    ✕
                </button>

                <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Thêm học viên
                </h3>

                {/* Form component StudentListForm */}
                <StudentListForm
                    key={formKey}
                    onSubmitData={(data) => { onSubmitData(data); onClose(); }}
                />

                {/* Nút Hủy */}
                <button
                    onClick={onClose}
                    className="w-full mt-2 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                    Hủy
                </button>
            </div>
        </div>,
        document.body
    );
}

export default StudentModal;
