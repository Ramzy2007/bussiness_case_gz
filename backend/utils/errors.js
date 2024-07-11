// errors.js
module.exports = {
    ERRORS: {
        PACKAGE_NOT_FOUND: {
            status: 404,
            message: "Package not found.",
            description: "ER00000002",
        },
        SERVER_ERROR: {
            status: 500,
            message: "An error occurred on the server.",
            description: "ER00000001",
        },
        INVALID_INPUT: {
            status: 400,
            message: "Invalid input provided.",
            description: "ER00000003",
        },
        UNAUTHORIZED: {
            status: 401,
            message: "Unauthorized access.",
            description: "ER00000004",
        },
        FORBIDDEN: {
            status: 403,
            message: "Forbidden access.",
            description: "ER00000005",
        },
        RESOURCE_NOT_FOUND: {
            status: 404,
            message: "Resource not found.",
            description: "ER00000006",
        },
        METHOD_NOT_ALLOWED: {
            status: 405,
            message: "Method not allowed.",
            description: "ER00000007",
        },
        CONFLICT: {
            status: 409,
            message: "Conflict occurred.",
            description: "ER00000008",
        },
        UNSUPPORTED_MEDIA_TYPE: {
            status: 415,
            message: "Unsupported media type.",
            description: "ER00000009",
        },
        VALIDATION_ERROR: {
            status: 422,
            message: "Validation error.",
            description: "ER00000010",
        },
        RATE_LIMIT_EXCEEDED: {
            status: 429,
            message: "Rate limit exceeded.",
            description: "ER00000011",
        },
        DELIVERY_NOT_FOUND: {
            status: 404,
            message: "Delivery not found.",
            description: "ER00000012",
        },
        // Add other error messages and codes here as needed
    },
    SUCCESS: {
        PACKAGE_FETCHED: {
            status: 200,
            message: "Package fetched successfully.",
        },
        PACKAGE_CREATED: {
            status: 201,
            message: "Package created successfully.",
        },
        PACKAGE_UPDATED: {
            status: 200,
            message: "Package updated successfully.",
        },
        PACKAGE_DELETED: {
            status: 200,
            message: "Package deleted successfully.",
        },
        // Add other success messages and codes here 

    }
};