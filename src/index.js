import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/userRoute';

const app = express();
const port = 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/api/v1', router);

app.listen(port, () => {
  console.log('server started successfully!');
});
