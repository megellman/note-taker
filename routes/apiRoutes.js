const api = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid')

// Gets the db.json file and sends it to the client-side
api.get('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const file = fs.readFileSync('./db/db.json', 'utf8')
    res.send(file)
});

// Adds the new note to the array of objs of the db.json file and appends db.json file
api.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };

        let notes = fs.readFileSync('./db/db.json', 'utf8');

        notes = JSON.parse(notes);

        notes.push(newNote);

        const noteString = JSON.stringify(notes);

        fs.writeFile('./db/db.json', noteString, (err) =>
            err ? console.error(err) : console.log('New note has been added.'));

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});

// Finds array obj with matching id and creates a new array without that obj and writes that into the db.json file
api.delete('/notes/:id', (req, res) => {
    if (req.params.id) {
        console.info(`${req.method} request received to remove a note`);
        let notes = fs.readFileSync('./db/db.json', 'utf8');
        notes = JSON.parse(notes);
        const id = req.params.id;
        let noteString = notes.filter(note => note.id !== id)
        let newNoteString = JSON.stringify(noteString);
        console.log(noteString);
        const updatedVersion = fs.writeFile('./db/db.json', newNoteString, (err) =>
            err ? console.error(err) : console.log('Note has been removed.'));
        res.send(updatedVersion);
    } else {
        res.status(400).send('Note ID not provided');
    }
})

module.exports = api;