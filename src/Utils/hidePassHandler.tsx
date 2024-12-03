const HidePassHandler = (types: any) => {
    if (types === "password") {
        return "text"
    } else {
        return "password"
    }
}

export default HidePassHandler