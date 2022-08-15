import express from 'express';

const app = express();

app.get('/d', (req, res) => {
    res.send('fw')
})

export { app };