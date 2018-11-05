import fs from 'fs';

class ParcelModel {
  constructor(filepath) {
    this.list = [];
    this.filepath = filepath;
  }

  read(callback) {
    fs.readFile(this.filepath, callback);
  }

  write(callback) {
    fs.writeFile(this.filepath, JSON.stringify(this.list), callback);
  }

  createParcel(data) {
    return new Promise((resolve, reject) => {
      const parcelID = data.parcelId;
      this.populate().then(() => {
        const match = this.list.find(e => +e.parcelId === +parcelID);
        if (match) {
          reject(match);
          return;
        }
        this.list.push(data);
        fs.writeFile(this.filepath, JSON.stringify(this.list), resolve);
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  findParcel(id) {
    return new Promise((resolve, reject) => {
      this.read((err, buf) => {
        this.list = JSON.parse(buf.toString());
        const parcel = this.list.find(e => +e.parcelId === +id);
        if (parcel) {
          resolve(parcel);
        }
        const error = `No parcel with ID ${id}`;
        reject(error);
      });
    });
  }

  findUserParcel(id) {
    return new Promise((resolve, reject) => {
      const parcel = [];
      let userFound = false;
      this.read((err, buf) => {
        this.list = JSON.parse(buf.toString());
        for (let i = 0; i < this.list.length; i += 1) {
          if (this.list[i].userId === id) {
            userFound = true;
            console.log(userFound);
            if ('name' in this.list[i]) {
              console.log('tiku');
              parcel.push(this.list[i]);
            }
          }
        }
        if (parcel.length > 0) {
          resolve(parcel);
        } else if (!userFound) {
          const error = Error(`No User with ID ${id}`);
          reject(error);
        } else {
          const error = Error(`User with ID ${id} has no parcel`);
          reject(error);
        }
      });
    });
  }

  updateParcel(id, value) {
    return new Promise((resolve, reject) => {
      this.findParcel(id).then((parcel) => {
        const foundParcel = parcel;
        const newParcel = Object.assign(foundParcel, value);
        console.log(newParcel, this.list);
        fs.writeFile(this.filepath, JSON.stringify(this.list), resolve);
      }).catch((error) => {
        reject(error);
        console.log(error);
      });
    });
  }

  cancelParcel(id) {
    return new Promise((resolve, reject) => {
      this.findParcel(id).then((parcel) => {
        const myParcel = parcel;
        if (myParcel.status.toLowerCase() !== 'canceled') {
          myParcel.status = 'Canceled';
          console.log(parcel, this.list);
          fs.writeFile(this.filepath, JSON.stringify(this.list), resolve);
          return;
        }
        const error = 'Already canceled parcel';
        reject(error);
      }).catch((error) => {
        reject(error);
        console.log(error);
      });
    });
  }

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
