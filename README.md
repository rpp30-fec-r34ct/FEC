[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# FEC
Front End Capstone Project


# Setup
1) In the terminal, run npm install to install all dependencies
2) Create a file called 'config.js' in this path ':PROJECT_FOLDER/SERVER/config.js
3) In the config.js file, enter the following:
  const API_KEY = '';
  module.exports.API_KEY = API_KEY;
4) Create a Github API token by following the steps below
  a) Go to: https://github.com/settings/tokens
  b) Click "Generate new token"
  c) Given the Token a Description ("Hack Reactor Capstone API", or whatever is most descriptive to you)
  d) Under Select Scopes, select the following: (You may select more for more features this API will offer in the future)
    i) read:org
    ii) user
    iii) read:user
    iv) user:email
    v) user:follow
    e) Generate Token. Note that this token is only viewable once, at generation time.
5) Copy the token to the config.js API_KEY variable. Save the file.
6) In the terminal, run 'npm run start' to start the server
7) In a separate terminal, run 'npm run react-dev' to start webpack
8) Open your browser and enter 'localhost:3000' into your search bar
9) The client index page will be served by the express server with initial data retrieved from the Atlier API.
