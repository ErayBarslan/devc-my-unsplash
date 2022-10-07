import React, { useState } from 'react'
import styled from 'styled-components'
import Masonry from 'react-masonry-css'
import { usePhotoContext } from '../context/PhotoContext'
import DeleteModal from './DeleteModal'
import Loading from './Loading'

const Main = () => {
  const { photos, loading } = usePhotoContext()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [photo, setPhoto] = useState({})

  const breakpointColumnsObj = {
    default: 3,
    800: 2,
    500: 1
  }

  return (
    <MainContainer>
      {
        loading && <Loading />
      }
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column">
        {
          photos?.map(photo => {
            return <div className='img-container' key={photo._id}>
              <button onClick={() => {
                setShowDeleteModal(true)
                setPhoto(photo)
              }}>delete</button>
              <p>{photo.label}</p>
              <img src={photo.url} alt={photo.label} />
            </div>
          })
        }
      </Masonry>
      {showDeleteModal && <DeleteModal setShowDeleteModal={setShowDeleteModal}
        photo={photo} />}
    </MainContainer>
  )
}

const MainContainer = styled.main`
margin-top: 75px;

.masonry-grid {
  display: flex;
  gap: 46px;
  width: auto;
}

.masonry-grid_column {
  background-clip: padding-box;
}

.masonry-grid_column > .img-container {
  margin-bottom: 46px;
  border-radius: 16px;
  width: 100%;
  display: inline-block;
  background: grey;
  position: relative;
  min-height: 75px;

  img {
    display: block;
    width: 100%;
    border-radius: 16px;
  }

  button {
    position: absolute;
    right: 18px;
    top: 18px;
    font-family: 'Montserrat';
    font-weight: 500;
    font-size: 10px;
    background: transparent;
    border: 1px solid rgba(235, 87, 87, 1);
    color: rgba(235, 87, 87, 1);
    border-radius: 38px;
    padding: 5px 15px;
    visibility: hidden;
    cursor: pointer;
    z-index: 1;
  }

  button:active {
    opacity: .8;
  }

  p {
    position: absolute;
    left: 18px;
    bottom: 18px;
    color: white;
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 18px;
    visibility: hidden;
    z-index: 1;
  }

  p:first-letter {
    text-transform: uppercase;
  }
}

.img-container:hover > p{
  visibility: visible;
}

.img-container:hover > button{
  visibility: visible;
}

.img-container:hover > img{
    filter: brightness(60%);
}
`

export default Main