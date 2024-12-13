import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store, { persistor } from './Redux/store.ts'
import ModalContextProvider from './Contexts/ModalContext.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ModalContextProvider>
          <App />
          <ToastContainer />
        </ModalContextProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
