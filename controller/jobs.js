import { StatusCodes } from "http-status-codes";
import BadRequest from "../errors/bad-request.js";
import NotFoundError from "../errors/not-found.js";
import Job from "../model/Job.js";

export const getAllJobs = async (req, res) => {
  // sort the jobs based on created at
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");

  res.json(jobs);
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

export const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`no job found by user ${userId}`);
  }

  res.status(StatusCodes.OK).json(job);
};

export const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequest("all fields necessery");
  }

  const updatedJobObject = {};

  if (company) {
    updatedJobObject.company = company;
  }

  if (position) {
    updatedJobObject.position = position;
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    updatedJobObject,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`job with id ${jobId} not found`);
  }

  res.status(StatusCodes.OK).json(job);
};

export const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`job with id ${jobId} not found`);
  }

  res.status(StatusCodes.OK).json(job);
};
