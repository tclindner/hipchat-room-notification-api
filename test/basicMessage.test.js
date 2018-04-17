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
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false
      };

      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('custom basic message', function() {
      const expected = {
        from: 'from',
        message_format: 'text',
        color: 'green',
        notify: true,
        message: 'message'
      };

      hangoutsChatNotification.setFrom('from');
      hangoutsChatNotification.setTextMessageFormat();
      hangoutsChatNotification.setColor('green');
      hangoutsChatNotification.shouldNotify();
      hangoutsChatNotification.setMessage('message');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });
  });
});
