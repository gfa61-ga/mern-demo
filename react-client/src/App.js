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
            let chat = '<br>';
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
