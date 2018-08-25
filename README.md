# MERN (Mongodb Express React Nodejs) Demo

## Installation and run

A. MongoDB

1. install mongoDB Community Server from https://www.mongodb.com/download-center#community (.msi file Default installation)
                https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
2. install adminMongo tool from https://www.npmjs.com/package/admin-mongo:
    Navigate to folder & install adminMongo: git clone https://github.com/mrvautin/adminMongo.git && cd adminMongo
    Install dependencies: npm install
3.  Start application: npm start or node app
    Visit http://127.0.0.1:1234 in your browser
    Add a connection (Connection string: mongodb://127.0.0.1)
    Connect to the connection and create your database and collection:


Database: chat / Collection: messages
{
    "messages": [
        {
            "sender": "George",
            "content": "Hi..."
        },
        {
            "sender": "Evgenia",
            "content": ":)"
        },
        {
            "sender": "George",
            "content": "How are you now?"
        }
    ]
}


B. Node & Express

1.  In an new folder run:
       npm init   ( "main": "server.js")
       npm install express --save
       npm install mongodb --save
2.  Create server.js file and add some code to create a server that sends data from your database:

        var express = require('express');
        var app = express();

        app.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*");
          next();
        });

        app.get('/', function(req, res) {
            var db = {};
            var MongoClient = require('mongodb').MongoClient;
            MongoClient.connect('mongodb://127.0.0.1', function(err, client) {
                db.collection = client.db('chat').collection('messages');
                db.collection.findOne({}, function (err, doc) {
                    if (err) {
                        console.LogError(err);
                    } else {
                       //console.log(doc);
                      res.status(200).json(doc);
                    }
                });
            });
        });

        app.listen(3500);

3.  Run the file with:

    npm start
    or
    node server.js




C. React Client

In a new folder create a react App.js that fetches data your server:

        import React, { Component } from 'react';
        import './App.css';

        class App extends Component {
            componentDidMount() {
                document.getElementById('get-chat-button').addEventListener('click', this.getChat);
            }

            getChat = () => {
                fetch("http://127.0.0.1:3500/")
                .then(result => result.json())
                .then(result => {
                    let chatDiv = document.getElementById('chat-div');
                    chatDiv.innerHTML = '';
                    let chat = '';
                    result.messages.forEach(message => {
                        chat+= message.sender + ': ' + message.content + '<br>';
                    });
                    chatDiv.innerHTML = chat;
                })
                .catch(error => {
                    console.log(error);
                });
            }

            render() {
                return (
                    <div>
                        <input
                            id="get-chat-button"
                            type="button"
                            value="Get Chat"/>
                        <div id="chat-div"/>
                    </div>
                );
            }
        }

        export default App;

