// App.JSX
import './App.css'
import '@fontsource/poppins';
import Home from './pages/Home.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import {ToastContainer} from 'react-toastify'

import React, { useEffect } from 'react';
import ReactGA from 'react-ga4'; // Importa a biblioteca

// Substitua pelo seu ID de Métrica real do Google Analytics
const TRACKING_ID = "G-FJRVZV1HB4"; 
let contagemDebug = 0;

function App() {

   useEffect(() => {
      contagemDebug++;
    // Inicializa o Analytics apenas uma vez quando a página carrega
   //  ReactGA.initialize(TRACKING_ID);

    ReactGA.initialize(TRACKING_ID, {
    gaOptions: {
      send_page_view: false // Bloqueia o disparo fantasma na inicialização
    }
  });
    
    // Dispara a visualização da página
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    
    console.log(`O Analytics foi chamado pela ${contagemDebug}ª vez.`);
    console.log("Analytics disparado com sucesso!"); // Para confirmar no seu console
  }, []); // O array vazio garante que rode apenas uma vez

return (
   <>
      <Header />
      <Home />
      <Footer />
      <ToastContainer position='top-right' autoClose={4500} hideProgressBar={false} theme='light'/>
   </>
)
}

export default App
