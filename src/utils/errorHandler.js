export const getErrorMessage = (error, defaultMessage = "Something went wrong.") => {
    let message = defaultMessage;
    let status = 200;

    if (typeof error === 'string') {
        message = error;
    } else if (error?.response) {
        message = error.response.data?.message || defaultMessage;
        status = error.response.status || 500;
    } else if (error?.message) {
        message = error.message;
    }

    // A list of technical keywords that should typically not be exposed to the end-user
    const technicalTerms = ["Database", "SQL", "connect", "EADDRINUSE", "ECONNREFUSED", "Sequelize", "Mongo", "SyntaxError", "ReferenceError", "mein nahi mila"];
    
    // Check if the error message contains any of the technical terms
    const isTechnicalError = technicalTerms.some(term => message.toLowerCase().includes(term.toLowerCase()));

    // If it's a technical error or a 500+ server error, return a generic user-friendly message
    if (isTechnicalError || status >= 500) {
        return "The operation could not be completed at this time. Please try again later.";
    }

    return message;
};
