# hangouts-chat-api

> Node.js wrapper for Google's Hangouts Chat REST API

[![license](https://img.shields.io/github/license/mwpeterson/hangouts-chat-api.svg?maxAge=2592000&style=flat-square)](https://github.com/mwpeterson/hangouts-chat-api/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/hangouts-chat-api.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/hangouts-chat-api)
[![Travis](https://img.shields.io/travis/mwpeterson/hangouts-chat-api.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/mwpeterson/hangouts-chat-api)
[![Dependency Status](https://david-dm.org/mwpeterson/hangouts-chat-api.svg?style=flat-square)](https://david-dm.org/mwpeterson/hangouts-chat-api)
[![devDependency Status](https://david-dm.org/mwpeterson/hangouts-chat-api/dev-status.svg?style=flat-square)](https://david-dm.org/mwpeterson/hangouts-chat-api#info=devDependencies)

## What is hangouts-chat-api?

hangouts-chat-api makes sending notifications to Google Hangouts Chat rooms easy.

## How do I install it?

First thing first, let's make sure you have the necessary pre-requisites.

### System Dependencies

#### Node

* [Node.js](https://nodejs.org/) - v4.2.0+
* [npm](http://npmjs.com) - v2.14.7+

### Package

* `npm install hangouts-chat-api`

## API

### HangoutsChatNotification(domain, roomId, authToken)

Creates an instance of HangoutsChatNotification

#### domain

Type: `string`

The domain the HangoutsChat server is running on. Ex: https://www.example.com

#### roomId

Type: `string`

The room id of the HangoutsChat room the notification should be posted to.

#### authToken

Type: `string`

The auth token for the HangoutsChat room the notification should be posted to.

### .setFrom(name)

Sets the from name of the message

#### name

Type: `string`

A label to be shown in addition to the sender's name

### .setTextMessageFormat()

Set message format to 'text' instead of 'html'.

### .setColor(color)

Sets color of the message

#### color

Type: `string`

Valid values include: yellow, green, red, purple, gray, and random.

### .shouldNotify()

Message notifies members of the room.

### .setMessage(message)

Sets message of notfication

#### message

Type: `string`

The message body

### .addCard(id, style, title)

Converts notification to card instead of a basic message.

#### id

Type: `string`

An id that will help HangoutsChat recognise the same card when it is sent multiple times.

#### style

Type: `string`

Type of the card. Valid values are file, image, application, link, and media.

#### title

Type: `string`

The title of the card.

### .addCardThumbnail(url)

Adds thumbnail to card.

#### url

Type: `string`

The thumbnail url.

### .addCardThumbnailDetails(url, url2x, width, height)

Adds thumbnail with retina support to card.

#### url

Type: `string`

The thumbnail url.

#### url2x

Type: `string`

The thumbnail url in retina.

#### width

Type: `string`

The original width of the image.

#### height

Type: `string`

The original height of the image.

### .addActivity(html)

Adds activity to card.

#### html

Type: `string`

Html for the activity to show in one line a summary of the action that happened.

### .addActivityWithIcon(html, iconUrl)

Add activity with icon to card.

#### html

Type: `string`

Html for the activity to show in one line a summary of the action that happened.

#### iconUrl

Type: `string`

The url where the icon is.

### .addActivityWithIconDetails(html, iconUrl, icon2xUrl)

Adds activity with icon that has retina support to card.

#### html

Type: `string`

Html for the activity to show in one line a summary of the action that happened.

#### iconUrl

Type: `string`

The url where the icon is.

#### icon2xUrl

Type: `string`

The url for the icon in retina.

### .setCardToCompactFormat()

Sets card to compact format.

### .setCardToMediumFormat(id, style, title)

Sets card to medium format.

### .addCardUrl(url)

Sets card url

#### url

Type: `string`

URL that should open when the card is clicked.

### .addCardDescription(description, format)

Sets card description.

#### description

Type: `string`

The description in the specific format.

#### format

Type: `string`

Description format. Valid values include: html and text.

### .addCardAttribute(label, description, style)

Adds an attribute to a card.

#### label

Type: `string`

Label for the attribute of the card.

#### description

Type: `string`

Value of the attribute of the card.

#### style

Type: `string`

AUI Integrations for now supporting only lozenges.
Valid values: lozenge-success, lozenge-error, lozenge-current, lozenge-complete, lozenge-moved, and lozenge

### .addCardAttributeWithUrl(label, description, style, url)

Adds an attribute to a card.

#### label

Type: `string`

Label for the attribute of the card.

#### description

Type: `string`

Value of the attribute of the card.

#### style

Type: `string`

AUI Integrations for now supporting only lozenges.
Valid values: lozenge-success, lozenge-error, lozenge-current, lozenge-complete, lozenge-moved, and lozenge

#### url

Type: `string`

Url to be opened when a user clicks on the label

### .addCardAttributeWithIcon(label, description, style, iconUrl)

Adds an attribute to a card.

#### label

Type: `string`

Label for the attribute of the card.

#### description

Type: `string`

Value of the attribute of the card.

#### style

Type: `string`

AUI Integrations for now supporting only lozenges.
Valid values: lozenge-success, lozenge-error, lozenge-current, lozenge-complete, lozenge-moved, and lozenge

#### iconUrl

Type: `string`

The url where the icon is

### .addCardAttributeWithIconAndUrl(label, description, style, iconUrl, url)

Adds an attribute to a card.

#### label

Type: `string`

Label for the attribute of the card.

#### description

Type: `string`

Value of the attribute of the card.

#### style

Type: `string`

AUI Integrations for now supporting only lozenges.
Valid values: lozenge-success, lozenge-error, lozenge-current, lozenge-complete, lozenge-moved, and lozenge

#### iconUrl

Type: `string`

The url where the icon is

#### url

Type: `string`

Url to be opened when a user clicks on the label

### .addCardIcon(iconUrl)

Add icon to card.

#### iconUrl

Type: `string`

The url where the icon is.

### .addCardIconDetails(iconUrl, icon2xUrl)

Add icon to card.

#### iconUrl

Type: `string`

The url where the icon is.

#### icon2xUrl

Type: `string`

The url for the icon in retina.

### .setRequestDefaults(defaults)

Sets the default options applied to all future requests.

#### defaults

Type: `object`

Default request options, see the popular [request library](https://github.com/request/request#requestdefaultsoptions) for options.

### .clearRequestDefaults()

Clears any previously set default options.

### .send()

POST a message to the HangoutsChat room API

Returns a Promise. If it succeeds, a string will be returned with a value of `successfully posted to hangouts-chat`. If it fails, an array of errors is returned.

## Examples

### Basic Message

```javascript
const hangoutsChatNotification = new HangoutsChatNotification('https://www.example.com', '1', 'abcd1234');

hangoutsChatNotification.setFrom('From');
hangoutsChatNotification.setColor('green');
hangoutsChatNotification.shouldNotify();
hangoutsChatNotification.setMessage('My message.');

hangoutsChatNotification.send()
  .then((result) => {

  }).catch((error) => {

  });
```

### Simple Card

```javascript
const notification = new HangoutsChatNotification('https://www.example.com', '1', 'abcd1234');

notification.setFrom('From');
notification.setColor('green');
notification.shouldNotify();
notification.setMessage('My message.');
notification.addCard('1', 'file', 'Title');

notification.send()
  .then((result) => {

  }).catch((error) => {

  });
```

### Complex Card

```javascript
const notification = new HangoutsChatNotification('https://www.example.com', '1', 'abcd1234');

notification.setFrom('From');
notification.setColor('green');
notification.shouldNotify();
notification.setMessage('My message.');
notification.addCard('1', 'file', 'Title');
notification.addCardAttribute('Size', '128kb', 'lozenge-success');
notification.addCardAttribute('Date', '12/27/2017', 'lozenge-success');

notification.send()
  .then((result) => {

  }).catch((error) => {

  });
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

## Release History

Please see [CHANGELOG.md](CHANGELOG.md).

## License

Copyright (c) 2018 Michael Peterson. Licensed under the MIT license.
