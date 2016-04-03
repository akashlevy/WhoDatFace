var recognize = require('../lib/recognize'), graph = require('fbgraph');
module.exports = function(req, res) {
  graph.setAccessToken(req.body.accessToken);
  
  var params = {
    source: req.body.source,
    privacy: { value: 'SELF' }
  };

  graph.post('/me/photos', params, function(err, r) {
    recognize(r.id, function(result) { res.send(result); })
  });
};
