import { createGlobalStyle } from "styled-components"

export const vars = {
  'blue': '#2F80ED',
  'btnRadius': '8px',
}

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
  font-family: 'Noto Sans';
  font-weight: 500;
  display: flex;
  justify-content: center;
}
`