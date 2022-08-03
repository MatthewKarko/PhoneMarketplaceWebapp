# USYD phone marketplace project


## Setting up database

### Using MongoDBCompass
1. Launch MongoDBCompass
2. Connect to the url `mongodb://localhost/<Any port / that isnt used / default 27017>`
3. Create a database named Assignment2
4. Create a collection named `phoneList` and import the contents of the phone json
5. Create a collection named `userList` and import the contents of the user json
6. That is it!

### Using command line and Robo3t
1. Install mongodb and robo3t
2. Create a directory comp5347/mongodbon your local drive
3. Open a command window or power shell window and change to directory C:/Program Files/MongoDB/Server/3.4/bin
4. run the following command `mongod.exe --dbpath <Drivename>:/comp5347/mongodb --smallfiles`
5. Start robot3t and click `create` and rename the connection to a name if desired
6. Then you want to create a database called Assignment2
7. Then you can create the `collections / revisions` and import the phone json file and then the user json file as the names `phoneList` and `userList` respectively
8. Or you can do it through command line by navigating to C:/Program Files/MongoDB/Server/3.4/bin
9. And entering the command  mongoimport --jsonArray --db wikipedia --collection revisions --file <full-path-to-downloaded-revision-json-file>


## Install dependencies

Firstly, you're going to need Node installed. If you have Node installed, you already have npm.

To install dependencies, navigate into both the `client` and `server` directories and run `npm install`.

## Building and running
Setup 2 terminal windows, navigate one to the `client` directory and the other to the `server` directory.

After making changes to the React app, you'll have to rebuild the application bundle. You can do this in the `client` directory just by running `npm run build`.

In the `server` terminal, you can just run `npm start` to run the server.

# Contribution and Collaboration

Pull requests are welcome. However, pushing any commits must be first discussed with the group members. This is a private project, thus it is required to raise any concerns and/or opportunities with the team regarding the application. Once you have been granted approval for changes, be sure to update test cases appropriately.

Distribution and use of this project is strictly prohibited.
