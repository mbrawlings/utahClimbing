const path = require('path')

let favClimbs = []
let globalId = 1

module.exports = {
    forum: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/index.html'))
    },

    bouldering: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/bouldering.html'))
    },

    sport: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/sport.html'))
    },

    indoor: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/indoor.html'))
    },

    shops: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/shops.html'))
    },

    guides: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/guides.html'))
    },
    
    jsFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/index.js'))
    },
    
    cssFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/styles.css'))
    },

    forumPost: (req, res) => {
        let { fName, lName, climbName, grade, location, forumImage, info } = req.body
        // if (fName === '') {
        //     res.status(400).send(error)
        // } else if (lName === '') {
        //     res.status(400).send(error)
        // } else if (climbName === '') {
        //     res.status(400).send(error)
        // } else if (location === '') {
        //     res.status(400).send(error)
        // } else if (forumImage === '') {
        //     res.status(400).send(error)
        // } else if (info === '') {
        //     res.status(400).send(error)
        // }
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
        let {id} = req.query
        for (let i = 0; i < favClimbs.length; i++) {
            if (+id === +favClimbs[i].id) {
                res.status(200).send(favClimbs[i])
            }
        }
    },

    submitEdits: (req, res) => {
        let {id} = req.params
        let { fName, lName, climbName, grade, location, forumImage, info } = req.body
        for (let i = 0; i < favClimbs.length; i++) {
            if (+id === +favClimbs[i].id) {
                favClimbs[i].fName = fName
                favClimbs[i].lName = lName
                favClimbs[i].climbName = climbName
                favClimbs[i].grade = grade
                favClimbs[i].location = location
                favClimbs[i].forumImage = forumImage
                favClimbs[i].info = info
            }
        }
        res.status(200).send(favClimbs)
    }
}