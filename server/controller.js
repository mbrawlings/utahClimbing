const path = require('path')
require('dotenv').config()
const {DATABASE_URL} = process.env

const Sequelize = require('sequelize')
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

let favClimbs = []
let globalId = 1

module.exports = {
    forum: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/index.html'))
    },
    bouldering: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/bouldering/bouldering.html'))
    },
    boulderingCss: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/bouldering/bouldering.css'))
    },
    sport: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/sport/sport.html'))
    },
    sportCss: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/sport/sport.css'))
    },
    indoor: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/indoor/indoor.html'))
    },
    indoorCss: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/indoor/indoor.css'))
    },
    guides: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/guides/guides.html'))
    },
    guidesCss: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/guides/guides.css'))
    },
    jsFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/index.js'))
    },
    cssFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/styles.css'))
    },

    forumPost: (req, res) => {
        let { fName, lName, climbName, grade, location, forumImage, info } = req.body
        sequelize.query(`
        INSERT INTO user_climbs (first_name, last_name, climb_name, grade, location, image, info)
        VALUES ('${fName}', '${lName}', '${climbName}', '${grade}', '${location}', '${forumImage}', '${info}')
        `)
        .then(res.status(200))
        .catch(err => console.log('error creating fav climb', err))
    },

    getClimbs: (req, res) => {
        sequelize.query(`
        SELECT * FROM user_climbs;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error creating fav climb', err))
    },

    deleteClimb: (req, res) => {
        let {id} = req.params
        sequelize.query(`
        DELETE FROM user_climbs 
        WHERE id = ${id}
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error deleting fav climb', err))
    },

    editClimb: (req, res) => {
        let {id} = req.query
        sequelize.query(`
        SELECT * FROM user_climbs
        WHERE id = ${id}
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error deleting fav climb', err))
    },

    submitEdits: (req, res) => {
        let {id} = req.params
        let { fName, lName, climbName, grade, location, forumImage, info } = req.body
        sequelize.query(`
        UPDATE user_climbs
        SET first_name = '${fName}', 
            last_name = '${lName}', 
            climb_name = '${climbName}', 
            grade = '${grade}', 
            location = '${location}', 
            image = '${forumImage}', 
            info = '${info}'
        WHERE id = ${id};
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error deleting fav climb', err))
    }
}