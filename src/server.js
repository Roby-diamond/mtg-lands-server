import "dotenv/config"
import bodyParser from "body-parser";
import express from "express";
import lands from "./database/lands.js";
import cors from 'cors';

const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.get('/lands', async (req, res) => {
    try {
        const result = await lands.query('SELECT * FROM lands');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/lands/:name', async (req, res) => {
    try {
        const name = req.params.name.replace(/-/g, ' ');
        const result = await lands.query(`SELECT * FROM lands WHERE name ILIKE $1`, [`%${name}%`]);
        console.log(name)
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message); 
    }
});

app.get('/lands/filter/:color', async (req, res) => {
    try {
        const color = req.params.color.replace(/-/g, ' ');
        const result = await lands.query(`SELECT * FROM lands WHERE color ILIKE $1`, [`%${color}%`]);
        console.log(color)
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message); 
    }
});
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))