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
        message_format: 'text',
        notify: true,
        text: 'message',
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: []
          }
        ]
      };

      hangoutsChatNotification.setTextMessageFormat();
      hangoutsChatNotification.shouldNotify();
      hangoutsChatNotification.setMessage('message');
      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with thumbnail', function() {
      const expected = {
        cards: [
          {
            header: {
              imageStyle: 'IMAGE',
              imageUrl: 'url',
              subtitle: 'file',
              title: '1'
            },
            sections: []
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardThumbnail('url');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with thumbnail details', function() {
      const expected = {
        cards: [
          {
            header: {
              imageStyle: 'IMAGE',
              imageUrl: 'url',
              subtitle: 'file',
              title: '1'
            },
            sections: []
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardThumbnailDetails('url', 'url2x', '100', '200');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with activity', function() {
      const expected = {
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: [
              {
                widgets: [
                  {
                    textParagraph: {
                      text: 'html'
                    }
                  }
                ]
              }
            ]
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addActivity('html');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with activity with icon', function() {
      const expected = {
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: [
              {
                widgets: [
                  {
                    keyValue: {
                      content: 'html',
                      contentMultiline: 'true',
                      iconUrl: 'iconUrl'
                    }
                  }
                ]
              }
            ]
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addActivityWithIcon('html', 'iconUrl');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with activity with icon details', function() {
      const expected = {
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: [
              {
                widgets: [
                  {
                    keyValue: {
                      content: 'html',
                      contentMultiline: 'true',
                      iconUrl: 'iconUrl'
                    }
                  }
                ]
              }
            ]
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addActivityWithIconDetails('html', 'iconUrl', 'icon2xUrl');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with compact format', function() {
      const expected = {
        card_format: 'compact',
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: []
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.setCardToCompactFormat();
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with medium format', function() {
      const expected = {
        card_format: 'medium',
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: []
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.setCardToMediumFormat();
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with url', function() {
      const expected = {
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: [
              {
                widgets: [
                  {
                    keyValue: {
                      content: 'url',
                      onClick: {
                        openLink: {
                          url: 'url'
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardUrl('url');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with description', function() {
      const expected = {
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: [
              {
                widgets: [
                  {
                    textParagraph: {
                      text: 'description'
                    }
                  }
                ]
              }
            ]
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardDescription('description', 'html');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with 1 attribute', function() {
      const expected = {
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: [
              {
                widgets: [
                  {
                    keyValue: {
                      content: '<font color="#14892c">description</font>',
                      topLabel: 'label'
                    }
                  }
                ]
              }
            ]
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardAttribute('label', 'description', 'lozenge-success');
      hangoutsChatNotification._getCardAttributes();
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with 2 attributes', function() {
      const expected = {
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: [
              {
                widgets: [
                  {
                    keyValue: {
                      content: '<font color="#14892c">description</font>',
                      topLabel: 'label'
                    }
                  }, {
                    keyValue: {
                      content: '<font color="#14892c">description2</font>',
                      topLabel: 'label2'
                    }
                  }
                ]
              }
            ]
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardAttribute('label', 'description', 'lozenge-success');
      hangoutsChatNotification.addCardAttribute('label2', 'description2', 'lozenge-success');
      hangoutsChatNotification._getCardAttributes();
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with attribute with url', function() {
      const expected = {
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: [
              {
                widgets: [
                  {
                    keyValue: {
                      content: '<font color="#14892c">description</font>',
                      onClick: {
                        openLink: {
                          url: 'url'
                        }
                      },
                      topLabel: 'label'
                    }
                  }
                ]
              }
            ]
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardAttributeWithUrl('label', 'description', 'lozenge-success', 'url');
      hangoutsChatNotification._getCardAttributes();
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with attribute with icon', function() {
      const expected = {
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: [
              {
                widgets: [
                  {
                    keyValue: {
                      content: '<font color="#14892c">description</font>',
                      icon: 'iconUrl',
                      topLabel: 'label'
                    }
                  }
                ]
              }
            ]
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardAttributeWithIcon('label', 'description', 'lozenge-success', 'iconUrl');
      hangoutsChatNotification._getCardAttributes();
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with attribute with icon and url', function() {
      const expected = {
        cards: [
          {
            header: {
              subtitle: 'file',
              title: '1'
            },
            sections: [
              {
                widgets: [
                  {
                    keyValue: {
                      content: '<font color="#14892c">description</font>',
                      icon: 'iconUrl',
                      onClick: {
                        openLink: {
                          url: 'url'
                        }
                      },
                      topLabel: 'label'
                    }
                  }
                ]
              }
            ]
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardAttributeWithIconAndUrl('label', 'description', 'lozenge-success', 'iconUrl', 'url');
      hangoutsChatNotification._getCardAttributes();
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with icon', function() {
      const expected = {
        cards: [
          {
            header: {
              imageStyle: 'IMAGE',
              imageUrl: 'iconUrl',
              subtitle: 'file',
              title: '1'
            },
            sections: []
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardIcon('iconUrl');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });

    it('card with icon details', function() {
      const expected = {
        cards: [
          {
            header: {
              imageStyle: 'IMAGE',
              imageUrl: 'iconUrl',
              subtitle: 'file',
              title: '1'
            },
            sections: []
          }
        ]
      };

      hangoutsChatNotification.addCard('1', 'file', 'title');
      hangoutsChatNotification.addCardIconDetails('iconUrl', 'icon2xUrl');
      hangoutsChatNotification._getRequestJson().should.deep.equal(expected);
    });
  });
});
