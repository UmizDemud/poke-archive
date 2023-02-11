import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './pages/Layout'
import { PokemonImages } from './pages/pokemon/Images/PokemonImages'
import { PokemonsList } from './pages/pokemon/PokemonList/PokemonsList'
import { PokemonPage } from './pages/pokemon/PokemonPage/PokemonPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path=":id?" element={<PokemonPage />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="images/:id?" element={<PokemonImages />} />
        <Route path="list" element={<PokemonsList defaultOffset={1} defaultLimit={20} />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  )
}

export default App
