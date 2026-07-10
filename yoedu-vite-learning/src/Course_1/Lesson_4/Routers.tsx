import {
    Routes,
    Route,
} from 'react-router-dom';
import MainLayout from './antdesign/components/MainLayout';
import Dashboard from './antdesign/pages/Dashboard';
import StudentAntd from './antdesign/pages/StudentAntd';
import CourseAntd from './antdesign/pages/CourseAntd';
import StudentDetail from './antdesign/pages/StudentDetail';
import StudentBase from './tailwind/pages/StudentBase';
import CourseBase from './tailwind/pages/CourseBase';



const Approuter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                
                <Route path="Student">
                    <Route index element={<StudentAntd />} />
                    <Route path=":id" element={<StudentDetail />} />
                </Route>
                
                <Route path="StudentTailwind">
                    <Route index element={<StudentBase />} />
                </Route>

                <Route path="Course" element={<CourseAntd />} />
                <Route path="CourseTailwind" element={<CourseBase />} />
            </Route>
        </Routes>
    );
}

export default Approuter;