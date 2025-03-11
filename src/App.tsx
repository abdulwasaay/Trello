import { BrowserRouter } from 'react-router'
import './App.css'
import ErrorBoundary from './Components/ErrorPages/ErrorBoundary'
import RoutesLayout from './Routes/Layout'

function App() {

  return (
    <ErrorBoundary>
      <BrowserRouter basename='trello'>
        <RoutesLayout />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
