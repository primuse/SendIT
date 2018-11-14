/**
* @fileOverview Model module for JSON data file.
*
* @exports ParcelModel
* @requires fs
*/

import fs from 'fs';

/**
* Creates a new Parcel Class.
* @class
  @classdesc Parcel class with handler methods
*/
class ParcelModel {
/**
 * @constructor
 * @param {string} filepath
 */
  constructor(filepath) {
    this.list = [];
    this.filepath = filepath;
  }

  /**
  * Method to read the JSON file
  * @method
  * @param {function} callback callback function
  */
  read(callback) {
    fs.readFile(this.filepath, callback);
  }

  /**
  * Method to write to the JSON file
  * @method
  * @param {function} callback callback function
  */
  write(callback) {
    fs.writeFile(this.filepath, JSON.stringify(this.list), callback);
  }

  /**
  * Method to create new Parcels in the JSON file
  * @method
  * @param {obj} data The POST body to write into the file
  */
  createParcel(data) {
    return new Promise((resolve, reject) => {
      const parcelID = data.parcelId;
      this.populate().then(() => {
        const match = this.list.find(parcel => +parcel.parcelId === +parcelID);
        if (match) {
          reject();
          return;
        }
        this.list.push(data);
        fs.writeFile(this.filepath, JSON.stringify(this.list), resolve);
      }).catch((err) => {
      });
    });
  }

  /**
  * Method to find parcels in the JSON file with ID
  * @method
  * @param  {string} id The ParcelId passed through the HTTP request body
  * @returns {(obj|obj)} parcel or error message
  */
  findParcel(id) {
    return new Promise((resolve, reject) => {
      this.read((err, buf) => {
        this.list = JSON.parse(buf.toString());
        const parcel = this.list.find(item => +item.parcelId === +id);
        if (parcel) {
          resolve(parcel);
        }
        const error = 'No parcel with given ID';
        reject(error);
      });
    });
  }

  /**
  * Method to find parcels in the JSON file with UserID
  * @method
  * @param  {string} id The UserId passed through the HTTP request body
  * @returns {(obj|obj)} parcel or error message
  */
  findUserParcel(id) {
    return new Promise((resolve, reject) => {
      const parcel = [];
      let userFound = false;
      this.read((err, buf) => {
        this.list = JSON.parse(buf.toString());
        for (let i = 0; i < this.list.length; i += 1) {
          if (this.list[i].placedBy === id) {
            userFound = true;
            parcel.push(this.list[i]);
          }
        }
        if (parcel.length > 0) {
          resolve(parcel);
        } else if (!userFound) {
          const error = 'No User with this ID';
          reject(error);
        }
      });
    });
  }

  /**
  * Method to update parcel in the JSON file
  * @method
  * @param  {string} id The ParcelId passed through the HTTP request body
  * @param  {obj} value The updated data value
  */
  updateParcel(id, value) {
    return new Promise((resolve, reject) => {
      this.findParcel(id).then((parcel) => {
        const foundParcel = parcel;
        Object.assign(foundParcel, value);
        fs.writeFile(this.filepath, JSON.stringify(this.list), resolve);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Method to update parcel in the JSON file
  * @method
  * @param  {string} id The ParcelId passed through the HTTP request body
  * @returns {(obj|obj)} parcel or error message
  */
  cancelParcel(id) {
    return new Promise((resolve, reject) => {
      this.findParcel(id).then((parcel) => {
        const myParcel = parcel;
        if (myParcel.status.toLowerCase() !== 'canceled') {
          myParcel.status = 'Canceled';
          fs.writeFile(this.filepath, JSON.stringify(this.list), resolve);
          return;
        }
        const error = 'Already canceled parcel';
        reject(error);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Method to push the JSON file into this.list
  * @method
  * @returns {array} this.list
  */
  populate() {
    return new Promise((resolve) => {
      this.read((err, buf) => {
        this.list = JSON.parse(buf.toString());
        resolve();
      });
    });
  }
}

export default ParcelModel;
