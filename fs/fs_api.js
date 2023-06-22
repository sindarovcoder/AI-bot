const fs = require("fs")


const read = (file_name)  => {
    return JSON.parse(fs.readFileSync(`./model/${file_name}`, 'utf-8'))
}


const write = (file_name, data) => {
    return fs.writeFileSync(`./model/${file_name}`, JSON.stringify(data, null, 4))
}


module.exports = {
    read,
    write
}