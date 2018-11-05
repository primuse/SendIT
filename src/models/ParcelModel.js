import fs from 'fs';

class ParcelModel {
  constructor(filepath) {
    this.list = [];
    this.filepath = filepath;
  }

  read(callback) {
    fs.readFile(this.filepath, callback);
  }

  write(data, callback) {
    this.populate().then(() => {
      this.list.push(data);
      fs.writeFile(this.filepath, JSON.stringify(this.list), callback);
    }).catch((err) => {
      console.log(err);
    });
  }

  getParcel(id, callback) {
    this.findParcel(id, callback);
  }

  findParcel(id) {
    this.read((err, buf) => {
      this.list = JSON.parse(buf.toString());

      for (let i = 0; i < this.list.length; i += 1) {
        if (this.list[i].parcelId === id) {
          const parcel = this.list[i];
          console.log(parcel);
        }
      }
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
