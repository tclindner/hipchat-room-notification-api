const request = require('request');
const HipChatRoomNotification = require('./../src/HipChatRoomNotification');

/* eslint camelcase: 'off' */

describe('HipChatRoomNotification Network Unit Tests', () => {
  let notification;

  beforeEach(() => {
    notification = new HipChatRoomNotification('https://www.example.com', '1', 'abcd1234');
  });

  afterEach(() => {
    request.post.clearMock();
  });

  test('successful post - basic message', async () => {
    notification.setMessage('test');

    jest.spyOn(request, 'post');
    request.post.mockReturnValue(null, {statusCode: 204}, {});
    const result = await notification.send();

    expect(result).toStrictEqual('successfully posted to hipchat');
  });

  test('successful post - card', async () => {
    notification.setMessage('message');
    notification.addCard('1', 'file', 'title');

    jest.spyOn(request, 'post');
    request.post.mockReturnValue(null, {statusCode: 204}, {});
    const result = await notification.send();

    expect(result).toStrictEqual('successfully posted to hipchat');
  });

  test('bad post', async () => {
    jest.spyOn(request, 'post');
    request.post.mockReturnValue(null, {statusCode: 400}, {});

    await expect(notification.send()).rejects;
  });

  test('invalid basic request object - failed validation', async () => {
    jest.spyOn(request, 'post');
    request.post.mockReturnValue(null, {statusCode: 204}, {});

    await expect(notification.send()).rejects.toThrow(Error);
  });

  test('invalid card request object - failed validation', async () => {
    jest.spyOn(request, 'post');
    request.post.mockReturnValue(null, {statusCode: 204}, {});
    notification.addCard('1', 'file', 'title');

    await expect(notification.send()).rejects.toThrow(Error);
  });
});
