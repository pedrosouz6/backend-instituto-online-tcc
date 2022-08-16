import express from 'express';

const app = express();

app.get('/text', (req, res) => {
    res.send('test');
})

export { app };