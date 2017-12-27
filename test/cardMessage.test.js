'use strict';

const chai = require('chai');
const HipChatRoomNotification = require('./../src/HipChatRoomNotification');

const should = chai.should();

describe('HipChatRoomNotification Unit Tests', function() {
  context('isBasicValid method', function() {
    let hipChatRoomNotification;

    beforeEach(function() {
      hipChatRoomNotification = new HipChatRoomNotification('https://www.example.com', '1', 'abcd1234');
    });

    it('custom basic card', function() {
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
      hipChatRoomNotification.setColor('red');
      hipChatRoomNotification.shouldNotify();
      hipChatRoomNotification.setMessage('message');
      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with thumbnail', function() {
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
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with thumbnail details', function() {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          thumbnail: {
            'url': 'url',
            'url2x': 'url2x',
            'width': '100',
            'height': '200'
          }
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardThumbnailDetails('url', 'url2x', '100', '200');
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with activity', function() {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          activity: {
            'html': 'html'
          }
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addActivity('html');
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with activity with icon', function() {
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
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with activity with icon details', function() {
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
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with compact format', function() {
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
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with medium format', function() {
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
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with url', function() {
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
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with description', function() {
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
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with 1 attribute', function() {
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
                style: 'lozenge-success'
              }
            }
          ]
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardAttribute('label', 'description', 'lozenge-success');
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with 2 attributes', function() {
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
          ]
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardAttribute('label', 'description', 'lozenge-success');
      hipChatRoomNotification.addCardAttribute('label2', 'description2', 'lozenge-success');
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with attribute with url', function() {
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
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with attribute with icon', function() {
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
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with attribute with icon and url', function() {
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
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with icon', function() {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          icon: {
            url: 'iconUrl'
          }
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardIcon('iconUrl');
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with icon details', function() {
      const expected = {
        message_format: 'html',
        color: 'yellow',
        notify: false,
        card: {
          id: '1',
          style: 'file',
          title: 'title',
          icon: {
            'url': 'iconUrl',
            'url@2x': 'icon2xUrl'
          }
        }
      };

      hipChatRoomNotification.addCard('1', 'file', 'title');
      hipChatRoomNotification.addCardIconDetails('iconUrl', 'icon2xUrl');
      hipChatRoomNotification._getRequestJson().should.deep.equal(expected);
    });
  });
});
