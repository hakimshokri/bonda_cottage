import cottageModel from "../models/cottageModel.js"


const changeStatus = async (req, res) => {

    try {

        const { cottageId, newStatus } = req.body

        const cottageData = await cottageModel.findById(cottageId)

        // Check if the new status is the same as the current status
        if (cottageData.status === newStatus) {
            return res.json({ success: false, message: "Status is already set to the requested value" })
        }

        // Update the status
        await cottageModel.findByIdAndUpdate(cottageId, { status: newStatus })
        res.json({ success: true, message: "Status Changed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all cottages list for Frontend
const cottageList = async (req, res) => {

    try {

        const cottages = await cottageModel.find({})
        res.json({ success: true, cottages })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}
export { changeStatus, cottageList }