'use strict';

const chai = require('chai');
const HipChatRoomNotification = require('./../src/HipChatRoomNotification');

const should = chai.should();

/* eslint camelcase: 'off' */

describe('HipChatRoomNotification Unit Tests', function() {
  describe('isBasicValid method', function() {
    let hipChatRoomNotification;

    beforeEach(function() {
      hipChatRoomNotification = new HipChatRoomNotification('https://www.example.com', '1', 'abcd1234');
    });

    context('validate initialization', function() {
      it('apiUrl', function() {
        const expected = {
          message_format: 'html',
          color: 'yellow',
          notify: false
        };

        hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
      });
    });

    context('custom basic message', function() {
      it('apiUrl', function() {
        const expected = {
          from: 'from',
          message_format: 'text',
          color: 'green',
          notify: true,
          message: 'message'
        };

        hipChatRoomNotification.setFrom('from');
        hipChatRoomNotification.setTextMessageFormat();
        hipChatRoomNotification.setColor('red');
        hipChatRoomNotification.shouldNotify();
        hipChatRoomNotification.setMessage('message');
        hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
      });
    });
  });
});
