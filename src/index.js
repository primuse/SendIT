/**
* @fileOverview Server setup file
*
* @exports server
* @requires express
* @requires bodyParser
* @requires userRoute
* @requires parcelRoute
* @requires @babel/polyfill
* @requires dotenv
*/
import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import parcelRoute from './routes/parcelRoute';

dotenv.config();

const app = express();
const port = process.env.PORT;

/**
 * support json encoded bodies
 * support encoded bodies
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api/v1', userRoute);
app.use('/api/v1', parcelRoute);

/**
* Index Route
* @param  {string} route The index url route
* @param  {function}
* @returns {string} success message
*/
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to SendIT!',
  });
});

const server = app.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});

export default server;
