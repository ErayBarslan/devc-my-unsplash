const Model = require('./Model')
const mongoose = require('mongoose')

const getPhotos = async (req, res) => {
  const page = parseInt(req.query.page)
  const label = req.query.label
  const regex = new RegExp(label, 'i')

  if (label) {
    const photos = await Model.find({ label: { $regex: regex } }).skip(page * 10).limit(10).sort({ createdAt: -1 })
    res.status(200).json(photos)
  }
  else {
    const photos = await Model.find().skip(page * 10).limit(10).sort({ createdAt: -1 })
    res.status(200).json(photos)
  }
}

const addPhoto = async (req, res) => {
  const { label, url } = req.body

  if (!label || !url) {
    return res.status(500).json({ error: 'Please fill in both of the fields' })
  }

  try {
    const photo = await Model.create({ label, url })
    res.status(201).json(photo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deletePhoto = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: 'No photo to be deleted' })
  }

  const photo = await Model.findByIdAndDelete(req.params.id)

  if (!photo) {
    return res.status(404).json({ error: 'No photo to be deleted' })
  }

  res.status(200).json(photo)
}

module.exports = {
  getPhotos,
  addPhoto,
  deletePhoto
}