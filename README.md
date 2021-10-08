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
6) This project requires the use of an s3 bucket to store photos uploaded from the client. If you do not have an AWS account, create one. otherwise, login to your AWS account. Create a new s3 bucket by following this procedure: https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html. When the access keys appear, add then into your config.js file using the following names:
    i) AWS_BUCKET_NAME
    ii) AWS_BUCKET_REGION
    iii) AWS_ACCESS_KEY
    iv) AWS_SECRET_KEY
7) Once the bucket is created and you have your keys stored in config.js, click on 'permissions'. Uncheck the 'Block all public access' box.
8) Scroll down to bucket policy and select 'edit'.
9) Select 'Policy generator'
10) Enter the following:
    i) Select Policy Type: S3 Bucket
    ii) Effect: Allow
    iii) Principal: *
    iv) AWS Service: amazon S3
    v) Actions: GetObject
    vi) Amazon Resoure Name: *copy the ARN of your S3 bucket found on the homepage of the s3 bucket)
    vii) Click Add statement
    viii) Copy the resulting JSON policy
    ix) Paste the policy into your buckets policy (bucket homepage -> edit policy -> paste into JSON field)
    x) save the changes
11) The s3 bucket is now configured for public read access, and your server will be able to write new objects to the S3 bucket with the keys stored in config.js.
12) In the terminal, run 'npm run start' to start the server
13) In a separate terminal, run 'npm run react-dev' to start webpack
14) Open your browser and enter 'localhost:3000/47421' into your search bar
15) The client index page will be served by the express server with initial data retrieved from the Atlier API.

# Development Tools
React 17.0.2
webpack.config + webpack-cli
 - style-loader
 - css loader
 -babel
multer
compression
axios
aws-sdk
“react-inner-image-zoom”
“react-router”
“styled-components”
“jest”
