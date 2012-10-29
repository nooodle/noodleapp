'use strict';

var request = require('request');

var URL_BITLY = /bit\.ly\//;
var URL_ISGD = /is\.gd\//;
var URL_TCO = /t\.co\//;
var URL_JMP = /j\.mp\//;
var URL_TINYURL = /tinyurl\.com\//;

// Adds protocol if necessary.
//
// Get the real url if this is a short url
// Assuming short urls are under 25 characters
exports.process = function(media, url, quoteFix, client, callback) {
  // Starts with a valid initial domain character, but does not already have a http protocol.  Doesn't try to handle IDN for now.
  if (/^[a-z0-9]/i.test(media) && !/^https?:\/\//.test(media)) {
      media = 'http://' + media;
      quoteFix = 'http://' + quoteFix;
  }

  var resp = {
    media: media
  };

  if (quoteFix.length < 28 &&
     (quoteFix.match(URL_BITLY) ||
     quoteFix.match(URL_ISGD) ||
     quoteFix.match(URL_TCO) ||
     quoteFix.match(URL_JMP) ||
     quoteFix.match(URL_TINYURL))) {

    client.get('shorturl:' + quoteFix, function(err, url) {
      if (err) {
        callback(null, resp);

      } else {
        if (!url) {
          request({
            method: 'HEAD',
            url: quoteFix,
            followAllRedirects: true }, function (errCheck, response) {
              if (errCheck) {
                callback(null, resp);

              } else {
                resp = {
                  media: response.request.href
                };

                client.set('shorturl:' + quoteFix, response.request.href);
                client.expire('shorturl:' + quoteFix, 60 * 60 * 6) // 6 hours
                callback(null, resp);
              }
          });

        } else {
          resp = {
            media: url
          };

          callback(null, resp);
        }
      }
    });

  } else {
    callback(null, resp);
  }
};
