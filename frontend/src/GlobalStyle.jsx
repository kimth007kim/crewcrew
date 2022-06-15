import { createGlobalStyle } from 'styled-components';

import './assets/styles/fonts.css';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  * {
    scroll-behavior: smooth;
}

    * {
    margin: 0;
    padding: 0;
    font-family: 'SUIT', 'sans-serif';
    }

    ul {
    list-style-type: none;
    }

    a {
    text-decoration: none;
    }

    body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: auto;
      overflow-y: overlay;
    }

    body.Modal {
    height: 100vh;
    overflow: hidden;
    }

    em {
      font-style: normal;
    }

    #modal-root {
      z-index: 1200;
    }

    ::-webkit-scrollbar {
      width: 10px;
      z-index: 9;
    }

    ::-webkit-scrollbar-thumb {
      width: 100%;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.5);
    }

    ::-webkit-scrollbar-track {
      width: 100%;
      background-color: transparent;
    }
`;

export default GlobalStyle;
