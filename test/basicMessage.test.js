'use strict';

const chai = require('chai');
const HangoutsChatNotification = require('./../src/HangoutsChatNotification');

const should = chai.should();

/* eslint camelcase: 'off' */

describe('HangoutsChatNotification Unit Tests', function() {
  describe('Basic message', function() {
    let hangoutsChatNotification;

    beforeEach(function() {
      hangoutsChatNotification = new HangoutsChatNotification('https://www.example.com', '1', 'abcd1234');
    });

    it('validate initialization', function() {
      const expected = { };

      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('custom basic message', function() {
      const expected = {
        text: 'message',
        message_format: 'text',
        notify: true
      };

      hangoutsChatNotification.setTextMessageFormat();
      hangoutsChatNotification.shouldNotify();
      hangoutsChatNotification.setMessage('message');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });
  });
});
