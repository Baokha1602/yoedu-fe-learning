import React from "react";

const Header: React.FC = () => {
    return (
        <div className="flex flex-col gap-4 mb-6">
            {/* Row 1: Title + Subtitle ở trái, Nút Add ở phải */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">
                        Quản lý học viên
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Danh sách và thông tin học viên
                    </p>
                </div>


                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-150 flex items-center gap-1">
                    <span>+</span> Thêm học viên
                </button>
            </div>

            {/* Row 2: Ô tìm kiếm full width */}
            <div className="w-full">
                <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1.5 w-full shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-100 transition-all duration-200">
                    <svg
                        className="w-4 h-4 text-gray-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="outline-none ml-2 w-full text-sm text-gray-700 bg-transparent placeholder-gray-400"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;