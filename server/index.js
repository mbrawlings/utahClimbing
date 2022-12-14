const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()
const { PORT } = process.env

app.use(express.json())
app.use(cors())

const { forum, bouldering, boulderingCss, sport, sportCss, indoor, indoorCss, guides, guidesCss, jsFile, cssFile, forumPost, getClimbs, deleteClimb, editClimb, submitEdits } = require('./controller.js')

app.get('/', forum)
app.get('/bouldering', bouldering)
app.get('/bouldering.css', boulderingCss)
app.get('/sport', sport)
app.get('/sport.css', sportCss)
app.get('/indoor', indoor)
app.get('/indoor.css', indoorCss)
app.get('/guides', guides)
app.get('/guides.css', guidesCss)
app.get('/js', jsFile)
app.get('/css', cssFile)
app.post('/forumPost', forumPost)
app.get('/getClimbs', getClimbs)
app.delete('/deleteClimb/:id', deleteClimb)
app.get('/editClimb', editClimb)
app.put('/submitEdits/:id', submitEdits)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))