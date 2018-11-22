import UserModel from '../models/usermodel';

const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');


dotenv.config();

/**
* @class
* @classdesc Notification class for email
*/
class Notification {
  /**
  * Handler Method to create new Parcels
  * @method
  * @param  {string} emailBody
  * @param  {string} userId
  * @param  {string} email
  * @returns {function}
  */
  static sendMail(emailBody, userId) {
    return new Promise((resolve, reject) => {
      UserModel.findUser(userId).then((user) => {
        const { email, firstname } = user[0];
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: email,
          from: 'Send-IT <primuse51@gmail.com>',
          subject: `Hi ${firstname}`,
          html: emailBody,
        };
        sgMail.send(msg);
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
export default Notification;
