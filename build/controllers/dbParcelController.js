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
    * @returns {obj}
    */
    value: function createParcels(req, res) {
      model.createParcel(req).then(function () {
        res.status(201).send({
          status: 201,
          data: [{
            message: 'Order Created'
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
    } // /**
    // * Handler Method to get all Parcel orders
    // * @method
    // * @param  {obj} req The HTTP request
    // * @param  {obj} res The HTTP response
    // * @returns {obj}
    // */
    // static getAllParcels(req, res) {
    //   model.read((err, buf) => {
    //     if (!err) {
    //       const parcels = JSON.parse(buf.toString());
    //       const { weight } = req.query;
    //       if (weight === undefined) {
    //         res.send({
    //           status: 200,
    //           data: [parcels],
    //         });
    //       } else {
    //         const filteredParcel = parcels.filter(item => item.weight === weight);
    //         if (filteredParcel.length > 0) {
    //           res.send({
    //             status: 200,
    //             data: [filteredParcel],
    //           });
    //         } else {
    //           res.status(404).send({
    //             status: 404,
    //             data: [{
    //               message: 'No parcel found',
    //             }],
    //           });
    //         }
    //       }
    //     }
    //   });
    // }
    // /**
    // * Hanlder Method to get a parcel order by ID
    // * @method
    // * @param  {obj} req The HTTP request
    // * @param  {obj} res The HTTP response
    // * @returns {obj}
    // */
    // static getParcel(req, res) {
    //   const id = req.params.parcelId;
    //   model.findParcel(id).then((parcel) => {
    //     res.send({
    //       status: 200,
    //       data: [parcel],
    //     });
    //   }).catch((error) => {
    //     res.status(404).send({
    //       status: 404,
    //       data: [{
    //         message: error,
    //       }],
    //     });
    //   });
    // }
    // /**
    // * Handler Method to update a parcel order
    // * @method
    // * @param  {obj} req The HTTP request
    // * @param  {obj} res The HTTP response
    // * @returns {obj}
    // */
    // static updateParcel(req, res) {
    //   const id = req.params.parcelId;
    //   const value = req.body;
    //   model.updateParcel(id, value).then(() => {
    //     res.send({
    //       status: 200,
    //       data: [{
    //         id,
    //         message: 'Sucessfully updated Parcel',
    //       }],
    //     });
    //   }).catch((error) => {
    //     res.status(400).send({
    //       status: 400,
    //       data: [{
    //         id,
    //         message: error,
    //       }],
    //     });
    //   });
    // }
    // /**
    // * Handler Method to cancel a parcel order
    // * @method
    // * @param  {obj} req The HTTP request
    // * @param  {obj} res The HTTP response
    // * @returns {obj}
    // */
    // static cancelParcel(req, res) {
    //   const id = req.params.parcelId;
    //   model.cancelParcel(id).then(() => {
    //     res.send({
    //       status: 200,
    //       data: [{
    //         id,
    //         message: 'Order Canceled',
    //       }],
    //     });
    //   }).catch((error) => {
    //     res.status(400).send({
    //       status: 400,
    //       data: [{
    //         message: error,
    //       }],
    //     });
    //   });
    // }

  }]);

  return Parcel;
}();

var _default = Parcel;
exports.default = _default;