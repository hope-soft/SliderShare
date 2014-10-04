/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
	console.log(res.user);
  res.render('index', {
    title: 'Home'
  });
};