'use strict';

var assert = require('assert');
var bitcore = require('bitcore');
var fs = require('fs');
var PrivateKey = bitcore.PrivateKey;
var Consumer = require('../lib/Consumer');
var Provider = require('../lib/Provider');
var Payment = require('../lib/transactions/Payment');

var fundingKey = new PrivateKey("cb5dc68fbcaf37f29139b50fa4664b395c03e49deb966e5d49a629af005d0654");
var refundKey = new PrivateKey("b65080da83f59a9bfa03841bc82fd0c0d1e036176b2f2c157eaa9547010a042e");
var commitmentKey = new PrivateKey("f1a140dc9d795c0aa537329379f645eb961fe42f27c660e10676c07ddf18777f");

var providerKey = new PrivateKey("75d79298ce12ea86863794f0080a14b424d9169f7e325fad52f60753eb072afc");

var provider = new Provider({
  key: providerKey,
  paymentAddress: providerKey.toAddress()
});

var payment = JSON.parse(fs.readFileSync('firstpayment.log'));

payment = provider.validPayment(payment);
console.log(payment.toString());

var insight = new bitcore.transport.explorers.Insight();

insight.broadcast(payment.toString(), function(err, txid) {
  if (err) {
    console.log('Error broadcasting');
  } else {
    console.log('broadcasted as', txid);
  }
});
