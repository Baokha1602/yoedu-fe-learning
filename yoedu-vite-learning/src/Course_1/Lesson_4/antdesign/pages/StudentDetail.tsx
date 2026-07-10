import { useParams, Link } from 'react-router-dom';

const StudentDetail = () => {
    const { id } = useParams();

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Chi tiết Học sinh</h1>
            <p className="text-gray-600 mb-4">Đang xem thông tin của học sinh có ID: <span className="font-semibold text-blue-600">{id}</span></p>
            <Link to="/Student" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Quay lại danh sách
            </Link>
        </div>
    );
};

export default StudentDetail;
