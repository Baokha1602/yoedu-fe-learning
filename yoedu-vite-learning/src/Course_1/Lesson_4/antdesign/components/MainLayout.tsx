import { Link, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const menu = [
    { name: 'Dashboard', path: '/lesson4' },
    { name: 'Student (Antd)', path: '/lesson4/Student' },
    { name: 'Student (Tailwind)', path: '/lesson4/StudentTailwind' },
    { name: 'Course (Antd)', path: '/lesson4/Course' },
    { name: 'Course (Tailwind)', path: '/lesson4/CourseTailwind' },

];

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md flex flex-col">
                { }
                <div className="p-4 text-xl font-bold text-blue-600 border-b flex items-center gap-3">
                    <Link
                        to="/StudentFromPage"
                        className="text-gray-400 hover:text-blue-600 transition-colors flex items-center"
                        title="Quay lại trang chủ"
                    >
                        <ArrowLeftOutlined />
                    </Link>
                    <span>Quản Lý Sinh Viên</span>
                </div>
                { }
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menu.map((item) => {
                            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path + '/') && item.path !== '/lesson4');
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`block px-4 py-2 rounded-md transition-colors ${isActive
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })
                        }
                    </ul>
                </nav>
                { }
                <div className="p-4 border-t flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white
                    flex items-center justify-center font-bold">
                        A
                    </div>
                    <div>
                        <p className="text-sm font-medium">Admin</p>
                        <p className="text-xs text-gray-500">admin@example.com</p>
                    </div>
                </div>
            </aside>
            { }
            <main className="flex-1 overflow-auto bg-gray-50">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
