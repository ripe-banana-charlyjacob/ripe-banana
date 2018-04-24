module.exports = (doc, id) => {
    if(!doc) {
        throw {
            status: 404,
            error: `Id ${id} does not exist`
        };
    }
};