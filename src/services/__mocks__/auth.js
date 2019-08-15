const loginUser = (payload) => new Promise((resolve, reject) => {
    reject({
        response: {
            data: {
                message: "sadfsdf",
            },
            status: 400,
        }
    })
})

export default {
    loginUser,
};