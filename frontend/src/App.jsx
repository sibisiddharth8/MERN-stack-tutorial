import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';

// components
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Create" element={<CreatePage />} />
      </Routes>
    </Box>
  )
}

export default App;