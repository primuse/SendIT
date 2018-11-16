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
/**
* @class
* @classdesc Parcel class with handler methods
*/

var Parcel =
/*#__PURE__*/
function () {
  function Parcel() {
    _classCallCheck(this, Parcel);
  }

  _createClass(Parcel, null, [{
    key: "createParcels",

    /**
    * Handler Method to create new Parcels
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    * @returns {obj}
    */
    value: function createParcels(req, res) {
      var myData = req.body;
      var id = req.body.parcelId;
      model.createParcel(myData).then(function () {
        res.status(201).send({
          status: 201,
          data: [{
            id: id,
            message: 'Order Created'
          }]
        });
      }).catch(function () {
        res.status(400).send({
          status: 400,
          data: [{
            id: id,
            message: 'Parcel with this ID already exists'
          }]
        });
      });
    }
    /**
    * Handler Method to get all Parcel orders
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    * @returns {obj}
    */

  }, {
    key: "getAllParcels",
    value: function getAllParcels(req, res) {
      model.read(function (err, buf) {
        if (!err) {
          var parcels = JSON.parse(buf.toString());
          var weight = req.query.weight;

          if (weight === undefined) {
            res.send({
              status: 200,
              data: [parcels]
            });
          } else {
            var filteredParcel = parcels.filter(function (item) {
              return item.weight === weight;
            });

            if (filteredParcel.length > 0) {
              res.send({
                status: 200,
                data: [filteredParcel]
              });
            } else {
              res.status(404).send({
                status: 404,
                data: [{
                  message: 'No parcel found'
                }]
              });
            }
          }
        }
      });
    }
    /**
    * Hanlder Method to get a parcel order by ID
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    * @returns {obj}
    */

  }, {
    key: "getParcel",
    value: function getParcel(req, res) {
      var id = req.params.parcelId;
      model.findParcel(id).then(function (parcel) {
        res.send({
          status: 200,
          data: [parcel]
        });
      }).catch(function (error) {
        res.status(404).send({
          status: 404,
          data: [{
            message: error
          }]
        });
      });
    }
    /**
    * Handler Method to update a parcel order
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    * @returns {obj}
    */

  }, {
    key: "updateParcel",
    value: function updateParcel(req, res) {
      var id = req.params.parcelId;
      var value = req.body;
      model.updateParcel(id, value).then(function () {
        res.send({
          status: 200,
          data: [{
            id: id,
            message: 'Sucessfully updated Parcel'
          }]
        });
      }).catch(function (error) {
        res.status(400).send({
          status: 400,
          data: [{
            id: id,
            message: error
          }]
        });
      });
    }
    /**
    * Handler Method to cancel a parcel order
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    * @returns {obj}
    */

  }, {
    key: "cancelParcel",
    value: function cancelParcel(req, res) {
      var id = req.params.parcelId;
      model.cancelParcel(id).then(function () {
        res.send({
          status: 200,
          data: [{
            id: id,
            message: 'Order Canceled'
          }]
        });
      }).catch(function (error) {
        res.status(400).send({
          status: 400,
          data: [{
            message: error
          }]
        });
      });
    }
  }]);

  return Parcel;
}();

var _default = Parcel;
exports.default = _default;