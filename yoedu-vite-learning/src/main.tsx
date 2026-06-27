import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/index.css";
import MainLayout from "./MainLayout";
import Counter from "./Course_1/Lesson_1/Counter/Counter";
import ToggleButton from "./Course_1/Lesson_1/ToggleButton/ToggleButton";
import InputReview from "./Course_1/Lesson_1/InputReview/InputReview";
import Student from "./Course_1/Lesson_1/Students/Student";
import ToDoList from "./Course_1/Lesson_1/ToDoList/ToDoList";
import ShoppingCart from "./Course_1/Lesson_1/Cart/CartList";

import UserPage from "./user-pages/UserPage";

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

      </Route>
    </Routes>
  </BrowserRouter>,
);
