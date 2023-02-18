const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');



notes.get('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    
    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid()
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Tip added successfully`);
    } else {
        res.error('Error in adding tip');
    }
});

notes.delete('/', (req, res) => {
    console.info(`${req.method} request received for notes`)
});

module.exports = notes;