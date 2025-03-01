
const asyncHandeler = (requestHandeler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandeler(req, res, next)).catch((error) => next(error))
    }
}


export { asyncHandeler }








// const asyncHandeler = () => {}
// const asyncHandeler = (fn) => { () => {}}
// const asyncHandelet = (fn) => async () => {}

// const asyncHandeler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//        res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error"
//        }) 
//     }
// }