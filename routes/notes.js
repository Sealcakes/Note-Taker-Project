const notes = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


notes.get('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    
    readFileAsync('./db/db.json', 'utf8').then((data) => {
        note = [].concat(JSON.parse(data))
        res.json(note);
    })

    // let data = fs.readFileSync('./db/db.json', 'utf8');

    // res.json(JSON.parse(data));
});

notes.post('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    
    const newNote = req.body;
    readFileAsync('./db/db.json', 'utf8').then((data) => {
        const note = [].concat(JSON.parse(data));
        note.id = uniqid();
        note.push(newNote);
        return note;
    }).then((note) => {
        writeFileAsync('./db/db.json', JSON.stringify(note))
        res.json(note);
    })



    // const newNote = {
    //     ...req.body,
    //     note_id: uniqid()
    // };  
    

    // let data = fs.readFileSync('./db/db.json', 'utf-8');

    // const parsedData = JSON.parse(data);

    // parsedData.push(newNote);

    // fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err, text) => {
    //     if (err) {
    //         console.error(err)
    //         return;
    //     }
    //     console.log('Test', text);
    // })

    // res.json(data);
});

notes.delete('/:id', (req, res) => {
    const noteToDelete = req.params.id;
    console.log(noteToDelete);
    readFileAsync('./db/db.json', 'utf-8').then((data) => {
        const note = [].concat(JSON.parse(data));
        const newNotesData = [];
        for (let i = 0; i < note.length; i++) {
            if (noteToDelete !== note[i].id) {
                newNotesData.push(note[i])
            }
        }
        return newNotesData
    }).then((note) => {
        writeFileAsync('./db/db.json', JSON.stringify(note))
        res.send('Note saved successfully');
    })
});

module.exports = notes;