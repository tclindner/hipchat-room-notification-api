const request = require('request');
const HipChatRoomNotification = require('./../src/HipChatRoomNotification');

/* eslint camelcase: 'off' */

describe('HipChatRoomNotification Network Unit Tests', () => {
  let notification;

  beforeEach(() => {
    notification = new HipChatRoomNotification('https://www.example.com', '1', 'abcd1234');
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('successful post - basic message', async () => {
    notification.setMessage('test');

    jest.spyOn(request, 'post');
    request.post.mockReturnValue(null, {statusCode: 204}, {});
    const result = await notification.send();

    expect(result).toStrictEqual('successfully posted to hipchat');
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('successful post - card', async () => {
    notification.setMessage('message');
    notification.addCard('1', 'file', 'title');

    jest.spyOn(request, 'post');
    request.post.mockReturnValue(null, {statusCode: 204}, {});
    const result = await notification.send();

    expect(result).toStrictEqual('successfully posted to hipchat');
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('bad post', async () => {
    jest.spyOn(request, 'post');
    request.post.mockReturnValue(null, {statusCode: 400}, {});

    // eslint-disable-next-line jest/valid-expect
    await expect(notification.send());
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('invalid basic request object - failed validation', async () => {
    jest.spyOn(request, 'post');
    request.post.mockReturnValue(null, {statusCode: 204}, {});

    await expect(notification.send()).rejects.toThrow(Error);
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('invalid card request object - failed validation', async () => {
    jest.spyOn(request, 'post');
    request.post.mockReturnValue(null, {statusCode: 204}, {});
    notification.addCard('1', 'file', 'title');

    await expect(notification.send()).rejects.toThrow(Error);
  });
});
