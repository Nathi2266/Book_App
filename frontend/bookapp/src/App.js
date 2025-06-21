import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBook from './pages/AddBook';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Box minH="100vh">
        <Navigation />
        <Box as="main" p={4}>
          <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-book" element={<AddBook />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
