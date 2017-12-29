'use strict';

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
const HipChatRoomNotification = require('./../src/HipChatRoomNotification');

const should = chai.should();

chai.use(chaiAsPromised);

/* eslint camelcase: 'off' */

describe('HipChatRoomNotification Network Unit Tests', function() {
  let notification;
  let server;

  before(function() {
    server = sinon.fakeServer.create();
  });

  after(function() {
    server.restore();
  });

  beforeEach(function() {
    notification = new HipChatRoomNotification('https://www.example.com', '1', 'abcd1234');
  });

  afterEach(function() {
    request.get.restore();
  });

  it("successful post - basic message", function() {
    notification.setMessage('test');

    server.respond(
      204,
      {},
      ''
    );

    const promise = notification.send();

    return promise.should.eventually.equal('successfully posted to hipchat');
  });

  it("successful post - card", function() {
    notification.setMessage('message');
    notification.addCard('1', 'file', 'title');

    server.respond(
      204,
      {},
      ''
    );

    const promise = notification.send();

    return promise.should.eventually.equal('successfully posted to hipchat');
  });

  it("bad post", function() {
    server.respond(
      400,
      {},
      ''
    );

    const promise = notification.send();

    return promise.should.eventually.be.rejected;
  });

  it("invalid basic request object - failed validation", function() {
    const promise = notification.send();

    return expect(promise).to.eventually.equal('successfully posted to hipchat');
  });

  it("invalid card request object - failed validation", function() {
    notification.addCard('1', 'file', 'title');

    const promise = notification.send();

    return expect(promise).to.eventually.equal('successfully posted to hipchat');
  });
});
