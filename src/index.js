import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import parcelRoute from './routes/parcelRoute';
import { Server } from 'https';

const app = express();
const port = 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/api/v1', userRoute);
app.use('/api/v1', parcelRoute);

app.get('/', (req, res) => res.send('Welcome to SendIT!'));

const server = app.listen(port, () => {
  console.log('server started successfully!');
});

export default server;
