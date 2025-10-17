import { Routes, Route } from 'react-router-dom';
// Update these paths to point to the new Pages folder
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Home';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default App;