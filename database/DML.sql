-- Project 6 Cosmic Horizons DML.SQL 
-- By Mark Trudel and Jenna Ligon

-- This file contains Database Manipulation Queries to implement all the required functions for
-- the website implementation.
-- A colon : character is used throughout to denote variables that will have data from the backend
-- programming language
-- -------------------------------------------------------------------------------------------------
-- Getting information to populate dropdown menus:
-- Getting customerID and name:
SELECT customerID, name FROM Customers; 

-- Getting rocketID and make + model:
SELECT rocketID, CONCAT(make, ' ', model) AS rocket FROM Rockets;

-- Getting tripID and destination:
SELECT tripID, destination FROM Trips;

-- Getting excursionID and description:
SELECT excursionID, description FROM Excursions;

-- Getting orderID, customerName, rocket make + model, and orderDate:
SELECT orderID, Customers.name AS name, CONCAT(Rockets.make, ' ', Rockets.model) AS rocket, 
orderDate FROM Orders
INNER JOIN Customers ON Orders.customerID = Customers.customerID
INNER JOIN Rockets ON Orders.rocketID = Rockets.rocketID
ORDER BY orderID; 

-- Getting ordersTripsID, tripDestination, customerName, and orderDate:
SELECT ordersTripsID, IFNULL(Trips.destination, "TRIP_DELETED") AS tripDestination, 
Customers.name AS name, Orders.orderDate FROM Orders_Trips
INNER JOIN Orders ON Orders_Trips.orderID = Orders.orderID
LEFT JOIN Customers ON Orders.customerID = Customers.customerID
LEFT JOIN Trips ON Orders_Trips.tripID = Trips.tripID
ORDER BY ordersTripsID;

-- -------------------------------------------------------------------------------------------------
-- Implementing all INSERT queries:
-- Add a new customer:
INSERT INTO Customers (name, email, phoneNum) 
VALUES 
(name = :nameInput, email = :emailInput, phoneNum = phoneNumInput);

-- Add a new rocket:
INSERT INTO Rockets (make, model, capacity, price, inventory, inventoryAvailable)
VALUES
(make = :makeInput, model = :modelInput, capacity = :capacityInput, price = :priceInput, 
inventory = :inventoryInput, inventoryAvailable = :inventoryAvailableInput);

-- Add a new trip:
INSERT INTO Trips (destination, durationDays, price)
VALUES
(destination = :destinationInput, durationDays = :durationInput, price = :priceInput);

-- Add a new excursion:
INSERT INTO Excursions (description, price, additionalDays)
VALUES
(description = :descriptionInput, price = :priceInput, additionalDays = :additionalDaysInput);

-- Add a new order:
INSERT INTO Orders (customerID, rocketID, priceRocketRented, excursionID, priceExcursionSold, 
orderDate, travelDays, totalPaid, orderStatus)
VALUES
(customerID = :customerID_fromDropdown, rocketID = :rocketID_fromDropdown, 
priceRocketRented = :priceRocketInput, excursionID = :excursionID_fromDropdown, 
priceExcursionSold = :priceExcursionInput, orderDate = :orderDateInput, 
travelDays = :travelDaysInput, totalPaid = :totalPaidInput, 
orderStatus = :orderStatus_fromDropdown);

-- Add a new orders_trips into intersection table)
INSERT INTO Orders_Trips (tripID, orderID, priceTripSold, departureDate, returnDate, totalGuests)
VALUES
(tripID = :tripID_fromDropdown, orderID = :orderID_fromDropdown, priceTripSold = :priceSoldInput, 
departureDate = :departureDateInput, returnDate = :returnDateInput, totalGuests = :totalGuestsInput);

-- -------------------------------------------------------------------------------------------------
-- SELECT Queries to populate Web pages
-- Customers page (with customerID, name, email, and phoneNum)
SELECT * FROM Customers;

-- Rockets page (with rocketID, make, model, capacity, price, inventory, and inventoryAvailable)
SELECT * FROM Rockets;

-- Trips page (with tripID, destination, durationDays, and price)
SELECT * FROM Trips;

-- Excursions page (with excursionID, description, price, and additionalDays)
SELECT * FROM Excursions;

-- Orders page (with orderID, customerName, Rocket_make+model, priceRocketRented, 
-- excursionDescription, priceExcursionSold, orderDate, travelDays, totalPaid, and
-- orderStatus)
SELECT orderID, Customers.name AS customerName, 
IFNULL(CONCAT(Rockets.make, ' ', Rockets.model), "ROCKET_DELETED") AS rocket, priceRocketRented, 
Excursions.description AS excursionDescription, priceExcursionsold, orderDate, travelDays, 
totalPaid, orderStatus FROM Orders
INNER JOIN Customers on Orders.customerID = Customers.customerID
LEFT JOIN Rockets on Orders.rocketID = Rockets.rocketID
LEFT JOIN Excursions on Orders.excursionID = Excursions.excursionID
ORDER BY orderID;

-- Orders_Trips page (with ordersTripsID, tripDestination, orderID, customerName,
-- priceTripSold, departureDate, returnDate, totalGuests)
SELECT ordersTripsID, IFNULL(Trips.destination, "TRIP_DELETED") as destination, Orders.orderID, 
Customers.name as customerName, priceTripSold, departureDate, returnDate, totalGuests 
FROM Orders_Trips
INNER JOIN Orders on Orders_Trips.orderID = Orders.orderID
INNER JOIN Customers on Orders.customerID = Customers.customerID
LEFT JOIN Trips on Orders_Trips.tripID = Trips.tripID
ORDER BY ordersTripsID;

-- -------------------------------------------------------------------------------------------------
-- DELETE Queries to remove data
-- DELETE Rocket
DELETE FROM Rockets WHERE rocketID = :rocketID_fromDropdown;

-- DELETE Trip
DELETE FROM Trips WHERE tripID = :tripID_fromDropdown;

-- DELETE Excursion
DELETE FROM Excursions WHERE excursionID = :excursionID_fromDropdown;

-- DELETE Orders_Trips
DELETE FROM Orders_Trips WHERE ordersTripsID = :ordersTripsID_fromDropdown;

-- -------------------------------------------------------------------------------------------------
-- SELECT Queries and UPDATE Queries
-- SELECT and UPDATE Customer
SELECT name, email, phoneNum FROM Customers WHERE customerID = :customerID_from_customer_selected;

UPDATE Customers SET name = :nameInput, email = :emailInput, phoneNum = :phoneNumInput WHERE
customerID = :customerID_from_customer_selected;

-- SELECT and UPDATE Rocket
SELECT make, model, capacity, price, inventory, inventoryAvailable FROM Rockets WHERE
rocketID = :rocketID_from_rocket_selected;

UPDATE Rockets SET make = :makeInput, model = :modelInput, model = :modelInput, 
capacity = :capacityInput, price = :priceInput, inventory = :inventoryInput, 
inventoryAvailable = :inventoryAvailableInput WHERE rocketID = :rocketID_from_rocket_selected;

-- SELECT and UPDATE Trip
SELECT destination, durationDays, price FROM Trips WHERE tripID = :tripID_from_trip_selected;

UPDATE Trips SET destination = :destinationInput, durationDays = :durationInput, 
price = :priceInput WHERE tripID = :tripID_from_trip_selected;

-- SELECT and UPDATE Excursion
SELECT description, price, additionalDays FROM Excursions 
WHERE excursionID = :excursionID_from_excursion_selected;

UPDATE Excursions SET description = :descriptionInput, price = :priceInput, 
additionalDays = :additionalDaysInput WHERE excursionID = :excursionID_from_excursion_selected;

-- SELECT and UPDATE Order
SELECT orderID, Customers.name AS customerName, 
IFNULL(CONCAT(Rockets.make, ' ', Rockets.model), "ROCKET_DELETED") AS rocket, priceRocketRented, 
Excursions.description AS excursionDescription, priceExcursionsold, orderDate, travelDays, 
totalPaid, orderStatus FROM Orders
INNER JOIN Customers on Orders.customerID = Customers.customerID
LEFT JOIN Rockets on Orders.rocketID = Rockets.rocketID
LEFT JOIN Excursions on Orders.excursionID = Excursions.excursionID
WHERE orderID = :orderID_from_order_selected;

UPDATE Orders SET customerID = :customerID_fromDropdown, rocketID = :rocketID_fromDropdown, 
priceRocketRented = :priceRocketInput, excursionID = :excursionID_fromDropdown, 
priceExcursionSold = :priceExcursionInput, orderDate = :orderDateInput, 
travelDays = :travelDaysInput, totalPaid = :totalPaidInput, 
orderStatus = :orderStatus_fromDropdown WHERE orderID = :orderID_from_order_selected;

-- SELECT and UPDATE Orders_Trips
SELECT ordersTripsID, IFNULL(Trips.destination, "TRIP_DELETED") as destination, Orders.orderID, 
Customers.name as customerName, priceTripSold, departureDate, returnDate, totalGuests 
FROM Orders_Trips
INNER JOIN Orders on Orders_Trips.orderID = Orders.orderID
INNER JOIN Customers on Orders.customerID = Customers.customerID
LEFT JOIN Trips on Orders_Trips.tripID = Trips.tripID
WHERE ordersTripsID = :ordersTripsID_from_ordersTrips_selected;

UPDATE Orders_Trips SET tripID = :tripID_fromDropdown, orderID = :orderID_fromDropdown, 
priceTripSold = :priceSoldInput, departureDate = :departureDateInput, returnDate = :returnDateInput,
totalGuests = :totalGuestsInput WHERE ordersTripsID = :ordersTripsID_from_ordersTrips_selected;
