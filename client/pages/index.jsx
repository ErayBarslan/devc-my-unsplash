import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Main from '../components/Main'
import { PhotoContextProvider } from '../context/PhotoContext'

export default function Home() {
  return (
    <PhotoContextProvider>
      <StyledContainer>
        <Header />
        <Main />
      </StyledContainer>
    </PhotoContextProvider>
  )
}

const StyledContainer = styled.div`
max-width: 1248px;
width: 95vw;
`