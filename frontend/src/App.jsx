import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import NovaIdeia from './pages/NovaIdeia';
import EditarIdeia from './pages/EditarIdeia';
import Header from './components/Header.jsx';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/nova-ideia" element={<NovaIdeia />} />
        <Route path="/editar-ideia/:id" element={<EditarIdeia />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App