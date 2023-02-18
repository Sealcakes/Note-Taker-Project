const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));