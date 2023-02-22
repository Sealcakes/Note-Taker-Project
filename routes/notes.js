const notes = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid');




notes.get('/', (req,res) => {
    console.info(`${req.method} request received for notes`);

    let data = fs.readFileSync('./db/db.json', 'utf8');

    res.json(JSON.parse(data));
});

notes.post('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uniqid()
    };  
    

    let data = fs.readFileSync('./db/db.json', 'utf-8');

    const parsedData = JSON.parse(data);

    parsedData.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err, text) => {
        if (err) {
            console.error(err)
            return;
        }
        console.log('Test', text);
    })

    res.json(data);
});

notes.delete('/:id', (req, res) => {
    const noteToDelete = req.params.id;
    console.log(noteToDelete);
    // readFileAsync('./db/db.json', 'utf-8').then((data) => {
    //     const note = [].concat(JSON.parse(data));
    //     const newNotesData = [];
    //     for (let i = 0; i < note.length; i++) {
    //         if (noteToDelete !== note[i].id) {
    //             newNotesData.push(note[i])
    //         }
    //     }
    //     return newNotesData
    // }).then((note) => {
    //     writeFileAsync('./db/db.json', JSON.stringify(note))
    //     res.send('Note saved successfully');
    // })
});

module.exports = notes;