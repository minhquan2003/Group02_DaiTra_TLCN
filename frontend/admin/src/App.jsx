import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import AccountManage from "./pages/AccountManage";
import ProductManage from "./pages/ProductManage";
import FeedbackManage from "./pages/FeedbackManage";
import CategoryManage from "./pages/CategoryManage";
import NotificationManage from "./pages/NotificationManage";
import RegulationManage from "./pages/RegulationManage";

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
      <Route
        path="/admin/users"
        element={
          <AdminLayout>
            <AccountManage />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/posts"
        element={
          <AdminLayout>
            <ProductManage />
          </AdminLayout>
        }
      />
      <Route path="/admin/partner" element={<AdminLayout></AdminLayout>} />
      <Route
        path="/admin/feedbacks"
        element={
          <AdminLayout>
            <FeedbackManage />
          </AdminLayout>
        }
      />
      <Route path="/admin/feedbacks" element={<AdminLayout></AdminLayout>} />
      <Route
        path="/admin/category"
        element={
          <AdminLayout>
            <CategoryManage />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <AdminLayout>
            <NotificationManage />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/regulation"
        element={
          <AdminLayout>
            <RegulationManage />
          </AdminLayout>
        }
      />
    </Routes>
  </Router>
);

export default App;
