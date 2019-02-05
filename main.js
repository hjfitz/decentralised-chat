var P2P = require('socket.io-p2p');
var io = require('socket.io-client');
var socket = io();


var p2psocket = new P2P(socket, {autoUpgrade: false, numClients: 10})


p2psocket.on('peer-msg', (data) => {
  console.log(data)
  const out = document.querySelector('.output')
  const para = document.createElement('p')
  para.textContent = data
  out.appendChild(para)
});

p2psocket.on('go-private', () => {
  console.log('private time')
  p2psocket.upgrade(); // upgrade to peerConnection
});

window.onload = () => {
  const priv = document.getElementById('go-private')
  const send = document.getElementById('send')
  const inp = document.getElementById('in')
  priv.addEventListener('click', () => {
    p2psocket.emit('go-private')
  })

  send.addEventListener('click', () => {
    p2psocket.emit('peer-msg', inp.value)
  })
}