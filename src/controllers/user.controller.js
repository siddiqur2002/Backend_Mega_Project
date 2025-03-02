import { asyncHandeler } from "../utils/asyncHandeler.js"

const userRegister = asyncHandeler(async (req, res) => {
    res.status(200).json({
        message: "successfully registered"
    })
})


export { userRegister }