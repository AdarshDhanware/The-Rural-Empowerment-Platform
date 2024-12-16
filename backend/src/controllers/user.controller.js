import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Job } from "../models/job.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access or refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({ // testing using postman
  //   message: "ok",
  // });

  // steps
  // 1. get data from frontend
  // 2. validation - not empty
  // 3. check if user already exists on the basis of phone no
  // 4. create user object -> create entry in db
  // 5. remove password
  // 6. check for user creation created or not
  // 7. return response (res)

  const { username, phoneNo, password } = req.body;
  console.log("username", username);
  console.log("password", password);
  if ([username, phoneNo, password].some((field) => field?.trim() === "")) {
    console.log("hi there djfsdfkjsf");
    throw new ApiError(400, "All fields are required");
  }

  const exixtedUser = await User.findOne({ phoneNo });

  console.log(exixtedUser);

  if (exixtedUser)
    throw new ApiError(409, "User already exists with this phone number");

  const user = await User.create({
    username: username.toLowerCase(),
    phoneNo,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log(createdUser);
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User rigistered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req->data req.body
  // find phone no
  // find user
  // password check if not return wrong phone no or password
  // access token and refresh token and send it to user
  // send cookies secure cookies

  const { phoneNo, password } = req.body;

  if (!phoneNo || !password) {
    throw new ApiError(400, "All fields are required.", false);
  }

  const user = await User.findOne({ phoneNo });

  if (!user) {
    throw new ApiError(404, "User does not exists.");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Phone No or Password is wrong.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request. Refresh token missing.");
  }

  console.log("Incoming Refresh Token:", incomingRefreshToken);

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    console.log("Decoded Token:", decodedToken);

    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token. User not found.");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or already used.");
    }

    // Generate new tokens
    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    // Save new refresh token in the database
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully."
        )
      );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(
        401,
        "Refresh token has expired. Please log in again."
      );
    }
    console.error("Error in Refresh Token:", error.message);
    throw new ApiError(401, "Invalid refresh token.");
  }
});

const userProfile = asyncHandler(async (req, res) => {
  const { phoneNo } = req.body;
  if (!phoneNo) {
    throw new ApiError(400, "An error occured login to see profile.");
  }
  const user = await User.findOne({ phoneNo });
  if (!user) {
    throw new ApiError(404, "User not found.");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile loaded succesfully"));
});

const yourUploadedJobs = asyncHandler(async (req, res) => {
  const { phoneNo } = req.body;
  if (!phoneNo) {
    throw new ApiError(400, "An error occured.");
  }

  const jobs = await Job.find({ phoneNo });
  if (!jobs || jobs.length < 1) {
    return res.status(200).json(new ApiResponse(500, [], "No jobs available"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "Job fetched successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  userProfile,
  yourUploadedJobs,
};
