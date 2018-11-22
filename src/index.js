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
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from './helper/logger';
import parcelRoute from './routes/parcelRoute';
import userRoute from './routes/userRoute';
import '@babel/polyfill';


dotenv.config();

const app = express();
const port = process.env.PORT;

/**
 * support json encoded bodies
 * support encoded bodies
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', parcelRoute);
app.use('/api/v1', userRoute);

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
  logger.info(`Server started on PORT ${port}`);
});

export default server;
