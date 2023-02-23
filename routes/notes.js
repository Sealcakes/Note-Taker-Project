const notes = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid');




notes.get('/', (req,res) => {
    console.info(`${req.method} request received for notes`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
        }
    });

});

notes.post('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uniqid()
    };  
    

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err, text) => {
                if (err) {
                    console.error(err)
                    return;
                }
                console.log('Test', text);
            })
        }
    })
    

    

    res.json(data);
});

notes.delete('/:id', (req, res) => {
    const noteToDelete = req.params.id;
    console.log(typeof noteToDelete);

    function deleteNote(id) {
        if (id === noteToDelete) {
            return false;
        } 
    }

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const newNotes = data.filter(deleteNote);
        return newNotes;
      }
    })
});

module.exports = notes;