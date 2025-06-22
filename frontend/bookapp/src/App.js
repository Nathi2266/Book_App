import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBook from './pages/AddBook';
import Navigation from './components/Navigation';
import BookNotes from './pages/BookNotes';
import ExportPage from './pages/ExportPage';
import DailyQuote from './pages/DailyQuote';

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
            <Route path="/book/:id/notes" element={<BookNotes />} />
            <Route path="/export" element={<ExportPage />} />
            <Route path="/daily" element={<DailyQuote />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
