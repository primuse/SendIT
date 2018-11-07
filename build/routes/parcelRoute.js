"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _ParcelModel = _interopRequireDefault(require("../models/ParcelModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var model = new _ParcelModel.default(_path.default.join(__dirname, '../files/parcels.json'));

var router = _express.default.Router(); // To create new parcels


router.post('/parcels', function (req, res) {
  var myData = req.body;
  model.createParcel(myData).then(function () {
    res.status(201).send('Successfully Written to File.');
  }).catch(function (match) {
    res.status(409).send({
      Error: "Parcel with ID ".concat(match.parcelId, " already exists")
    });
  });
}); // To get all parcel delivery orders

router.get('/parcels', function (req, res) {
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
            Error: 'No parcel found'
          });
        }
      }
    }
  });
}); // To get a parcel delivery order with ID

router.get('/parcels/:parcelId', function (req, res) {
  var id = req.params.parcelId;
  model.findParcel(id).then(function (parcel) {
    res.send(parcel);
  }).catch(function (error) {
    console.log(error);
    res.status(404).send({
      Error: error
    });
  });
}); // To update a parcel with ID

router.put('/parcels/:parcelId/update', function (req, res) {
  var id = req.params.parcelId;
  var value = req.body;
  model.updateParcel(id, value).then(function () {
    console.log('done');
    res.send("Sucessfully updated ".concat(Object.keys(value)));
  }).catch(function (error) {
    res.status(409).send({
      Error: error
    });
  });
}); // To cancel a Parcel with ID

router.put('/parcels/:parcelId/cancel', function (req, res) {
  var id = req.params.parcelId;
  model.cancelParcel(id).then(function () {
    res.send('successful');
  }).catch(function (error) {
    res.status(409).send({
      Error: error
    });
  });
}); // To get all parcels from User with ID

router.get('/users/:userId/parcels', function (req, res) {
  var id = req.params.userId;
  model.findUserParcel(id).then(function (parcel) {
    res.send({
      parcels: parcel
    });
  }).catch(function (error) {
    console.log(error);
    res.status(404).send({
      Error: error.message
    });
  });
});
var _default = router;
exports.default = _default;