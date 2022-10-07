import React, { useState } from 'react'
import styled from 'styled-components'
import { usePhotoContext } from '../context/PhotoContext'

const AddPhoto = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const { dispatch } = usePhotoContext()
  const [label, setLabel] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    const photo = { label, url }

    const res = await fetch('/photos', {
      method: 'POST',
      body: JSON.stringify(photo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
    }
    else {
      setError(null)
      setLabel('')
      setUrl('')
      dispatch({ type: 'ADD_PHOTO', payload: data })
      setShowAddModal(false)
    }
  }

  return (
    <StyledAddPhoto>
      <button className='add-btn' onClick={() => setShowAddModal(true)}>Add a photo</button>
      {showAddModal && <>
        <div className='darken-bg' onClick={() => setShowAddModal(false)} />
        <form className='add-modal' onSubmit={submitHandler}>
          <h2>Add a new photo</h2>

          <label htmlFor="lbl">Label</label>
          <input
            type="text"
            id="lbl"
            placeholder='Mountain lake'
            onChange={(e) => setLabel(e.target.value)}
            value={label} />

          <label htmlFor="url">Photo URL</label>
          <input
            type="text"
            id="url"
            placeholder='https://images.unsplash.com/photo-mountain-lake.png'
            onChange={(e) => setUrl(e.target.value)}
            value={url} />

          <div className='btn-container'>
            <button type='button' className='cancel' onClick={() => setShowAddModal(false)}>Cancel</button>
            <button type='submit' className='submit'>Submit</button>
          </div>
          <p className={error ? 'error' : 'hide'}>{error}</p>
        </form>
      </>}
    </StyledAddPhoto>
  )
}

const StyledAddPhoto = styled.div`
  margin-left: auto;

.add-btn {
  border: none;
  background-color: #3DB46D;
  font-size: 16px;
  font-weight: 700;
  padding: 18px 20px;
  color: white;
  border-radius: 12px;
  cursor: pointer;
}

button:active {
  opacity: .8;
}

.add-modal {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 30%;
  z-index: 3;
  padding: 24px 32px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 600px;

  h2 {
    font-family: 'Noto Sans';
    font-weight: 500;
    font-size: 24px;
    color: #4F4F4F;
  }

  label {
    font-family: 'Noto Sans';
    font-weight: 500;
    font-size: 14px;
    color: #4F4F4F;
    margin-top: 19px;
  }

  input {
    padding: 17px 18px;
    border: 1px solid #4F4F4F;
    border-radius: 12px;
    font-family: 'Noto Sans';
    font-weight: 500;
    color: #4F4F4F;
    font-size: 14px;
    margin-top: 9px;
  }

  .btn-container {
    align-self: end;
    margin-top: 24px;
  }

  button {
    border: none;
    font-size: 16px;
    cursor: pointer;
  }

  .cancel {
    font-weight: 500;
    background-color: transparent;
    color: #BDBDBD;
    padding: 5px 5px;
    margin-right: 19px;
  }

  .submit {
    font-weight: 700;
    background-color: #3DB46D;
    color: white;
    padding: 18px 20px;
    border-radius: 12px;
  }

  .error {
    position: absolute;
    color: #ff0000d9;
    top: 73%;
  }

  .hide {
    display: none;
  }
}

.darken-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #00000040;
    z-index: 2;
}

@media screen and (max-width: 500px) {
    margin: 0 auto;
}
`

export default AddPhoto