const Validator = require('./../src/Validator');

/* eslint camelcase: 'off' */

describe('Validator Unit Tests', () => {
  describe('isBasicValid method', () => {
    describe('when an empty request object is provided', () => {
      test('the validator response should be false', () => {
        const requestObject = {};
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(1);
        expect(errors[0]).toStrictEqual('object.message is a required property.');
      });
    });

    describe('when from attribute is 1 char', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          from: 'a',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when from attribute is 64 chars', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          from: '1234567890123456789012345678901234567890123456789012345678901234',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when from attribute is 65 chars', () => {
      test('the validator response should be false', () => {
        const requestObject = {
          from: '12345678901234567890123456789012345678901234567890123456789012345',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(1);
        expect(errors[0]).toStrictEqual('object.from must be between 0 and 64 characters.');
      });
    });

    describe('when from attribute is 65 chars and message is omitted', () => {
      test('the validator response should be false', () => {
        const requestObject = {
          from: '12345678901234567890123456789012345678901234567890123456789012345'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(2);
        expect(errors[0]).toStrictEqual('object.from must be between 0 and 64 characters.');
        expect(errors[1]).toStrictEqual('object.message is a required property.');
      });
    });

    describe('when message_format attribute is html', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          message_format: 'html',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when message_format attribute is text', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          message_format: 'text',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when message_format attribute is blah', () => {
      test('the validator response should be false', () => {
        const requestObject = {
          message_format: 'blah',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(1);
        expect(errors[0]).toStrictEqual('object.message_format must be one of: html, text.');
      });
    });

    describe('when color attribute is yellow', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          color: 'yellow',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when color attribute is green', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          color: 'green',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when color attribute is red', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          color: 'red',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when color attribute is purple', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          color: 'purple',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when color attribute is gray', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          color: 'gray',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when color attribute is random', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          color: 'random',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when color attribute is blah', () => {
      test('the validator response should be false', () => {
        const requestObject = {
          color: 'blah',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(1);
        expect(errors[0]).toStrictEqual('object.color must be one of: yellow, green, red, purple, gray, random.');
      });
    });

    describe('when attach_to attribute is 1 char', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          attach_to: 'a',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when attach_to attribute is 36 chars', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          attach_to: '123456789012345678901234567890123456',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when attach_to attribute is 37 chars', () => {
      test('the validator response should be false', () => {
        const requestObject = {
          attach_to: '1234567890123456789012345678901234567',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(1);
        expect(errors[0]).toStrictEqual('object.attach_to must be between 0 and 36 characters.');
      });
    });

    describe('when notify attribute is a boolean', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          notify: true,
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when notify attribute is not a boolean', () => {
      test('the validator response should be false', () => {
        const requestObject = {
          notify: 'true',
          message: 'test'
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(1);
        expect(errors[0]).toStrictEqual('object.notify must be true or false.');
      });
    });

    describe('when message attribute is 10000 chars', () => {
      test('the validator response should be true', () => {
        let message = '';

        /* eslint-disable */
        for (let count = 1; count <= 10000; count++) {
          message = message + 'a';
        }
        /* eslint-enable */

        const requestObject = {
          message
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when message attribute is 10001 chars', () => {
      test('the validator response should be false', () => {
        let message = '';

        /* eslint-disable */
        for (let count = 1; count <= 10001; count++) {
          message = message + 'a';
        }
        /* eslint-enable */

        const requestObject = {
          message
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isBasicValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(1);
        expect(errors[0]).toStrictEqual('object.message must be between 0 and 10000 characters.');
      });
    });
  });

  describe('isCardValid method', () => {
    describe('when required card attributes are provided in the request object', () => {
      test('the validator response should be true', () => {
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

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when required card attributes are not provided in the request object', () => {
      test('the validator response should be false', () => {
        const requestObject = {
          message: 'a',
          card: {}
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(3);
        expect(errors[0]).toStrictEqual('object.card.style is a required property.');
        expect(errors[1]).toStrictEqual('object.card.title is a required property.');
        expect(errors[2]).toStrictEqual('object.card.id is a required property.');
      });
    });

    describe('when card style is file in the request object', () => {
      test('the validator response should be true', () => {
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

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when card style is image in the request object', () => {
      test('the validator response should be true', () => {
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

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when card style is application in the request object', () => {
      test('the validator response should be true', () => {
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

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when card style is link in the request object', () => {
      test('the validator response should be true', () => {
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

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when card style is media in the request object', () => {
      test('the validator response should be true', () => {
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

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when card style is blah in the request object', () => {
      test('the validator response should be false', () => {
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

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(1);
        expect(errors[0]).toStrictEqual('object.card.style must be one of: file, image, application, link, media.');
      });
    });

    describe('when card format is compact in the request object', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          message: 'a',
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

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when card format is medium in the request object', () => {
      test('the validator response should be true', () => {
        const requestObject = {
          message: 'a',
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

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when card format is blah in the request object', () => {
      test('the validator response should be false', () => {
        const requestObject = {
          message: 'a',
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

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(1);
        expect(errors[0]).toStrictEqual('object.card.format must be one of: compact, medium.');
      });
    });

    describe('when card title attribute is 500 chars', () => {
      test('the validator response should be true', () => {
        let title = '';

        /* eslint-disable */
        for (let count = 1; count <= 500; count++) {
          title = title + 'a';
        }
        /* eslint-enable */

        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'file',
            title
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when card title attribute is 501 chars', () => {
      test('the validator response should be false', () => {
        let title = '';

        /* eslint-disable */
        for (let count = 1; count <= 501; count++) {
          title = title + 'a';
        }
        /* eslint-enable */

        const requestObject = {
          message: 'a',
          card: {
            id: '1',
            style: 'file',
            title
          }
        };
        const validator = new Validator(requestObject);
        const isValid = validator.isCardValid(requestObject);
        const errors = validator.getErrors();

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(1);
        expect(errors[0]).toStrictEqual('object.card.title must be between 0 and 500 characters.');
      });
    });

    describe('when card thumbnail is provided in the request object with url node', () => {
      test('the validator response should be false', () => {
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

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(1);
        expect(errors[0]).toStrictEqual('object.card.thumbnail.url is a required property.');
      });
    });

    describe('when card thumbnail is provided in the request object with url node', () => {
      test('the validator response should be true', () => {
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

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });

    describe('when card activity is provided in the request object with html node', () => {
      test('the validator response should be false', () => {
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

        expect(isValid).toBeFalsy();
        expect(errors.length).toStrictEqual(1);
        expect(errors[0]).toStrictEqual('object.card.activity.html is a required property.');
      });
    });

    describe('when card activity is provided in the request object with html node', () => {
      test('the validator response should be true', () => {
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

        expect(isValid).toBeTruthy();
        expect(errors.length).toStrictEqual(0);
      });
    });
  });
});
