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

  beforeEach(function() {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
    server.respondImmediately = true;
    notification = new HipChatRoomNotification('https://www.example.com', '1', 'abcd1234');
  });

  afterEach(function() {
    server.restore();
  });

  it('successful post - basic message', function() {
    notification.setMessage('test');

    const response = [204, {}, ''];

    server.respondWith('POST', 'https://www.example.com/v2/room/1/notification', response);

    const promise = notification.send();

    return promise.should.eventually.equal('successfully posted to hipchat');
  });

  it('successful post - card', function() {
    notification.setMessage('message');
    notification.addCard('1', 'file', 'title');

    const response = [204, {}, ''];

    server.respondWith('POST', 'https://www.example.com/v2/room/1/notification', response);

    const promise = notification.send();

    return promise.should.eventually.equal('successfully posted to hipchat');
  });

  it('bad post', function() {
    const response = [400, {}, ''];

    server.respondWith('POST', 'https://www.example.com/v2/room/1/notification', response);

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
