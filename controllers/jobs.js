const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

// Get ALl Jobs
exports.getAllJobs = async (req, res, next) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

// Get Job
exports.getJob = async (req, res, next) => {
    const { user: { userId }, params: { id } } = req;
    const job = await Job.findOne({
        _id: id,
        createdBy: userId
    });

    if (!job) {
        throw new NotFoundError(`No Job With This ID : ${id}`);
    }

    res.status(StatusCodes.OK).json({ job });
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