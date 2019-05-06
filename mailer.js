const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var API_KEY = '1ae1e7dccbb93c0477e9092a83419298-7bce17e5-7b2e3417';
var DOMAIN = 'sandbox1173fc17582c4c67bfdab1de8b738caa.mailgun.org';
var mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });



app.post('/api/sendemail', (req, res) => {

    let mailBody = '';

    res.send({ express: 'Hello From api ' + req.data });

    req.body.products.map(product => {
        mailBody += 'Proizviod: ' + product.name + '  Kolicina:  ' + product.amount + '\n'
    })

    mailBody += req.body.sender.name.value + '\n'
    mailBody += req.body.sender.street.value + '\n'
    mailBody += req.body.sender.city.value + '\n'
    mailBody += req.body.sender.telephone.value + '\n'

    mailBody += 'Dan ' + req.body.sender.day.value + '\n'
    mailBody += 'Od ' + req.body.sender.timeBegin.value + '\n'
    mailBody += 'Do ' + req.body.sender.timeEnd.value + '\n'

    mailBody += 'Napomena ' + req.body.sender.remark.value + '\n'


    console.log(req.body);
    const data = {
        from: 'aplikacija <me@samples.mailgun.org>',
        to: 'pcelarstvo.petar.matak@net.hr',
        subject: 'izzz app',
        text: mailBody
    };

    mailgun.messages().send(data, (error, body) => {
        console.log(body, error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));