import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Banks from "./pages/Banks";
import Cards from "./pages/Cards";
import Layout from "./components/Layout";

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
    
        <Route path="/banks" element={<Layout><Banks /></Layout>} />
        <Route path="/cards" element={<Layout><Cards /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
