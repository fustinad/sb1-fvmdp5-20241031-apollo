import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { Dashboard } from './pages/Dashboard';
import { Dashboard1 } from './pages/Dashboard1';
import { Dashboard2 } from './pages/Dashboard2';
import { Dashboard3 } from './pages/Dashboard3';
import { FileManagement } from './pages/FileManagement';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dash1" element={<Dashboard1 />} />
          <Route path="dash2" element={<Dashboard2 />} />
          <Route path="dash3" element={<Dashboard3 />} />
          <Route path="files" element={<FileManagement />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}