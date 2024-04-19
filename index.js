const express = require('express');
const app = express();
const port = 3000;

// Rota para a raiz da API
app.get('/', (req, res) => {
  res.send('Bem-vindo à minha API 4!');
});

var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'api.tolife.app',
  'path': '/integration/api/v1/Episode',
  'headers': {
    'Authorization': '14c31e19-1a49-48c9-ae31-2ebc86927844',
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  "idFlow": 1081,
  "episodeTicket": {
    "ticketInitials": "WB4555",
    "ticketSequence": 1
  },
  "patient": {
    "patientName": "Mathaus"
  }
});

req.write(postData);

req.end();
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
