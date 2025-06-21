import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import './index.css';

// 1. Extend the theme to include custom values
const theme = extendTheme({
  colors: {
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
    },
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'brand.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
        transition: 'background-color 0.2s',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'lg',
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);