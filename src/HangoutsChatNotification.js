'use strict';

const request = require('request');
const Validator = require('./Validator');
const SUCCESSFUL_POST = 200;

/* eslint no-undefined: 'off', object-curly-newline: 'off', id-length: 'off', class-methods: 'off', camelcase: 'off', max-params: 'off', no-unused-vars: 'off' */

class HangoutsChatNotification {

  /**
   * Creates an instance of HangoutsChatNotification.
   *
   * @param {String}  webhookUrl     Hangouts Chat webhook URL
   *
   * @memberOf HangoutsChatNotification
   */
  constructor(webhookUrl) {
    this.apiUrl = webhookUrl

    this.isCard = false;
    this.defaultedRequestObj = undefined;

    /* eslint-disable camelcase */
    this.requestJson = {
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
   * @memberOf HangoutsChatNotification
   */
  /*
  setFrom(name) {
    this.requestJson.from = name;
  }
   */

  /**
   * Sets message_format to 'text'
   *
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  /*
  setTextMessageFormat() {
    /* eslint-disable camelcase */
  /*
    this.requestJson.message_format = 'text';
    /* eslint-enable camelcase */
  /*
  }
   */

  /**
   * Sets color of the message
   *
   * Valid values include: yellow, green, red, purple, gray, and random.
   *
   * @param {String} color Color of the card
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  /*
  setColor(color) {
    this.requestJson.color = color;
  }
   */

  /**
   * Sets notify to true
   *
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  /*
  shouldNotify() {
    this.requestJson.notify = true;
  }
   */

  /**
   * Sets message of notfication
   *
   * @param {String} message The message body
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  setTextMessage(message) {
    this.requestJson.text = message;
  }

  /**
   * Adds a card to message
   *
   * @param {String} id An id that will help Hangouts Chat recognise the same card when it is sent multiple times
   * @param {String} style Type of the card. Valid values are file, image, application, link, and media
   * @param {String} title The title of the card
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  addCard(title, subtitle) {
    if (!this.requestJson.hasOwnProperty('cards')) {
      this.requestJson.cards = [{header: {}, sections: []}];
    }
    this.requestJson.cards[0].header.title = title;
    if (subtitle) {
      this.requestJson.cards[0].header.subtitle = subtitle;
    }
    this.isCard = true;
  }

  /**
   * Adds thumbnail to card
   *
   * @param {String} url The thumbnail url
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  addCardThumbnail(url, style = 'IMAGE') {
    if (!this.requestJson.hasOwnProperty('cards')) {
      this.requestJson.cards = [{header: {}, sections: []}];
    }
    this.requestJson.cards[0].header.imageUrl = url;
    this.requestJson.cards[0].header.imageStyle = style;
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
   * @memberOf HangoutsChatNotification
   */
  addCardThumbnailDetails(url, url2x, width, height) {
    this.addCardThumbnail(url);
  }

  /**
   * Adds activity to card
   *
   * @param {String} html Html for the activity to show in one line a summary of the action that happened
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  addActivity(html) {
    this.requestJson.cards[0].sections.push({
      widgets: [{
        textParagraph: {
          text: html
        }
      }]
    });
  }

  /**
   * Adds activity with icon to card
   *
   * @param {String} html Html for the activity to show in one line a summary of the action that happened
   * @param {String} iconUrl The url where the icon is
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  addActivityWithIcon(html, iconUrl) {
    this.requestJson.cards[0].sections.push({
      widgets: [{
        keyValue: {
          content: html,
          contentMultiline: 'true',
          iconUrl: iconUrl
        }
      }]
    });
  }

  /**
   * Adds activity with icon that has retina support to card
   *
   * @param {String} html Html for the activity to show in one line a summary of the action that happened
   * @param {String} iconUrl The url where the icon is
   * @param {String} icon2xUrl The url for the icon in retina
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  addActivityWithIconDetails(html, iconUrl, icon2xUrl) {
    this.addActivityWithIcon(html, iconUrl);
  }

  /**
   * Sets card to compact format
   *
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  /*
  setCardToCompactFormat() {
    this.requestJson.card.format = 'compact';
  }
   */

  /**
   * Sets card to medium format
   *
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  /*
  setCardToMediumFormat() {
    this.requestJson.card.format = 'medium';
  }
   */

  /**
   * Sets card url
   *
   * @param {String} url URL that should open when the card is clicked
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  addCardUrl(url) {
    this.requestJson.cards[0].sections.push({
      widgets: [{
        keyValue: {
          content: url,
          onClick: {
            openLink: {
              url: url
            }
          }
        }
      }]
    });
  }

  /**
   * Sets card description
   *
   * @param {String} description The description in the specific format
   * @param {String} format Description format. Valid values include: html and text
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  addCardDescription(description, format) {
    this.addActivity(html);
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
   * @memberOf HangoutsChatNotification
   */
  addCardAttribute(label, content, style) {
    const attribute = {
      keyValue: {
        topLabel: label,
        content: this._getLozengeStyle(content, style)
      }
    }
    this._addCardAttribute(attribute);
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
   * @memberOf HangoutsChatNotification
   */
  addCardAttributeWithUrl(label, content, style, url) {
    const attribute = {
      keyValue: {
        topLabel: label,
        content: this._getLozengeStyle(content, style),
        onClick: {
          openLink: {
            url: url
          }
        }
      }
    }
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
   * @memberOf HangoutsChatNotification
   */
  addCardAttributeWithIcon(label, content, style, iconUrl) {
    const attribute = {
      keyValue: {
        topLabel: label,
        content: this._getLozengeStyle(content, style)
      }
    }
    if (iconUrl.includes('//')) {
      attribute.keyValue.iconUrl = iconUrl;
    } else {
      attribute.keyValue.icon = iconUrl;
    }
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
   * @memberOf HangoutsChatNotification
   */
  addCardAttributeWithIconAndUrl(label, content, style, iconUrl, url) {
    const attribute = {
      keyValue: {
        topLabel: label,
        content: this._getLozengeStyle(content, style),
        onClick: {
          openLink: {
            url: url
          }
        }
      }
    }
    if (iconUrl.includes('//')) {
      attribute.keyValue.iconUrl = iconUrl;
    } else {
      attribute.keyValue.icon = iconUrl;
    }
    this._addCardAttribute(attribute);
  }

  /**
   * Adds an attribute to a card
   *
   * @param {Object} attributeObj Attribute object
   * @returns {undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  _addCardAttribute(attributeObj) {
    this.cardAttributes.push(attributeObj);
  }


  _getLozengeStyle(content, style) {
    let color;
    switch(style) {
      case 'lozenge-current':
        color = '#594300';
        break;
      case 'lozenge-error':
        color = '#d04437';
        break;
      case 'lozenge-success':
        color = '#14892c';
        break;
      case 'lozenge-complete':
        color = '#4a6785';
        break;
      case 'lozenge-moved':
        color = '#815b3a';
        break;
      default:
        color = '#333';
    }
   const styledContent = `<font color="${color}">${content}</font>`
   return styledContent;
  }
  /**
   * Add icon to card
   *
   * @param {String} iconUrl The url where the icon is
   * @returns {undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  addCardIcon(iconUrl) {
    this.requestJson.card.icon = {
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
   * @memberOf HangoutsChatNotification
   */
  addCardIconDetails(iconUrl, icon2xUrl) {
    this.addCardIcon(iconUrl);
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
   * @memberOf HangoutsChatNotification
   */
  setRequestDefaults(defaults) {
    this.defaultedRequestObj = request.defaults(defaults);
  }

  /**
   * Clears any previously set default options.
   *
   * @returns {Undefined} No return
   *
   * @memberOf HangoutsChatNotification
   */
  clearRequestDefaults() {
    this.defaultedRequestObj = undefined;
  }

  /**
   * POST a message to the Hangouts Chat room API
   *
   * @returns {Promise} A Promise
   *
   * @memberOf HangoutsChatNotification
   */
  send() {
    return new Promise((resolve, reject) => {
      const validator = new Validator(this.requestJson);

      if ((!this.isCard && validator.isBasicValid()) || (this.isCard && validator.isCardValid())) {
        if (this.cardAttributes.length) {
          this.requestJson.cards[0].sections.push({
            widgets: [ this.cardAttributes ]
          });
        }
        console.log(JSON.stringify(this.requestJson));
        const requestConfig = {
          uri: this.apiUrl,
          method: 'POST',
          json: this.requestJson,
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const requestObj = this.defaultedRequestObj || request;

        requestObj.post(requestConfig, function(error, response, body) {
          if (!error && response.statusCode === SUCCESSFUL_POST) {
            resolve('successfully posted to hangouts-chat');
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

module.exports = HangoutsChatNotification;
