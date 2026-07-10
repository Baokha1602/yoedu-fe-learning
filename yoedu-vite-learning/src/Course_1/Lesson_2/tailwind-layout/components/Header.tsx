import React from "react";

const Header: React.FC = () => {
    return (
        <div className="flex flex-col gap-4 mb-8">
            {/* Title Row */}
            <div>
                <h1 className="text-3xl font-semibold text-gray-800">Users</h1>
            </div>

            {/* Controls Row (Search and Tabs) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                {/* Search Input */}
                <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 w-64 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-200">
                    <svg
                        className="w-5 h-5 text-slate-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search users"
                        className="outline-none ml-2 w-full text-sm text-gray-700 bg-transparent placeholder-gray-400"
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 text-sm overflow-x-auto py-1">
                    <button className="text-gray-500 hover:text-gray-700 font-medium px-2 py-1 transition-colors duration-150">
                        Reputation
                    </button>
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-all duration-150">
                        New users
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 font-medium px-2 py-1 transition-colors duration-150">
                        Voters
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 font-medium px-2 py-1 transition-colors duration-150">
                        Editors
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 font-medium px-2 py-1 transition-colors duration-150">
                        Moderators
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;