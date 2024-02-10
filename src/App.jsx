/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import './App.css'
import ThemeBtn from './components/ThemeBtn'
import Uploder from './components/Uploder'

function App() {
  const storedThemeMode = localStorage.getItem('themeMode')
  const [themeMode, setThemeMode] = useState(storedThemeMode || 'light')
  const darkTheme = () => {
    setThemeMode('dark')
  }
  const lightTheme = () => {
    setThemeMode('light')
  }
  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light')
    document.querySelector('html').classList.add(themeMode)
    localStorage.setItem('themeMode', themeMode)
  }, [themeMode])

  return (
    <div className='main'>
      <div className='header'>
        <div>
          <img src="/logo.svg" alt="" />
        </div>
        <ThemeBtn darkTheme={darkTheme} lightTheme={lightTheme} themeMode={themeMode}/>
      </div>
      <div className='container'>
        <Uploder themeMode={themeMode} />
      </div>
    </div>
  )
}

export default App
