import React from 'react'
import styled from 'styled-components'

const Loading = () => {
  return (
    <LoadingContainer />
  )
}

const LoadingContainer = styled.div`
  margin: auto;
  border: 20px solid #EAF0F6;
  border-radius: 50%;
  border-top: 20px solid #0b158dc2;
  border-left: 20px solid #0b158dc2;
  width: 200px;
  height: 200px;
  animation: spinner .75s linear infinite;

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

export default Loading