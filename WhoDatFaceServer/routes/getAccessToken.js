var config = require('../config'),
    graph = require('fbgraph');

module.exports = function(req, res) {
  if (!req.query.code) {
    var authUrl = graph.getOauthUrl({
      client_id: config.client_id,
      redirect_uri: 'http://local.host:' + config.port + '/getAccessToken',
      scope: config.scope
    });

    if (!req.query.error) res.redirect(authUrl);
    else res.send('access denied');
    return ;
  }

  graph.authorize({
    client_id:      config.client_id,
    redirect_uri:   'http://local.host:' + config.port + '/getAccessToken',
    client_secret:  config.client_secret,
    code:           req.query.code
  }, function (err, facebookRes) {
    res.send(facebookRes);
  });
}
