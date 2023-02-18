const notes = require('express').Router();
const fs = require('fs');
const path = require('path');


notes.get('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            res.send(data);
        }
    })
});

notes.post('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    
});

notes.delete('/', (req, res) => {
    console.info(`${req.method} request received for notes`)
});

module.exports = notes;