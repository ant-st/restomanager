# Yes, chef! / RestoManager App

This is a full stack app designed as a complex solution for managing the restaurant. It is written using JS, React, Redux, Node.JS, Express and SQLite3.

## Functionality

### Authentication and authorization
The first step needed to use the app is to log in. Authentication is made server-side, using database. There are three different authorization levels - regular user, manager and admin. 

### Tables
Once the access has been given, the user may enter the "Tables" screen and place order for the guest in the restaurant. One can select the dishes, as well as give notes to the kitchen. Once the order is submitted, it is sent to kitchen and gets "In preparation..." status. No sooner do they get informed the dish is ready than they can finalize the order and select payment method. Every order is labeled with current waiter in charge. Only managers can cancel orders.

### Delivery
The other page is "Deliveries", where the user may place an order as above, but there is also a form to fill up with address data. After submitting the order and the time is high, user can send selected orders to kitchen. Afterwards, they enter the driver's number and the order is finalized. Only managers can cancel orders. Moreover, there is a Google Map indicating, where is the given address.

### Kitchen
Another part of the app is designed for being displayed in the kitchen, where the staff receive new orders simultaneously with clear indication, which ones are meant for take away. Once they finish cooking, they can submit it in the app and waiters receive info, that their dish is ready.

### Menu editor
Available only for admins - here you can add new menu pages and positions and edit them. The data is stored in database.

### Sales history
Available only for admins and managers - here you can check out the sales history, including time of receiving the order and fulfilling it, who submitted the order and what was the payment method. Using filters you can easily calculate daily retail or how much every waiter earned.

### Settings
Available only for admins - you can change the company address here, as well as manage passwords and tables in restaurant.

## Colors, graphics, responsiveness

The logo and photos I have used had been created by me or taken from open-source databases. The app is suited for minimal width of 720px, as I have assumed it will be comfortable to be used only on tablets and desktop devices.

## Frameworks and APIs

The server runs on Node.js with Express application. Front-end is created purely with React and Redux (with Toolkit). There are a few reducers handling the state of the app. Database runs on SQLite3 and the whole API was written by me. The only third-party API used in the app is Google Maps, which shows on map where is the delivery address (in the future I plan to develop route guiding and calculating fuel costs).

### Check it out

Currently the website is not deployed, because of problems with setting up node server on firebase. However, I have recorded a sample, how the app works: https://www.youtube.com/watch?v=7S1CFsIokk0
