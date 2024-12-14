const ApiErrorHandler = (response: any, data: any) => {
    const status = response?.status;
    if (status >= 500) {
        return "Something went Wrong"
    }
    else {
        return data?.error
    }
}

export default ApiErrorHandler