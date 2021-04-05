const providers = ['twitter', 'google'];

const callbacks = providers.map((provider, i) => {

  
  return  ("http://localhost:8080/" + provider+"/callback");
})

const [twitterURL, googleURL] = callbacks

exports.CLIENT_ORIGIN = ['http://127.0.0.1:3000', 'http://localhost:3000'];

exports.SESSION_SECRET = 'CitrylChat';

exports.TWITTER_CONFIG = {
  consumerKey: 'WaK2tdt179rHu8DAGd9sYmduY',
  consumerSecret: '1ULsMWbO6fqRFV1OBIgX01aunDB5JM7Ui4HSoyguBLVHjvqwQz',
  callbackURL: twitterURL,
}

exports.GOOGLE_CONFIG = {
  clientID: '280955988590-aq6tam1jp71bkm9mfqdhj4huohs78hvv.apps.googleusercontent.com',
  clientSecret: 'MvcVd_At8LzuWNlAKxOVE0rM',
  callbackURL: googleURL
}
