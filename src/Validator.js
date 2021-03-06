const noErrors = 0;
const notFound = -1;

class Validator {
  /**
   * Creates an instance of Validator.
   * @param {String} requestObject     HipChat API object
   *
   * @memberOf Validator
   */
  constructor(requestObject) {
    this.requestObject = requestObject;
    this.errors = [];
  }

  /**
   * Validates basic request object
   *
   * @returns {Boolean} True if valid, false if invalid
   *
   * @memberOf Validator
   */
  isBasicValid() {
    this._valdateBasicProperties();

    return this.errors.length === noErrors;
  }

  /**
   * Validates card request object
   *
   * @returns {Boolean} True if valid, false if invalid
   *
   * @memberOf Validator
   */
  isCardValid() {
    this._valdateBasicProperties();
    this._valdateCardProperties();

    return this.errors.length === noErrors;
  }

  /**
   * Gets an array of errors
   *
   * @returns {Array} Array of error messages
   *
   * @memberOf Validator
   */
  getErrors() {
    return this.errors;
  }

  /**
   * Validates basic message properties
   *
   * @returns {Undefined} No return
   *
   * @memberOf Validator
   */
  _valdateBasicProperties() {
    this._validateFrom();
    this._validateMessageFormat();
    this._validateColor();
    this._validateAttachTo();
    this._validateNotify();
    this._validateMessage();
  }

  /**
   * Validates card properties
   *
   * @returns {Undefined} No return
   *
   * @memberOf Validator
   */
  _valdateCardProperties() {
    this._validateStyle();
    this._validateFormat();
    this._validateTitle();
    this._validateThumbnail();
    this._validateActivity();
    this._validateId();
  }

  /**
   * Validate from attribute
   *
   * HipChat's API requires the string to be between 0 and 64 characters.
   *
   * @returns {Undefined} No return
   */
  _validateFrom() {
    const maxFromLength = 64;

    // eslint-disable-next-line no-prototype-builtins
    if (this.requestObject.hasOwnProperty('from')) {
      if (this.requestObject.from.length > maxFromLength) {
        this.errors.push(`object.from must be between 0 and ${maxFromLength} characters.`);
      }
    }
  }

  /**
   * Validate message_format attribute
   *
   * HipChat's API requires a value of 'html' or 'text'
   *
   * @returns {Undefined} No return
   */
  _validateMessageFormat() {
    const validValues = ['html', 'text'];

    // eslint-disable-next-line no-prototype-builtins
    if (this.requestObject.hasOwnProperty('message_format')) {
      if (validValues.indexOf(this.requestObject.message_format) === notFound) {
        this.errors.push(`object.message_format must be one of: ${validValues.join(', ')}.`);
      }
    }
  }

  /**
   * Validate color attribute
   *
   * HipChat's API requires a value of 'yellow', 'green', 'red', 'purple', 'gray', or 'random'
   *
   * @returns {Undefined} No return
   */
  _validateColor() {
    const validValues = ['yellow', 'green', 'red', 'purple', 'gray', 'random'];

    // eslint-disable-next-line no-prototype-builtins
    if (this.requestObject.hasOwnProperty('color')) {
      if (validValues.indexOf(this.requestObject.color) === notFound) {
        this.errors.push(`object.color must be one of: ${validValues.join(', ')}.`);
      }
    }
  }

  /**
   * Validate attach_to attribute
   *
   * HipChat's API requires the string to be between 0 and 36 characters.
   *
   * @returns {Undefined} No return
   */
  _validateAttachTo() {
    const maxFromLength = 36;

    // eslint-disable-next-line no-prototype-builtins
    if (this.requestObject.hasOwnProperty('attach_to')) {
      if (this.requestObject.attach_to.length > maxFromLength) {
        this.errors.push(`object.attach_to must be between 0 and ${maxFromLength} characters.`);
      }
    }
  }

  /**
   * Validate notify attribute
   *
   * HipChat's API requires a boolean.
   *
   * @returns {Undefined} No return
   */
  _validateNotify() {
    // eslint-disable-next-line no-prototype-builtins
    if (this.requestObject.hasOwnProperty('notify')) {
      if (typeof this.requestObject.notify !== 'boolean') {
        this.errors.push('object.notify must be true or false.');
      }
    }
  }

  /**
   * Validate message attribute
   *
   * HipChat's API requires the string to be between 0 and 10000 characters.
   *
   * @returns {Undefined} No return
   */
  _validateMessage() {
    const maxFromLength = 10000;

    // eslint-disable-next-line no-prototype-builtins
    if (this.requestObject.hasOwnProperty('message')) {
      if (this.requestObject.message.length > maxFromLength) {
        this.errors.push(`object.message must be between 0 and ${maxFromLength} characters.`);
      }
    } else {
      this.errors.push('object.message is a required property.');
    }
  }

  /**
   * Validate card.style attribute
   *
   * HipChat's API requires a value of 'file', 'image', 'application', 'link', or 'media'
   *
   * @returns {Undefined} No return
   */
  _validateStyle() {
    const validValues = ['file', 'image', 'application', 'link', 'media'];

    // eslint-disable-next-line no-prototype-builtins
    if (this.requestObject.hasOwnProperty('card')) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.requestObject.card.hasOwnProperty('style')) {
        if (validValues.indexOf(this.requestObject.card.style) === notFound) {
          this.errors.push(`object.card.style must be one of: ${validValues.join(', ')}.`);
        }
      } else {
        this.errors.push('object.card.style is a required property.');
      }
    }
  }

  /**
   * Validate card.format attribute
   *
   * HipChat's API requires a value of 'compact' or 'medium'
   *
   * @returns {Undefined} No return
   */
  _validateFormat() {
    const validValues = ['compact', 'medium'];

    // eslint-disable-next-line no-prototype-builtins
    if (this.requestObject.hasOwnProperty('card')) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.requestObject.card.hasOwnProperty('format')) {
        if (validValues.indexOf(this.requestObject.card.format) === notFound) {
          this.errors.push(`object.card.format must be one of: ${validValues.join(', ')}.`);
        }
      }
    }
  }

  /**
   * Validate card.title attribute
   *
   * HipChat's API requires the string to be between 0 and 500 characters.
   *
   * @returns {Undefined} No return
   */
  _validateTitle() {
    const maxFromLength = 500;

    // eslint-disable-next-line no-prototype-builtins
    if (this.requestObject.hasOwnProperty('card')) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.requestObject.card.hasOwnProperty('title')) {
        if (this.requestObject.card.title.length > maxFromLength) {
          this.errors.push(`object.card.title must be between 0 and ${maxFromLength} characters.`);
        }
      } else {
        this.errors.push('object.card.title is a required property.');
      }
    }
  }

  /**
   * Validate card.thumbnail attribute
   *
   * HipChat's API requires the url attribute to set if a thumbnail is provided.
   *
   * @returns {Undefined} No return
   */
  _validateThumbnail() {
    // eslint-disable-next-line no-prototype-builtins
    if (this.requestObject.hasOwnProperty('card')) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.requestObject.card.hasOwnProperty('thumbnail')) {
        // eslint-disable-next-line no-prototype-builtins
        if (!this.requestObject.card.thumbnail.hasOwnProperty('url')) {
          this.errors.push('object.card.thumbnail.url is a required property.');
        }
      }
    }
  }

  /**
   * Validate card.activity attribute
   *
   * HipChat's API requires the html attribute to set if an activity is provided.
   *
   * @returns {Undefined} No return
   */
  _validateActivity() {
    // eslint-disable-next-line no-prototype-builtins
    if (this.requestObject.hasOwnProperty('card')) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.requestObject.card.hasOwnProperty('activity')) {
        // eslint-disable-next-line no-prototype-builtins
        if (!this.requestObject.card.activity.hasOwnProperty('html')) {
          this.errors.push('object.card.activity.html is a required property.');
        }
      }
    }
  }

  /**
   * Validate card.id attribute
   *
   * HipChat's API requires an id attribute
   *
   * @returns {Undefined} No return
   */
  _validateId() {
    // eslint-disable-next-line no-prototype-builtins
    if (this.requestObject.hasOwnProperty('card')) {
      // eslint-disable-next-line no-prototype-builtins
      if (!this.requestObject.card.hasOwnProperty('id')) {
        this.errors.push('object.card.id is a required property.');
      }
    }
  }
}

module.exports = Validator;
