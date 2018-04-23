'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const HangoutsChatNotification = require('./../src/HangoutsChatNotification');
const request = require('request');
const should = chai.should();

chai.use(chaiAsPromised);

/* eslint camelcase: 'off', no-magic-numbers: 'off' */

describe('HangoutsChatNotification Network Unit Tests', function() {
  let notification;

  beforeEach(function() {
    notification = new HangoutsChatNotification('https://www.example.com', '1', 'abcd1234');
  });

  afterEach(function() {
    request.post.restore();
  });

  it('successful post - basic message', function() {
    notification.setMessage('test');

    const stub = sinon.stub(request, 'post').yields(null, {statusCode: 200}, {});
    const promise = notification.send();

    return promise.should.eventually.equal('successfully posted to hangouts-chat');
  });

  it('successful post - card', function() {
    notification.setMessage('message');
    notification.addCard('1', 'file', 'title');

    const stub = sinon.stub(request, 'post').yields(null, {statusCode: 200}, {});
    const promise = notification.send();

    return promise.should.eventually.equal('successfully posted to hangouts-chat');
  });

  it('bad post', function() {
    const stub = sinon.stub(request, 'post').yields(null, {statusCode: 400}, {});
    const promise = notification.send();

    return promise.should.eventually.be.rejected;
  });

  it('invalid basic request object - failed validation', function() {
    const stub = sinon.stub(request, 'post').yields(null, {statusCode: 204}, {});
    const promise = notification.send();

    return promise.should.be.rejectedWith(Error);
  });

  it('invalid card request object - failed validation', function() {
    const stub = sinon.stub(request, 'post').yields(null, {statusCode: 204}, {});
    notification.addCard('1', 'file', 'title');

    const promise = notification.send();

    return promise.should.be.rejectedWith(Error);
  });
});
