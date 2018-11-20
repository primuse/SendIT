CREATE TABLE IF NOT EXISTS userTable (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR (128) NOT NULL,
  lastName VARCHAR (128) NOT NULL,
  otherNames VARCHAR (128) NOT NULL,
  username VARCHAR (128) UNIQUE NOT NULL,
  email VARCHAR (355) UNIQUE NOT NULL,
  registered VARCHAR NOT NULL,
  isAdmin BOOLEAN NOT NULL,
  password VARCHAR (128) NOT NULL
);

CREATE TABLE IF NOT EXISTS parcelTable (
  id SERIAL PRIMARY KEY,
  parcelName VARCHAR (128) NOT NULL,
  placedBy INT NOT NULL,
  price FLOAT (11) NOT NULL,
  weight FLOAT (11) NOT NULL,
  metric VARCHAR (20) NOT NULL,
  pickupLocation VARCHAR (128) NOT NULL,
  destination VARCHAR (128) NOT NULL,
  status VARCHAR (128) NOT NULL,
  receiver VARCHAR (128) NOT NULL,
  email VARCHAR (355) NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  currentLocation VARCHAR (128) NOT NULL,
  sentOn VARCHAR NOT NULL,
  deliveredOn VARCHAR
);

INSERT INTO userTable (
  firstName, 
  lastName, 
  otherNames, 
  username, 
  email, 
  registered, 
  isAdmin, 
  password)
VALUES('Tiku', 'Okoye', 'Divine', 'primuse', 'tikuokoye@gmail.com', 'today', 'false', '$2b$08$LJXVbU8uAL9O38vu9dMSvOFyMrh1QeS3rIRnlFzyB.Z93pJchErO2')