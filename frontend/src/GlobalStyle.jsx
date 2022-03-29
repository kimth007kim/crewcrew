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
    }

    body.Modal {
    height: 100vh;
    overflow: hidden;
    }

    em {
      font-style: normal;
    }
`;

export default GlobalStyle;
