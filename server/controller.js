const path = require('path')

let favClimbs = []
let globalId = 1

module.exports = {
    forum: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/index.html'))
    },
    
    jsFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/index.js'))
    },
    
    cssFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/styles.css'))
    },

    forumPost: (req, res) => {
        let { fName, lName, climbName, grade, location, forumImage, info } = req.body
        let newFavClimb = {
            id: globalId,
            fName,
            lName,
            climbName,
            grade,
            location,
            forumImage,
            info
        }
        favClimbs.push(newFavClimb)
        globalId++
        res.status(200).send(favClimbs)
    },

    deleteClimb: (req, res) => {
        let {id} = req.params
        for (let i = 0; i < favClimbs.length; i++) {
            if (+id === +favClimbs[i].id) {
                favClimbs.splice(i,1)
            }
        }
        res.status(200).send(favClimbs)
    },

    editClimb: (req, res) => {
        let {id} = req.params
        for (let i = 0; i < favClimbs.length; i++) {
            if (+id === +favClimbs[i].id) {
                favClimbs.splice(i,1)
            }
        }
        res.status(200).send(favClimbs)
    }
}