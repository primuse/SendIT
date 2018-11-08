"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _ParcelModel = _interopRequireDefault(require("../models/ParcelModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var model = new _ParcelModel.default(_path.default.join(__dirname, '../files/parcels.json'));

var Parcel =
/*#__PURE__*/
function () {
  function Parcel() {
    _classCallCheck(this, Parcel);
  }

  _createClass(Parcel, null, [{
    key: "createParcels",
    // Create new Parcels
    value: function createParcels(req, res) {
      var myData = req.body;
      model.createParcel(myData).then(function () {
        res.status(201).send({
          message: 'Successfully Written to File.'
        });
      }).catch(function () {
        res.status(409).send({
          message: 'Parcel with this ID already exists'
        });
      });
    } // Get all Parcels

  }, {
    key: "getAllParcels",
    value: function getAllParcels(req, res) {
      model.read(function (err, buf) {
        if (!err) {
          var parcels = JSON.parse(buf.toString());
          var location = req.query.location;
          console.log(req.query);

          if (location === undefined) {
            res.send(parcels);
          } else {
            var filteredParcel = parcels.filter(function (e) {
              return e.location !== undefined && e.location.toLowerCase() === location.toLowerCase();
            });

            if (filteredParcel.length > 0) {
              res.send(filteredParcel);
            } else {
              res.status(404).send({
                message: 'No parcel found'
              });
            }
          }
        }
      });
    } // To get a parcel delivery order with ID

  }, {
    key: "getParcel",
    value: function getParcel(req, res) {
      var id = req.params.parcelId;
      model.findParcel(id).then(function (parcel) {
        res.send(parcel);
      }).catch(function (error) {
        console.log(error);
        res.status(404).send({
          message: error
        });
      });
    } // To update a parcel with ID

  }, {
    key: "updateParcel",
    value: function updateParcel(req, res) {
      var id = req.params.parcelId;
      var value = req.body;
      model.updateParcel(id, value).then(function () {
        res.send({
          message: 'Sucessfully updated Parcel'
        });
      }).catch(function (error) {
        res.status(409).send({
          message: error
        });
      });
    } // To cancel a parcel with ID

  }, {
    key: "cancelParcel",
    value: function cancelParcel(req, res) {
      var id = req.params.parcelId;
      model.cancelParcel(id).then(function () {
        res.send({
          message: 'Successfully canceled Parcel'
        });
      }).catch(function (error) {
        res.status(409).send({
          message: error
        });
      });
    }
  }]);

  return Parcel;
}();

var _default = Parcel;
exports.default = _default;