const api = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');

api.get('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const file = fs.readFileSync('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const note = JSON.parse(data);
            writeToFile('./db/db.json', note);
        }
    })
    res.send(file)
});

api.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    console.log(`req is ${req}`);
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            review_id: uuid()
        };

        let notes = fs.readFileSync('../../db/db.json');

        notes = JSON.parse(notes);

        notes.push(newNote);

        const noteString = JSON.stringify(notes);

        fs.writeFile('../../db/db.json', noteString, (err) =>
            err ? console.error(err) : console.log('New note has been added.'));

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.send(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});

module.exports = api;