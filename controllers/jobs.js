const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

// Get ALl Jobs
exports.getAllJobs = async (req, res, next) => {
    const Jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ Jobs, count: Jobs.length });
    // res.send('All Jobs ...');
}

// Get Job
exports.getJob = (req, res, next) => {
    res.send('Get Specific Job ...');
}

// Delete Job
exports.deleteJob = (req, res, next) => {
    res.send('Delete Specific Job ...');
}

// Edit Job
exports.editJob = (req, res, next) => {
    res.send('Edit Specific Job ...');
}

// Create Job
exports.createJob = async (req, res, next) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}