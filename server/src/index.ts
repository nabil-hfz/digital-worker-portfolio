
import { HttpServer } from "./controllers";
import { CONTROLLERS } from "./controllers/controllers";
import cors from "cors";
import { log } from "./utils/logger";
import bodyParser from "body-parser";
import timeout from "connect-timeout";
import express from 'express';

import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/portoflio', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
  autoCreate: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});


const app = express();


app.use(timeout(1000 * 60 * 3))

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

const maxFileSize = 1024 * 1024 * 1024 * 5;
app.use(bodyParser.json({ limit: maxFileSize }))
app.use(bodyParser.urlencoded({ limit: maxFileSize, extended: true, parameterLimit: maxFileSize }))

app.use('/uploads', express.static('uploads'));

const httpServer = new HttpServer(app);

CONTROLLERS.forEach((controller) => {
  controller.initialize(httpServer);
});

app.get('/', (req, res) => {
  res.status(200).send('Hellow world!');
});

app.get('/health', (req, res) => {
  res.status(200).send('Health: OK');
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  log(`Server listening on port http://localhost:${PORT}...`);
});


