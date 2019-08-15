const loginUser = (payload) => new Promise((resolve, reject) => {
    reject({
        response: {
            data: {
                message: "sadfsdf"
            }
        }
    })
})

export default {
    loginUser,
};