import DB from './DB';

class ParcelModel {
  static async createParcel(data) {
    const result = DB.insert('parcel_table', Object.keys(data), Object.values(data));

    await result;
  }

  static async getAllParcels(params) {
    const findAllQuery = 'SELECT * FROM parcel_table';
    // if(params)
    const result = await DB.query(findAllQuery);
    const { rowCount, rows } = result;

    if (!rowCount) {
      throw Error('No Parcels');
    }
    return rows;
  }

  static async findParcel(id) {
    const queryText = 'SELECT * FROM parcel_table WHERE id = $1';
    const result = await DB.query(queryText, [id]);
    const { rowCount, rows } = result;

    if (!rowCount) {
      throw Error('No parcel with given ID');
    }
    return rows[0];
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
