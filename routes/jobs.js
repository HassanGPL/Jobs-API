const express = require('express');
const jobsController = require('../controllers/jobs');

const router = express.Router();

router.route('/')
    .get(jobsController.getAllJobs)
    .post(jobsController.createJob);

router.route('/:id')
    .get(jobsController.getJob)
    .patch('/:id', jobsController.editJob)
    .delete('/:id', jobsController.deleteJob);


module.exports = router;