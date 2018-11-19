# Gas Station Finder
Gas station finder is a web application to find directions to the cheapest gas station within a given radius

# Running/Testing the Application
Since the application is not yet hosted on the web, it will be running locally. Follow the steps to run or test the application. If you would like to see a demo video of the running application click on the following link: https://youtu.be/AnYshnpfka0

### Cloning the repository
To clone the repository, run the following command from the terminal: $ git clone https://github.com/VikramGaru/GasStationFinder.git

Once you have the repository cloned: $ cd GasStationFinder

### Setting up the development environment
1) Check if you have npm already installed: $ npm -v
   - If not, please refer to https://nodejs.org/en
   - If you have it installed, you might want to update npm: $ npm install npm@latest -g

2) Check if you have Node.js installed: $ node -v
   - If not, please refer to https://nodejs.org/en

3) Installing Express: $ npm install express

4) Installing HTTP: $ npm install http-server -g

5) Installing Google Maps Client: $ npm install @google/maps

6) Run the following command which would create a file named package.json which will list all dependencies and some other matadata: $ npm init -y

### Setting up the testing environment
Ignore this step if you just want to run the application
1) Install mocha: $ npm install --save-dev mocha

2) Install chai: $ npm install --save-dev chai

3) Install chai-http: $ npm install --save-dev chai-http

4) Install chai-as-promised: $ npm install chai-as-promised

5) Make a setup so that running npm test will run our tests with mocha. For this open the file package.json and edit the value of: 
"scripts": {
    "test": "some data",
    "start": "node server.js"
  }
To the following:
"scripts": {
    "test": "mocha",
    "start": "node server.js"
  }

### Running the app
1) To run the application type the following command into your terminal: $ npm start

2) Then open your browser and go to the following address: http://localhost:8080

### Writing/Running tests
1) Tests are located in a directory called test. The directory has some predefined test cases, cd into the directory

2) You can write your tests in the directory or include more cases in the testServer.js file, after you are done writing tests use cd .. to get back to the root directory

3) Run the following command from the terminal once you are done writing tests: $ npm test
