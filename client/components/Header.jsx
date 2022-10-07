import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import AddPhoto from './AddPhoto'
import { usePhotoContext } from '../context/PhotoContext'

const Header = () => {
  const { page, setPage, query, setQuery, fetchPhotos } = usePhotoContext()

  const submitSearch = (e) => {
    e.preventDefault()
    if (!query) {
      setPage(0)
      return
    }
    if (page === 0) {
      fetchPhotos()
    }
    setPage(0)
  }

  return (
    <StyledHeader>
      <img src="/my_unsplash_logo.svg" alt="" />
      <div className='search-holder'>
        <AiOutlineSearch className='search-icon' size={21.5} />
        <form onSubmit={submitSearch}>
          <input type="text" placeholder="Search by label" onChange={(e) => {
            setQuery(e.target.value)
          }} value={query} />
        </form>
      </div>
      <AddPhoto />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
display: flex;
flex-wrap: wrap;
align-items: center;
margin-top: 32px;

.search-holder {
  border: 1px solid #BDBDBD;
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 16px 18px;
  width: 100%;
  max-width: 300px;
  margin-left: 50px;

  .search-icon {
    color: #BDBDBD;
  }

  input {
    border: none;
    outline: none;
    color: #6d6d6d;
    margin-left: 18px;
    font-size: 14px;
  }
}

@media screen and (max-width: 658px) {
    margin-bottom: -25px;
    row-gap: 20px;

    .search-holder {
      margin-left: 0;
    }

    img {
      padding-right: 200px;
    }
}

@media screen and (max-width: 500px) {
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: -35px;

  .search-holder {
    align-self: center;
  }

  img {
    padding-right: 0;
  }
}
`

export default Header