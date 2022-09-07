const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()
const { PORT } = process.env

app.use(express.json())
app.use(cors())

const { forum, jsFile, cssFile, forumPost, deleteClimb, editClimb, submitEdits } = require('./controller.js')

app.get('/forum', forum)
app.get('/js', jsFile)
app.get('/css', cssFile)
app.post('/forumPost', forumPost)
app.delete('/deleteClimb/:id', deleteClimb)
app.get('/editClimb', editClimb)
app.put('/submitEdits/:id', submitEdits)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))