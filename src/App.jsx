import './App.css'
import { TestCasesProvider } from './context/TestCasesContext'
import { ThemeProvider } from './context/ThemeContext'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <ThemeProvider>
      <TestCasesProvider> 
        <AppRouter />
      </TestCasesProvider>
    </ThemeProvider>
  )
}

export default App
