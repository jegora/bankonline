function CustomError(title = 'Unknown Error', description = undefined, data = undefined) {
    this.title = title
    this.description = description
    this.data = data
}

export default CustomError