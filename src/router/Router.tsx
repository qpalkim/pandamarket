import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ItemsPage from "../pages/ItemsPage/ItemsPage";
import BoardsPage from "../pages/BoardsPage/BoardsPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/boards" element={<BoardsPage />} />
    </Routes>
  )
}