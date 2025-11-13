import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Public_Pages/Home.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      
      <Home />
      <Header />
      <Footer />
    </div>
  )
}

export default App
