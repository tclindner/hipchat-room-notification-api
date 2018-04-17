'use strict';

const chai = require('chai');
const HangoutsChatNotification = require('./../src/HangoutsChatNotification');

const should = chai.should();

/* eslint camelcase: 'off', max-lines: 'off' */

describe('HangoutsChatNotification Unit Tests', function() {
  context('Card message', function() {
    let hangoutsChatNotification;

    beforeEach(function() {
      hangoutsChatNotification = new HangoutsChatNotification('https://www.example.com', '1', 'abcd1234');
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

      hangoutsChatNotification.setFrom('from');
      hangoutsChatNotification.setTextMessageFormat();
      hangoutsChatNotification.setColor('green');
      hangoutsChatNotification.shouldNotify();
      hangoutsChatNotification.setMessage('message');
      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardThumbnail('url');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
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
            url: 'url',
            url2x: 'url2x',
            width: '100',
            height: '200'
          }
        }
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardThumbnailDetails('url', 'url2x', '100', '200');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
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
            html: 'html'
          }
        }
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addActivity('html');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addActivityWithIcon('html', 'iconUrl');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addActivityWithIconDetails('html', 'iconUrl', 'icon2xUrl');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.setCardToCompactFormat();
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.setCardToMediumFormat();
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardUrl('url');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardDescription('description', 'html');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with 1 attribute', function() {
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardAttribute('label', 'description', 'lozenge-success');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with 2 attributes', function() {
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardAttribute('label', 'description', 'lozenge-success');
      hangoutsChatNotification.addCardAttribute('label2', 'description2', 'lozenge-success');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardAttributeWithUrl('label', 'description', 'lozenge-success', 'url');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardAttributeWithIcon('label', 'description', 'lozenge-success', 'iconUrl');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardAttributeWithIconAndUrl('label', 'description', 'lozenge-success', 'iconUrl', 'url');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with icon', function() {
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardIcon('iconUrl');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with icon details', function() {
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

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardIconDetails('iconUrl', 'icon2xUrl');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });
  });
});
