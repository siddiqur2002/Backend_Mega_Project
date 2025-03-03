import { asyncHandeler } from "../utils/asyncHandeler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.services.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const userRegister = asyncHandeler(async (req, res) => {
    // res.status(200).json({
    //     message: "successfully registered"
    // })

    // Task to do here.....

    //1. get user details from frontend
    //2. Validation - not empty
    //3. check if user already exists: username, email
    //4. check for images check for avatar
    //5. upload them to cloudinary, avatar
    //6. create user object - create entry in db
    //7. remove password and refresh token fiels from response
    //8. check for user creation
    //9. return response


    // get user details
    const { username, email, password, fullname } = req.body
    console.log("email", email)

    if (
        [username, email, password, fullname].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar is required")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "User not created")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )

})


export { userRegister }