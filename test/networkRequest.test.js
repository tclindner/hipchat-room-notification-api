'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const HipChatRoomNotification = require('./../src/HipChatRoomNotification');

const should = chai.should();

chai.use(chaiAsPromised);

/* eslint camelcase: 'off', no-magic-numbers: 'off' */

describe('HipChatRoomNotification Network Unit Tests', function() {
  let notification;
  let server;

  before(function() {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;
  });

  after(function() {
    server.restore();
  });

  beforeEach(function() {
    notification = new HipChatRoomNotification('https://www.example.com', '1', 'abcd1234');
  });

  it('successful post - basic message', function() {
    notification.setMessage('test');

    server.respondWith(204, {}, '');

    const promise = notification.send();

    return promise.should.eventually.equal('successfully posted to hipchat');
  });

  it('successful post - card', function() {
    notification.setMessage('message');
    notification.addCard('1', 'file', 'title');

    server.respondWith(204, {}, '');

    const promise = notification.send();

    return promise.should.eventually.equal('successfully posted to hipchat');
  });

  it('bad post', function() {
    server.respondWith(400, {}, '');

    const promise = notification.send();

    return promise.should.eventually.be.rejected;
  });

  it('invalid basic request object - failed validation', function() {
    const promise = notification.send();

    return promise.should.be.rejectedWith(Error);
  });

  it('invalid card request object - failed validation', function() {
    notification.addCard('1', 'file', 'title');

    const promise = notification.send();

    return promise.should.be.rejectedWith(Error);
  });
});
