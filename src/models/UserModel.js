import DB from './DB';

class UserModel {
  static async createUser(data) {
    const result = DB.insert('user_table', Object.keys(data), Object.values(data));

    await result;
  }

  static async getAllUsers(params) {
    const findAllQuery = 'SELECT * FROM user_table';
    // if(params)
    const result = await DB.query(findAllQuery);
    const { rowCount, rows } = result;

    if (!rowCount) {
      throw Error('No Users');
    }
    return rows;
  }

  static async findUser(id) {
    const queryText = 'SELECT * FROM user_table WHERE id = $1';
    const result = await DB.query(queryText, [id]);
    const { rowCount, rows } = result;

    if (!rowCount) {
      throw Error('No user with given ID');
    }
    return rows[0];
  }

  static async findUserParcel(id) {
    const queryText = 'SELECT * FROM parcel_table WHERE user_id = $1';
    const result = await DB.query(queryText, [id]);
    const { rowCount, rows } = result;

    if (!rowCount) {
      throw Error('No parcel found');
    }
    return rows;
  }

  static async updateParcel(parcelId, value) {
    const queryText = 'SELECT * FROM parcel_table WHERE id = $1';
    const updateParcel = 'UPDATE parcel_table SET destination=$1';

    try {
      const result = await DB.query(queryText, [parcelId]);
      const { rowCount } = result;
      if (!rowCount) {
        throw Error('No parcel found');
      }
      const item = [value.destination];
      await DB.query(updateParcel, item);
    } catch (err) {
      throw err;
    }
  }

  cancelParcel(id) {
    return new Promise((resolve, reject) => {
      this.findParcel(id).then((parcel) => {
        const myParcel = parcel;
        if (myParcel.status.toLowerCase() !== 'canceled') {
          myParcel.status = 'Canceled';
          // console.log(parcel, this.list);
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
}

export default UserModel;
