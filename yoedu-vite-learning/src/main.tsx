import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/index.css";
import MainLayout from "./MainLayout";
import Counter from "./Course_1/Lesson_1/basic-state/Counter/Counter";
import ToggleButton from "./Course_1/Lesson_1/basic-state/ToggleButton/ToggleButton";
import InputReview from "./Course_1/Lesson_1/basic-state/InputReview/InputReview";
import Student from "./Course_1/Lesson_1/exercises/Students/Student";
import ToDoList from "./Course_1/Lesson_1/exercises/ToDoList/ToDoList";
import ShoppingCart from "./Course_1/Lesson_1/exercises/Cart/CartList";
import StudentFormPage from "./Course_1/Lesson_3/tailwind/pages/StudentFormPage";
import UserPage from "./Course_1/Lesson_2/tailwind-layout/UserPage";
import Approuter from "./Course_1/Lesson_4/Routers";
import MiniShopPage from "./Course_1/Lesson_5/product-card-usecontext/pages/MiniShopPage";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      {/* Route cha */}
      <Route path="/" element={<MainLayout />}>
        {/* Các Route con sẽ hiện vào vị trí <Outlet /> */}
        <Route path="counter" element={<Counter />} />
        <Route path="toggle" element={<ToggleButton />} />
        <Route path="input" element={<InputReview />} />
        <Route path="student" element={<Student />} />
        <Route path="todo" element={<ToDoList />} />
        <Route path="cart" element={<ShoppingCart />} />
        <Route path="UserPage" element={<UserPage />} />
        <Route path="StudentFromPage" element={<StudentFormPage />} />
        <Route path="lesson5" element={<MiniShopPage />} />
      </Route>
      <Route path="lesson4/*" element={<Approuter />} />
    </Routes>
  </BrowserRouter>,
);
