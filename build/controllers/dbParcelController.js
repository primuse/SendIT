"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dbmodel = _interopRequireDefault(require("../models/dbmodel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var model = _dbmodel.default;
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
    */
    value: function createParcels(req, res) {
      var _req$body = req.body,
          parcelName = _req$body.parcelName,
          price = _req$body.price,
          weight = _req$body.weight,
          pickupLocation = _req$body.pickupLocation,
          destination = _req$body.destination,
          status = _req$body.status,
          receiver = _req$body.receiver,
          email = _req$body.email,
          phoneNumber = _req$body.phoneNumber,
          currentLocation = _req$body.currentLocation;
      var userId = req.decoded;
      model.createParcel(parcelName, price, weight, pickupLocation, destination, status, receiver, email, phoneNumber, currentLocation, userId).then(function (rows) {
        res.status(201).send({
          rows: rows
        });
      }).catch(function (error) {
        res.status(400).send({
          message: error
        });
      });
    }
    /**
    * Handler Method to get all Parcel orders
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "getAllParcels",
    value: function getAllParcels(req, res) {
      model.getAllParcels().then(function (rows) {
        res.send({
          data: rows
        });
      }).catch(function (error) {
        res.status(404).send(error);
      });
    }
    /**
    * Hanlder Method to get a parcel order by ID
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "getParcel",
    value: function getParcel(req, res) {
      var id = req.params.parcelId;
      var userId = req.decoded;
      model.findParcel(id, userId).then(function (parcel) {
        res.send({
          data: parcel
        });
      }).catch(function (error) {
        res.status(404).send(error);
      });
    }
    /**
    * Handler Method to cancel a parcel order
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "cancelParcel",
    value: function cancelParcel(req, res) {
      var id = req.params.parcelId;
      var userId = req.decoded;
      model.cancelParcel(id, userId).then(function () {
        res.send({
          data: {
            id: id,
            message: 'Order Canceled'
          }
        });
      }).catch(function (error) {
        res.status(400).send(error);
      });
    }
    /**
    * Handler Method to update a parcel order destination
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "updateParcel",
    value: function updateParcel(req, res) {
      var id = req.params.parcelId;
      var value = req.body.destination;
      var userId = req.decoded;
      model.changeDestination(id, value, userId).then(function () {
        res.send({
          data: {
            id: id,
            message: 'Order updated'
          }
        });
      }).catch(function (error) {
        res.status(400).send(error);
      });
    }
    /**
    * Handler Method to change currentLocation of a parcel order
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "locationParcel",
    value: function locationParcel(req, res) {
      var id = req.params.parcelId;
      var value = req.body.currentLocation;
      model.changeLocation(id, value).then(function () {
        res.send({
          data: {
            id: id,
            message: 'Location updated'
          }
        });
      }).catch(function (error) {
        res.status(400).send(error);
      });
    }
    /**
    * Handler Method to change status of a parcel order
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "statusParcel",
    value: function statusParcel(req, res) {
      var id = req.params.parcelId;
      var value = req.body.status;
      model.changeStatus(id, value).then(function () {
        res.send({
          data: {
            id: id,
            message: 'Status updated'
          }
        });
      }).catch(function (error) {
        res.status(400).send(error);
      });
    }
  }]);

  return Parcel;
}();

var _default = Parcel;
exports.default = _default;