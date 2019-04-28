const HipChatRoomNotification = require('./../src/HipChatRoomNotification');

/* eslint camelcase: 'off' */

describe('HipChatRoomNotification Unit Tests', () => {
  describe('Card message', () => {
    let hipChatRoomNotification;

    beforeEach(() => {
      hipChatRoomNotification = new HipChatRoomNotification('https://www.example.com', '1', 'abcd1234');
    });

    test('custom basic card', () => {
      const expected = {
        from: 'from',
        message_format: 'text',
        color: 'green',
        notify: true,
        message: 'message',
        card: {
          id: '1',
          style: 'file',
          title: 'title'
        }
      };

      hipChatRoomNotification.setFrom('from');
      hipChatRoomNotification.setTextMessageFormat();
      hipChatRoomNotification.setColor('green');
      hipChatRoomNotification.shouldNotify();
      hipChatRoomNotification.setMessage('message');
      hipChatRoomNotification.addCard('1', 'file', 'title');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with thumbnail', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          thumbnail: {
            url: 'url'
          }
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardThumbnail('url');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with thumbnail details', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          thumbnail: {
            url: 'url',
            url2x: 'url2x',
            width: '100',
            height: '200'
          }
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardThumbnailDetails('url', 'url2x', '100', '200');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with activity', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          activity: {
            html: 'html'
          }
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addActivity('html');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with activity with icon', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          activity: {
            html: 'html',
            icon: {
              url: 'iconUrl'
            }
          }
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addActivityWithIcon('html', 'iconUrl');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with activity with icon details', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          activity: {
            html: 'html',
            icon: {
              'url': 'iconUrl',
              'url@2x': 'icon2xUrl'
            }
          }
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addActivityWithIconDetails('html', 'iconUrl', 'icon2xUrl');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with compact format', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          format: 'compact'
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.setCardToCompactFormat();
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with medium format', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          format: 'medium'
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.setCardToMediumFormat();
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with url', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          url: 'url'
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardUrl('url');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with description', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          description: {
            value: 'description',
            format: 'html'
          }
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardDescription('description', 'html');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with 1 attribute', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          attributes: [
            {
              label: 'label',
              value: {
                label: 'description',
                style: 'lozenge-success'
              }
            }
          ],
          id: '1',
          style: 'file',
          title: 'title'
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardAttribute('label', 'description', 'lozenge-success');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with 2 attributes', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          attributes: [
            {
              label: 'label',
              value: {
                label: 'description',
                style: 'lozenge-success'
              }
            },
            {
              label: 'label2',
              value: {
                label: 'description2',
                style: 'lozenge-success'
              }
            }
          ],
          id: '1',
          style: 'file',
          title: 'title'
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardAttribute('label', 'description', 'lozenge-success');
      hipChatRoomNotification.addCardAttribute('label2', 'description2', 'lozenge-success');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with attribute with url', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          attributes: [
            {
              label: 'label',
              value: {
                label: 'description',
                style: 'lozenge-success',
                url: 'url'
              }
            }
          ]
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardAttributeWithUrl('label', 'description', 'lozenge-success', 'url');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with attribute with icon', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          attributes: [
            {
              label: 'label',
              value: {
                label: 'description',
                style: 'lozenge-success',
                icon: 'iconUrl'
              }
            }
          ]
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardAttributeWithIcon('label', 'description', 'lozenge-success', 'iconUrl');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with attribute with icon and url', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          attributes: [
            {
              label: 'label',
              value: {
                label: 'description',
                style: 'lozenge-success',
                icon: 'iconUrl',
                url: 'url'
              }
            }
          ]
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardAttributeWithIconAndUrl('label', 'description', 'lozenge-success', 'iconUrl', 'url');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with icon', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          icon: {
            url: 'iconUrl'
          },
          id: '1',
          style: 'file',
          title: 'title'
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardIcon('iconUrl');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });

    test('card with icon details', () => {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          icon: {
            'url': 'iconUrl',
            'url@2x': 'icon2xUrl'
          },
          id: '1',
          style: 'file',
          title: 'title'
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardIconDetails('iconUrl', 'icon2xUrl');
      expect(hipChatRoomNotification._getRequestJson()).toStrictEqual(expected);
    });
  });
});
