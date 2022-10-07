import React, { useState } from 'react'
import styled from 'styled-components'
import { usePhotoContext } from '../context/PhotoContext'

const DeleteModal = ({ setShowDeleteModal, photo }) => {
  const { dispatch } = usePhotoContext()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password === process.env.DEL_PASS) {
      const res = await fetch('/photos/delete/'+photo._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()

      if (res.ok) {
        setError(null)
        setPassword('')
        dispatch({ type: 'DELETE_PHOTO', payload: data })
        setShowDeleteModal(false)
      }
      else {
        setError(data.error)
      }
    }
    else {
      setError("Password is incorrect")
    }
  }

  return (
    <DeleteModalContainer>
      {<>
        <div className='darken-bg' onClick={() => setShowDeleteModal(false)} />
        <form className='delete-modal' onSubmit={submitHandler}>
          <h2>Are you sure?</h2>

          <label htmlFor="pass">Password</label>
          <input
            type="text"
            id="pass"
            placeholder='*****'
            onChange={(e) => setPassword(e.target.value)}
            value={password} />

          <div className='btn-container'>
            <button type='button' className='cancel' onClick={() => setShowDeleteModal(false)}>Cancel</button>
            <button type='submit' className='submit'>Delete</button>
          </div>
          <p className={error ? 'error' : 'hide'}>{error}</p>
        </form>
      </>}
    </DeleteModalContainer>
  )
}

const DeleteModalContainer = styled.div`

.delete-modal {
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

  button:active {
    opacity: .8;
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
    background-color: #EB5757;
    color: white;
    padding: 18px 20px;
    border-radius: 12px;
  }

  .error {
    position: absolute;
    color: #ff0000d9;
    top: 63%;
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
`

export default DeleteModal