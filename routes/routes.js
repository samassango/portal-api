var express = require('express');
var { users, careers } = require('../controller/portalController');

var router = express.Router();

router.route('/api/v1/user/:userid').get(users.getUser);
router.route('/api/v1/users').get(users.getUsers);
router.route('/api/v1/users').post(users.postUsers);
router.route('/api/v1/users/:userid').delete(users.delUser);

router.route('/api/v1/career/:careerid').get(careers.getCareer);
router.route('/api/v1/careers').post(careers.postCareers);
router.route('/api/v1/careers').get(careers.getCareers);
router.route('/api/v1/careers/:careerid').delete(careers.delCareer);

module.exports = router;