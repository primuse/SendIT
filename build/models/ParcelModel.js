"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ParcelModel =
/*#__PURE__*/
function () {
  function ParcelModel(filepath) {
    _classCallCheck(this, ParcelModel);

    this.list = [];
    this.filepath = filepath;
  }

  _createClass(ParcelModel, [{
    key: "read",
    value: function read(callback) {
      _fs.default.readFile(this.filepath, callback);
    }
  }, {
    key: "write",
    value: function write(callback) {
      _fs.default.writeFile(this.filepath, JSON.stringify(this.list), callback);
    }
  }, {
    key: "createParcel",
    value: function createParcel(data) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var parcelID = data.parcelId;

        _this.populate().then(function () {
          var match = _this.list.find(function (e) {
            return +e.parcelId === +parcelID;
          });

          if (match) {
            reject();
            return;
          }

          _this.list.push(data);

          _fs.default.writeFile(_this.filepath, JSON.stringify(_this.list), resolve);
        }).catch(function (err) {
          console.log(err);
        });
      });
    }
  }, {
    key: "findParcel",
    value: function findParcel(id) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.read(function (err, buf) {
          _this2.list = JSON.parse(buf.toString());

          var parcel = _this2.list.find(function (e) {
            return +e.parcelId === +id;
          });

          if (parcel) {
            resolve(parcel);
          }

          var error = 'No parcel with given ID';
          reject(error);
        });
      });
    }
  }, {
    key: "findUserParcel",
    value: function findUserParcel(id) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var parcel = [];
        var userFound = false;

        _this3.read(function (err, buf) {
          _this3.list = JSON.parse(buf.toString());

          for (var i = 0; i < _this3.list.length; i += 1) {
            if (_this3.list[i].userId === id) {
              userFound = true;

              if ('name' in _this3.list[i]) {
                parcel.push(_this3.list[i]);
              }
            }
          }

          if (parcel.length > 0) {
            resolve(parcel);
          } else if (!userFound) {
            var error = 'No User with this ID';
            reject(error);
          } else {
            var _error = 'User with this ID has no parcel';
            reject(_error);
          }
        });
      });
    }
  }, {
    key: "updateParcel",
    value: function updateParcel(id, value) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.findParcel(id).then(function (parcel) {
          var foundParcel = parcel;
          var newParcel = Object.assign(foundParcel, value); // console.log(newParcel, this.list);

          _fs.default.writeFile(_this4.filepath, JSON.stringify(_this4.list), resolve);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: "cancelParcel",
    value: function cancelParcel(id) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.findParcel(id).then(function (parcel) {
          var myParcel = parcel;

          if (myParcel.status.toLowerCase() !== 'canceled') {
            myParcel.status = 'Canceled'; // console.log(parcel, this.list);

            _fs.default.writeFile(_this5.filepath, JSON.stringify(_this5.list), resolve);

            return;
          }

          var error = 'Already canceled parcel';
          reject(error);
        }).catch(function (error) {
          reject(error);
          console.log(error);
        });
      });
    }
  }, {
    key: "populate",
    value: function populate() {
      var _this6 = this;

      return new Promise(function (resolve) {
        _this6.read(function (err, buf) {
          _this6.list = JSON.parse(buf.toString());
          resolve();
        });
      });
    }
  }]);

  return ParcelModel;
}();

var _default = ParcelModel;
exports.default = _default;