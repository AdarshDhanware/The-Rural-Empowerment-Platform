import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const uploadJob = asyncHandler(async (req, res) => {
  const { username, description, location, wage, phoneNo } = req.body;
  if (!username || !description || !location || !wage || !phoneNo) {
    throw new ApiError(400, "All details required");
  }

  const job = await Job.create({
    username: username,
    description,
    location,
    wage,
    phoneNo,
  });

  const jobCreated = await Job.findById(job._id);
  if (!jobCreated) {
    throw new ApiError(500, "Something went wrong while uploading a job.");
  }

  return res.status(201).json(
    new ApiResponse(200, "Job uploaded successfully.")
  );
});

export { uploadJob };
