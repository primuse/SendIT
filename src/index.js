import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import parcelRoute from './routes/parcelRoute';

const app = express();
let port = process.env.PORT;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/api/v1', userRoute);
app.use('/api/v1', parcelRoute);

if (port == null || port === '') {
  port = 3000;
}

const server = app.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});

export default server;
