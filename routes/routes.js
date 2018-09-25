var express = require('express');
var { users, careers } = require('../controller/portalController');

var router = express.Router();

router.route('/api/v1/users/:userid').get(users.getUser);
router.route('/api/v1/users').get(users.getUsers);
router.route('/api/v1/users').post(users.postUsers);
router.route('/api/v1/users/:userid').delete(users.delUser);

router.route('/api/v1/careers/:careerid').get(careers.getCareer);
router.route('/api/v1/careers').post(careers.postCareers);
router.route('/api/v1/careers').get(careers.getCareers);
router.route('/api/v1/careers/:careerid').delete(careers.delCareer);

router.route('/api/v1/doc/:docid').get(docs.getDoc);
router.route('/api/v1/doc').post(docs.postDocs);
router.route('/api/v1/doc').get(docs.getDocs);
router.route('/api/v1/doc/:docid').delete(docs.delDoc);

module.exports = router;