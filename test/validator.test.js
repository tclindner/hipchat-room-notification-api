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
        errors[0].should.equal('object.text is a required property.');
      });
    });

    context('when notify attribute is a boolean', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          notify: true,
          text: 'test'
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
          text: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.false;
        errors.length.should.equal(1);
        errors[0].should.equal('object.notify must be true or false.');
      });
    });

    context('when text attribute is 10000 chars', function() {
      it('the validator response should be true', function() {
        let text = '';

        /* eslint-disable */
        for (let count = 1; count <= 10000; count++) {
          text = text + 'a';
        }
        /* eslint-enable */

        const requestObject = {
          text: text
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.true;
        errors.length.should.equal(0);
      });
    });

    context('when text attribute is 10001 chars', function() {
      it('the validator response should be false', function() {
        let text = '';

        /* eslint-disable */
        for (let count = 1; count <= 10001; count++) {
          text = text + 'a';
        }
        /* eslint-enable */

        const requestObject = {
          text: text
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        isValid.should.be.false;
        errors.length.should.equal(1);
        errors[0].should.equal('object.text must be between 0 and 10000 characters.');
      });
    });
  });

  describe('isCardValid method', function() {
    context('when required card attributes are provided in the request object', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          text: 'a',
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
          text: 'a',
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
          text: 'a',
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
          text: 'a',
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
          text: 'a',
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
          text: 'a',
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
          text: 'a',
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
          text: 'a',
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
          text: 'a',
          card: {
            id: '1',
            style: 'file',
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
          text: 'a',
          card: {
            id: '1',
            style: 'file',
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
          text: 'a',
          card: {
            id: '1',
            style: 'file',
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
        let title = '';

        /* eslint-disable */
        for (let count = 1; count <= 500; count++) {
          title = title + 'a';
        }
        /* eslint-enable */

        const requestObject = {
          text: 'a',
          card: {
            id: '1',
            style: 'file',
            title: title
          }
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
        let title = '';

        /* eslint-disable */
        for (let count = 1; count <= 501; count++) {
          title = title + 'a';
        }
        /* eslint-enable */

        const requestObject = {
          text: 'a',
          card: {
            id: '1',
            style: 'file',
            title: title
          }
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
          text: 'a',
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
        errors[0].should.equal('object.card.thumbnail.url is a required property.');
      });
    });

    context('when card thumbnail is provided in the request object with url node', function() {
      it('the validator response should be true', function() {
        const requestObject = {
          text: 'a',
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
          text: 'a',
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
          text: 'a',
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
