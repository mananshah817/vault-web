import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Banks from "./pages/Banks";
import Cards from "./pages/Cards";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/banks" element={
          <ProtectedRoute>
            <Layout><Banks /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/cards" element={
          <ProtectedRoute>
            <Layout><Cards /></Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
