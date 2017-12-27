'use strict';

const request = require('request');
const Validator = require('./Validator');
const SUCCESSFUL_POST = 204;

/* eslint no-undefined: 'off', object-curly-newline: 'off', id-length: 'off', class-methods: 'off', camelcase: 'off', max-params: 'off', no-unused-vars: 'off' */

class HipChatRoomNotification {

  /**
   * Creates an instance of HipChatRoomNotification.
   *
   * @param {String}  domain     Domain the HipChat room API is hosted on including the protocol. Ex: https://www.hipchat.com
   * @param {Number}  roomId     HipChat room ID
   * @param {String}  authToken  Authentication token
   *
   * @memberOf HipChatRoomNotification
   */
  constructor(domain, roomId, authToken) {
    this.apiUrl = `${domain}/v2/room/${roomId}/notification`;
    this.authToken = authToken;
    this.isCard = false;
    this.defaultedRequestObj = undefined;

    /* eslint-disable camelcase */
    this.requestJson = {
      message_format: 'html',
      color: 'yellow',
      notify: false
    };
    /* eslint-enable camelcase */

    this.cardAttributes = [];
  }

  /**
   * Sets the from name of the message
   *
   * @param {String} name A label to be shown in addition to the sender's name
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  setFrom(name) {
    this.requestJson.from = name;
  }

  /**
   * Sets message_format to 'text'
   *
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  setTextMessageFormat() {
    /* eslint-disable camelcase */
    this.requestJson.message_format = 'text';
    /* eslint-enable camelcase */
  }

  /**
   * Sets color of the message
   *
   * Valid values include: yellow, green, red, purple, gray, and random.
   *
   * @param {String} color Color of the card
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  setColor(color) {
    this.requestJson.color = color;
  }

  /**
   * Sets notify to true
   *
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  shouldNotify() {
    this.requestJson.notify = true;
  }

  /**
   * Sets message of notfication
   *
   * @param {String} message The message body
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  setMessage(message) {
    this.requestJson.message = message;
  }

  /**
   * Adds a card to message
   *
   * @param {String} id An id that will help HipChat recognise the same card when it is sent multiple times
   * @param {String} style Type of the card. Valid values are file, image, application, link, and media
   * @param {String} title The title of the card
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addCard(id, style, title) {
    this.requestJson.card = {
      id: id,
      style: style,
      title: title
    };
    this.isCard = true;
  }

  /**
   * Adds thumbnail to card
   *
   * @param {String} url The thumbnail url
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addCardThumbnail(url) {
    this.requestJson.card.thumbnail = {
      url: url
    };
  }

  /**
   * Adds thumbnail with retina support to card
   *
   * @param {String} url The thumbnail url
   * @param {String} url2x The thumbnail url in retina
   * @param {String} width The original width of the image
   * @param {String} height The original height of the image
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addCardThumbnailDetails(url, url2x, width, height) {
    this.requestJson.card.thumbnail = {
      url: url,
      url2x: url2x,
      width: width,
      height: height
    };
  }

  /**
   * Adds activity to card
   *
   * @param {String} html Html for the activity to show in one line a summary of the action that happened
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addActivity(html) {
    this.requestJson.card.activity = {
      html: html
    };
  }

  /**
   * Adds activity with icon to card
   *
   * @param {String} html Html for the activity to show in one line a summary of the action that happened
   * @param {String} iconUrl The url where the icon is
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addActivityWithIcon(html, iconUrl) {
    this.requestJson.card.activity = {
      html: html,
      icon: {
        url: iconUrl
      }
    };
  }

  /**
   * Adds activity with icon that has retina support to card
   *
   * @param {String} html Html for the activity to show in one line a summary of the action that happened
   * @param {String} iconUrl The url where the icon is
   * @param {String} icon2xUrl The url for the icon in retina
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addActivityWithIconDetails(html, iconUrl, icon2xUrl) {
    this.requestJson.card.activity = {
      html: html,
      icon: {
        'url': iconUrl,
        'url@2x': icon2xUrl
      }
    };
  }

  /**
   * Sets card to compact format
   *
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  setCardToCompactFormat() {
    this.requestJson.card.format = 'compact';
  }

  /**
   * Sets card to medium format
   *
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  setCardToMediumFormat() {
    this.requestJson.card.format = 'medium';
  }

  /**
   * Sets card url
   *
   * @param {String} url URL that should open when the card is clicked
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addCardUrl(url) {
    this.requestJson.card.url = url;
  }

  /**
   * Sets card description
   *
   * @param {String} description The description in the specific format
   * @param {String} format Description format. Valid values include: html and text
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addCardDescription(description, format) {
    this.requestJson.card.description = {
      value: description,
      format: format
    };
  }

  /**
   * Adds an attribute to a card
   *
   * @param {String} label Label for the attribute of the card
   * @param {String} description Value of the attribute of the card
   * @param {String} style AUI Integrations for now supporting only lozenges.
   *                       Valid values: lozenge-success, lozenge-error, lozenge-current, lozenge-complete, lozenge-moved, and lozenge
   * @returns {undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addCardAttribute(label, description, style) {
    const attribute = {
      label: label,
      value: {
        label: description,
        style: style
      }
    };

    this.cardAttributes.push(attribute);
  }

  /**
   * Adds an attribute with url to a card
   *
   * @param {String} label Label for the attribute of the card
   * @param {String} description Value of the attribute of the card
   * @param {String} style AUI Integrations for now supporting only lozenges.
   *                       Valid values: lozenge-success, lozenge-error, lozenge-current, lozenge-complete, lozenge-moved, and lozenge
   * @param {String} url Url to be opened when a user clicks on the label
   * @returns {undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addCardAttributeWithUrl(label, description, style, url) {
    const attribute = {
      label: label,
      value: {
        label: description,
        style: style,
        url: url
      }
    };

    this._addCardAttribute(attribute);
  }

  /**
   * Adds an attribute with icon to a card
   *
   * @param {String} label Label for the attribute of the card
   * @param {String} description Value of the attribute of the card
   * @param {String} style AUI Integrations for now supporting only lozenges.
   *                       Valid values: lozenge-success, lozenge-error, lozenge-current, lozenge-complete, lozenge-moved, and lozenge
   * @param {String} iconUrl The url where the icon is
   * @returns {undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addCardAttributeWithIcon(label, description, style, iconUrl) {
    const attribute = {
      label: label,
      value: {
        label: description,
        style: style,
        icon: iconUrl
      }
    };

    this._addCardAttribute(attribute);
  }

  /**
   * Adds an attribute to a card
   *
   * @param {String} label Label for the attribute of the card
   * @param {String} description Value of the attribute of the card
   * @param {String} style AUI Integrations for now supporting only lozenges.
   *                       Valid values: lozenge-success, lozenge-error, lozenge-current, lozenge-complete, lozenge-moved, and lozenge
   * @param {String} iconUrl The url where the icon is
   * @param {String} url Url to be opened when a user clicks on the label
   * @returns {undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addCardAttributeWithIconAndUrl(label, description, style, iconUrl, url) {
    const attribute = {
      label: label,
      value: {
        label: description,
        style: style,
        icon: iconUrl,
        url: url
      }
    };

    this._addCardAttribute(attribute);
  }

  /**
   * Adds an attribute to a card
   *
   * @param {Object} attributeObj Attribute object
   * @returns {undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  _addCardAttribute(attributeObj) {
    if (this.requestJson.card.hasOwnProperty('attributes')) {
      this.requestJson.card.attributes.push(attributeObj);
    } else {
      this.requestJson.card.attributes = [attributeObj];
    }
  }

  /**
   * Add icon to card
   *
   * @param {String} iconUrl The url where the icon is
   * @returns {undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addCardIcon(iconUrl) {
    this.requestJson.icon = {
      url: iconUrl
    };
  }

  /**
   * Add icon to card
   *
   * @param {String} iconUrl The url where the icon is
   * @param {String} icon2xUrl The url for the icon in retina
   * @returns {undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  addCardIconDetails(iconUrl, icon2xUrl) {
    this.requestJson.icon = {
      'url': iconUrl,
      'url@2x': icon2xUrl
    };
  }

  /**
   * Gets the request JSON
   *
   * @returns {Object} API request object
   */
  _getRequestJson() {
    return this.requestJson;
  }

  /**
   * Sets the default options applied to all future requests.
   *
   * @param {Object} defaults - default request options, see the popular request library for options
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  setRequestDefaults(defaults) {
    this.defaultedRequestObj = request.defaults(defaults);
  }

  /**
   * Clears any previously set default options.
   *
   * @returns {Undefined} No return
   *
   * @memberOf HipChatRoomNotification
   */
  clearRequestDefaults() {
    this.defaultedRequestObj = undefined;
  }

  /**
   * POST a message to the HipChat room API
   *
   * @returns {Promise} A Promise
   *
   * @memberOf HipChatRoomNotification
   */
  send() {
    return new Promise((resolve, reject) => {
      const validator = new Validator(this.requestJson);

      if ((!this.isCard && validator.isBasicValid()) || (this.isCard && validator.isCardValid)) {
        const requestConfig = {
          uri: this.apiUrl,
          method: 'POST',
          json: this.requestJson,
          headers: {
            'Authorization': this.authToken,
            'Content-Type': 'application/json'
          }
        };

        const requestObj = this.defaultedRequestObj || request;

        requestObj(requestConfig, function(error, response, body) {
          if (!error && response.statusCode === SUCCESSFUL_POST) {
            resolve('successfully posted to hipchat');
          } else {
            reject(new Error([`${error} - ${response.statusCode}`]));
          }
        });
      } else {
        reject(new Error(validator.getErrors()));
      }
    });
  }

}

module.exports = HipChatRoomNotification;
