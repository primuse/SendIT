import fs, { promises } from 'fs';

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
        for (let i = 0; i < this.list.length; i += 1) {
          if (this.list[i].parcelId === id) {
            const parcel = this.list[i];
            resolve(parcel);
          }
        }
        reject();
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
        const error = Error('already canceled parcel');
        reject(error);
      }).catch((err) => {
        console.log(err);
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
  
  // updateParcel(id) {
  //   return new Promise((resolve, reject) => {
  //     this.cancelParcel(id).then(() => {
        
  //     }
  //   });
  // }
}

export default ParcelModel;
