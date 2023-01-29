const api = require('express').Router();
const fs = require('fs');

api.get('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const file = fs.readFileSync('./db/db.json', 'utf8')
    res.send(file)
});

api.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
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

module.exports = api;