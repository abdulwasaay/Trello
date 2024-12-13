const NameAbbreviator = (name: string) => {
    if (name) {
        const names = name.trim().split(" ");
        if (names?.length === 1) {
            return names[0]?.charAt(0).toUpperCase()
        } else {
            return names[0]?.charAt(0).toUpperCase() + names[1]?.charAt(0).toUpperCase()
        }
    }
}

export default NameAbbreviator