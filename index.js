const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')

const PORT = 3000;
const api = require('./routes/api');
const app = express();
app.use(cors())

app.use(bodyParser.json());


app.use('/api', api);

app.get('/', (req, res) => {
    console.log('Bonjour');
    res.send('Bonjour, je suis le serveur');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})