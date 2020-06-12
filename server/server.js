const path = require('path');
const {createServer} = require('http');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname,'..', 'build');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

const server = createServer(app);
server.listen(port, () => {
   console.log('Server is up!');
});

