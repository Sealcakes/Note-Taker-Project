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
                }
                
            })
            res.json(JSON.parse(data));
        }
    })
    

    

    
});

notes.delete('/:id', (req, res) => {
    const noteToDelete = req.params.id;
    console.log(noteToDelete);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        let result = parsedData.filter(obj => {
            return obj.id === noteToDelete;
        })
        console.log(result);
      }
    })
});

module.exports = notes;