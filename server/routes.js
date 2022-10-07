const express = require('express')
const router = express.Router()

const { getPhotos, addPhoto, deletePhoto } = require('./controllers')

router.get('/', getPhotos)

router.post('/', addPhoto)

router.delete('/delete/:id', deletePhoto)

module.exports = router