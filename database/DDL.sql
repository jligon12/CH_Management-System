-- Project 6 Cosmic Horizons DDL.SQL 
-- By Mark Trudel and Jenna Ligon

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Drop tables if they exist
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Rockets;
DROP TABLE IF EXISTS Excursions;
DROP TABLE IF EXISTS Trips;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Orders_Trips;


-- Creating all tables 
CREATE TABLE Customers (
	customerID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(145) NOT NULL,
    email VARCHAR(145) NOT NULL,
    phoneNum VARCHAR(20) NOT NULL,
    PRIMARY KEY (customerID)
);

CREATE TABLE Rockets (
	rocketID INT NOT NULL AUTO_INCREMENT,
    make VARCHAR(45) NOT NULL,
    model VARCHAR(45) NOT NULL,
    capacity INT NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    inventory INT,
    inventoryAvailable INT,
    PRIMARY KEY (rocketID)
);

CREATE TABLE Excursions (
	excursionID INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(145) NOT NULL,
    price DECIMAL(15, 2) NOT NULL, 
    additionalDays INT NOT NULL,
    PRIMARY KEY (excursionID)
);

CREATE TABLE Trips (
	tripID INT NOT NULL AUTO_INCREMENT,
    destination VARCHAR(145) NOT NULL,
    durationDays INT NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    PRIMARY KEY (tripID)
);

CREATE TABLE Orders (
	orderID INT NOT NULL AUTO_INCREMENT,
    customerID INT,
    rocketID INT,
    priceRocketRented DECIMAL(15, 2),
    excursionID INT,
    priceExcursionSold DECIMAL(15, 2),
    orderDate DATE,
    travelDays INT,
    totalPaid DECIMAL(30, 2),
    orderStatus ENUM('complete', 'inProgress', 'incomplete') DEFAULT 'incomplete',
    PRIMARY KEY (orderID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON UPDATE CASCADE,
    FOREIGN KEY (rocketID) REFERENCES Rockets(rocketID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (excursionID) REFERENCES Excursions(excursionID) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Orders_Trips (
	ordersTripsID INT NOT NULL AUTO_INCREMENT,
    tripID INT,
    orderID INT,
    priceTripSold DECIMAL(15, 2),
    departureDate DATE,
    returnDate DATE,
    totalGuests INT NOT NULL,
    PRIMARY KEY (ordersTripsID),
    FOREIGN KEY (tripID) REFERENCES Trips(tripID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID) ON UPDATE CASCADE
);

-- Insert sample data into each of the tables

INSERT INTO Customers (name, email, phoneNum) 
VALUES 
('John Doe', 'John.Doe@email.com', '123-456-7899'),
('Jane Doe', 'Jane.Doe@email.com', '987-654-3210'),
('Michael Brown', 'Mike.Brown@email.com','111-222-3333'),
('Tracy Johnson', 'Tracy.Json@email.com', '101-010-1010'),
('David Cruz', 'Dave.Cruz@email.com','999-888-7654');

INSERT INTO Rockets (make, model, capacity, price, inventory, inventoryAvailable)
VALUES
('SpaceY', 'Hawk 3', 10, 15000.00, 4, 2),
('SpaceY', 'Eagle 2', 5, 24000.00, 2, 2),
('Rocketeer', 'Photon', 8, 18000.00, 5, 4),
('Rocketeer', 'Neutron', 12, 32000.00, 3, 1),
('Atlas', 'Shepard', 5, 19000.00, 4, 4);

INSERT INTO Trips (destination, durationDays, price)
VALUES
('Venus', 5, 14000.00),
('Mars', 7, 12500.00),
('Jupiter', 7, 21000.00),
('Saturn', 6, 25000.00),
('Neptune', 10, 31000.00);

INSERT INTO Excursions (description, price, additionalDays)
VALUES
('Rover access to allow the customer and guests to roam the planet easier and quicker.', 5000.00, 0),
('Scenic detour to the asteroid belt.', 7500.00, 3),
('Scenic detour to the Andromeda galaxy.', 15000.00, 7);

INSERT INTO Orders (customerID, rocketID, priceRocketRented, excursionID, priceExcursionSold, orderDate, travelDays, totalPaid, orderStatus)
VALUES
(2, 3, 18000.00, NULL, NULL, 20240926, 12, 44500.00, 'complete'),
(4, 1, 15000.00, 3, 15000.00, 20240927, 17, 61000.00, 'complete'),
(2, 4, 32000.00, 1, 5000.00, 20241008, 18, 107000.00, 'inProgress'),
(5, 5, 19000.00, 2, 7500.00, 20241029, 9, 51500.00, 'incomplete');

INSERT INTO Orders_Trips (tripID, orderID, priceTripSold, departureDate, returnDate, totalGuests)
VALUES
(1, 1, 14000.00, 20241001, 20241006, 8),
(2, 1, 12500.00, 20241007, 20241014, 6),
(5, 2, 31000.00, 20241008, 20241018, 8),
(1, 3, 14000.00, 20241012, 20241017, 10),
(3, 3, 21000.00, 20241020, 20241027, 10),
(5, 3, 31000.00, 20241030, 20241109, 10),
(4, 4, 25000.00, 20241105, 20241111, 5); 

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

