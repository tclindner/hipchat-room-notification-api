const HipChatRoomNotification = require('./../src/HipChatRoomNotification');

/* eslint camelcase: 'off' */

describe('HipChatRoomNotification Unit Tests', () => {
  describe('Basic message', () => {
    let hipChatRoomNotification;

    beforeEach(() => {
      hipChatRoomNotification = new HipChatRoomNotification('https://www.example.com', '1', 'abcd1234');
    });

    test('validate initialization', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false
      };

      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('custom basic message', () => {
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
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });
  });
});
