var router = require('express').Router();

router.use('/api/todos', require('./todoController'));
router.use('/api/users', require('./userController'));

router.get('/', function(req, res) {
    res.send('Home page')
});

router.get('/about', function(req, res) {
    res.send('Learn about us')
});

module.exports = router;