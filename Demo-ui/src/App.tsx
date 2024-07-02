import { Layout } from './components/Layout';
import LoginForm from './components/Login';
import Dashboard from './components/Dashboard';
import UsersList from './pages/User/UserList';
import { Routes, Route } from 'react-router-dom'
 

function App() {
    return (
      <Routes>
        <Route path='/' index element={<LoginForm />}></Route>
        <Route path='/' element={<Layout />}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/manage-user' element={<UsersList />}></Route>
        </Route>
      </Routes>
    );
}
export default App;
