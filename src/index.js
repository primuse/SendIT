/**
* @fileOverview Server setup file
*
* @exports server
* @requires express
* @requires bodyParser
* @requires userRoute
* @requires parcelRoute
*/
import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import parcelRoute from './routes/parcelRoute';

const app = express();
let port = process.env.PORT;

/**
 * support json encoded bodies
 * support encoded bodies
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', userRoute);
app.use('/api/v1', parcelRoute);

/**
* Index Route
* @param  {string} route The index url route
* @param  {function}
* @returns {string} success message
*/
app.get('/', (req, res) => {
  res.send('Welcome to SendIT!');
});

if (port == null || port === '') {
  port = 3000;
}

const server = app.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});

export default server;
