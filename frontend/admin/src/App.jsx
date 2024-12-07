import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      <Route path="/admin/users" element={<AdminLayout></AdminLayout>} />
      <Route path="/admin/posts" element={<AdminLayout></AdminLayout>} />
      <Route path="/admin/partner" element={<AdminLayout></AdminLayout>} />
      <Route path="/admin/feedbacks" element={<AdminLayout></AdminLayout>} />
      <Route path="/admin/feedbacks" element={<AdminLayout></AdminLayout>} />
      <Route path="/admin/category" element={<AdminLayout></AdminLayout>} />
      <Route
        path="/admin/notifications"
        element={<AdminLayout></AdminLayout>}
      />
      <Route path="/admin/regulation" element={<AdminLayout></AdminLayout>} />
    </Routes>
  </Router>
);

export default App;
