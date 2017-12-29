'use strict';

const chai = require('chai');
const HipChatRoomNotification = require('./../src/HipChatRoomNotification');

const should = chai.should();

/* eslint camelcase: 'off' */

describe('HipChatRoomNotification Unit Tests', function() {
  describe('Basic message', function() {
    let hipChatRoomNotification;

    beforeEach(function() {
      hipChatRoomNotification = new HipChatRoomNotification('https://www.example.com', '1', 'abcd1234');
    });

    it('validate initialization', function() {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false
      };

      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('custom basic message', function() {
      const expected = {
        from: 'from',
        message_format: 'text',
        color: 'green',
        notify: true,
        message: 'message'
      };

      hipChatRoomNotification.setFrom('from');
      hipChatRoomNotification.setTextMessageFormat();
      hipChatRoomNotification.setColor('green');
      hipChatRoomNotification.shouldNotify();
      hipChatRoomNotification.setMessage('message');
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });
  });
});
