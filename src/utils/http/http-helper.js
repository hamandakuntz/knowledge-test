const ServerError = require('../errors/server');

const badRequest = (errors) => ({
    statusCode: 400,
    body: {
        errors,
    }
});

const notFound = (errors) => ({
    statusCode: 404,
    body: {
        errors,
    }
});

const serverError = (error) => ({
    statusCode: 500,
    body: {
        errors: [
            new ServerError(error.stack)
        ]
    }
});

const success = (data) => ({
    statusCode: 200,
    body: data
});

const created = (data) => ({
    statusCode: 201,
    body: data
});

const noContent = () => ({
    statusCode: 204,
    body: null
});

module.exports = {
    created,
    badRequest,
    serverError,
    success,
    noContent,
    notFound,
};
