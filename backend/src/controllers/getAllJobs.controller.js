import { Job } from "../models/job.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllJobs=asyncHandler(async(req,res)=>{
    const jobs=await Job.find();
    if(!jobs || jobs.length < 1){
        return res.status(200).json(new ApiResponse(500,[],"No jobs available"));
    }
    return res.status(200).json(new ApiResponse(200,jobs,"Job fetched successfully"));
})

export {getAllJobs};