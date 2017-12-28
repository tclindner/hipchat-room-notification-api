'use strict';

const chai = require('chai');
const Validator = require('./../src/Validator');

const should = chai.should();

/* eslint max-lines: 'off', no-magic-numbers: 'off', camelcase: 'off' */

describe('Validator Unit Tests', function() {
  describe('isBasicValid method', function() {
    context('when an empty request object is provided', function() {
      it('the validator response should be false', function() {
        const requestObject = {};
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.false;
        errors.length.should.equal(1);
        errors[0].should.equal('object.message is a required property.');
      });
    });

    context('when from attribute is 1 char', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          from: 'a',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when from attribute is 64 chars', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          from: '1234567890123456789012345678901234567890123456789012345678901234',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when from attribute is 65 chars', function() {
      it('the validator response should be false', function() {
        const requestObject = {
          from: '12345678901234567890123456789012345678901234567890123456789012345',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.false;
        errors.length.should.equal(1);
        errors[0].should.equal('object.from must be between 0 and 64 characters.');
      });

      context('when from attribute is 65 chars and message is omitted', function() {
        it('the validator response should be false', function() {
          const requestObject = {
            from: '12345678901234567890123456789012345678901234567890123456789012345',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.false;
          errors.length.should.equal(2);
          errors[0].should.equal('object.from must be between 0 and 64 characters.');
          errors[1].should.equal('object.message is a required property.');
        });
      });

      context('when message_format attribute is html', function() {
        it('the validator response should be true', function() {
          const requestObject = {
            message_format: 'html',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.true;
          errors.length.should.equal(0);
        });
      });

      context('when message_format attribute is text', function() {
        it('the validator response should be true', function() {
          const requestObject = {
            message_format: 'text',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.true;
          errors.length.should.equal(0);
        });
      });

      context('when message_format attribute is blah', function() {
        it('the validator response should be false', function() {
          const requestObject = {
            message_format: 'blah',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.false;
          errors.length.should.equal(1);
          errors[0].should.equal('object.message_format must be one of: html, text.');
        });
      });

      context('when color attribute is yellow', function() {
        it('the validator response should be true', function() {
          const requestObject = {
            color: 'yellow',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.true;
          errors.length.should.equal(0);
        });
      });

      context('when color attribute is green', function() {
        it('the validator response should be true', function() {
          const requestObject = {
            color: 'green',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.true;
          errors.length.should.equal(0);
        });
      });

      context('when color attribute is red', function() {
        it('the validator response should be true', function() {
          const requestObject = {
            color: 'red',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.true;
          errors.length.should.equal(0);
        });
      });

      context('when color attribute is purple', function() {
        it('the validator response should be true', function() {
          const requestObject = {
            color: 'purple',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.true;
          errors.length.should.equal(0);
        });
      });

      context('when color attribute is gray', function() {
        it('the validator response should be true', function() {
          const requestObject = {
            color: 'gray',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.true;
          errors.length.should.equal(0);
        });
      });

      context('when color attribute is random', function() {
        it('the validator response should be true', function() {
          const requestObject = {
            color: 'random',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.true;
          errors.length.should.equal(0);
        });
      });

      context('when color attribute is blah', function() {
        it('the validator response should be false', function() {
          const requestObject = {
            color: 'blah',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.false;
          errors.length.should.equal(1);
          errors[0].should.equal('object.color must be one of: yellow, green, red, purple, gray, random.');
        });
      });

      context('when attach_to attribute is 1 char', function() {
        it('the validator response should be true', function() {
          const requestObject = {
            attach_to: 'a',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.true;
          errors.length.should.equal(0);
        });
      });

      context('when attach_to attribute is 36 chars', function() {
        it('the validator response should be true', function() {
          const requestObject = {
            attach_to: '123456789012345678901234567890123456',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.true;
          errors.length.should.equal(0);
        });
      });

      context('when attach_to attribute is 37 chars', function() {
        it('the validator response should be false', function() {
          const requestObject = {
            attach_to: '1234567890123456789012345678901234567',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.false;
          errors.length.should.equal(1);
          errors[0].should.equal('object.from must be between 0 and 64 characters.');
        });
      });

      context('when notify attribute is a boolean', function() {
        it('the validator response should be true', function() {
          const requestObject = {
            notify: true,
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.true;
          errors.length.should.equal(0);
        });
      });

      context('when notify attribute is not a boolean', function() {
        it('the validator response should be false', function() {
          const requestObject = {
            notify: 'true',
            message: 'test'
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.false;
          errors.length.should.equal(1);
          errors[0].should.equal('object.notify must be true or false.');
        });
      });

      context('when message attribute is 10000 chars', function() {
        it('the validator response should be true', function() {
          let message = '';

          /* eslint-disable */
          for (const count = 1; count <= 10000; count++) {
            message = message + 'a';
          }
          /* eslint-enable */

          const requestObject = {
            message: message
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.true;
          errors.length.should.equal(0);
        });
      });

      context('when message attribute is 10001 chars', function() {
        it('the validator response should be false', function() {
          let message = '';

          /* eslint-disable */
          for (const count = 1; count <= 10001; count++) {
            message = message + 'a';
          }
          /* eslint-enable */

          const requestObject = {
            message: message
          };
          const validator = new Validator(requestObject);
          const isValid = validator.isBasicValid(requestObject);
          const errors = validator.getErrors();

          isValid.should.be.false;
          errors.length.should.equal(1);
          errors[0].should.equal('object.message must be between 0 and 10000 characters.');
        });
      });
    });
  });

  describe('isCardValid method', function() {
    context('when required card attributes are provided in the request object', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'file',
            title: 'title'
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when required card attributes are not provided in the request object', function() {
      it('the validator response should be false', function() {
        const requestObject = {
          message: 'a',
          card: {}
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.false;
        errors.length.should.equal(3);
        errors[0].should.equal('object.card.style is a required property.');
        errors[1].should.equal('object.card.title is a required property.');
        errors[2].should.equal('object.card.id is a required property.');
      });
    });

    context('when card style is file in the request object', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'file',
            title: 'title'
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when card style is image in the request object', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'image',
            title: 'title'
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when card style is application in the request object', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'application',
            title: 'title'
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when card style is link in the request object', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'link',
            title: 'title'
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when card style is media in the request object', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'media',
            title: 'title'
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when card style is blah in the request object', function() {
      it('the validator response should be false', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'blah',
            title: 'title'
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.false;
        errors.length.should.equal(1);
        errors[0].should.equal('object.card.style must be one of: file, image, application, link, media.');
      });
    });

    context('when card format is compact in the request object', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            format: 'compact',
            title: 'title'
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when card format is medium in the request object', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            format: 'medium',
            title: 'title'
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when card format is blah in the request object', function() {
      it('the validator response should be false', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            format: 'blah',
            title: 'title'
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.false;
        errors.length.should.equal(1);
        errors[0].should.equal('object.card.format must be one of: compact, medium.');
      });
    });

    context('when card title attribute is 500 chars', function() {
      it('the validator response should be true', function() {
        let message = '';

        /* eslint-disable */
        for (const count = 1; count <= 500; count++) {
          message = message + 'a';
        }
        /* eslint-enable */

        const requestObject = {
          message: message
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when card title attribute is 501 chars', function() {
      it('the validator response should be false', function() {
        let message = '';

        /* eslint-disable */
        for (const count = 1; count <= 501; count++) {
          message = message + 'a';
        }
        /* eslint-enable */

        const requestObject = {
          message: message
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.false;
        errors.length.should.equal(1);
        errors[0].should.equal('object.card.title must be between 0 and 500 characters.');
      });
    });

    context('when card thumbnail is provided in the request object with url node', function() {
      it('the validator response should be false', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'file',
            title: 'title',
            thumbnail: {}
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.false;
        errors.length.should.equal(1);
        errors[0].should.equal('object.card.activity.html is a required property.');
      });
    });

    context('when card thumbnail is provided in the request object with url node', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'file',
            title: 'title',
            thumbnail: {
              url: 'a'
            }
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when card activity is provided in the request object with html node', function() {
      it('the validator response should be false', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'file',
            title: 'title',
            activity: {}
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.false;
        errors.length.should.equal(1);
        errors[0].should.equal('object.card.activity.html is a required property.');
      });
    });

    context('when card activity is provided in the request object with html node', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'file',
            title: 'title',
            activity: {
              html: 'a'
            }
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });
  });
});
