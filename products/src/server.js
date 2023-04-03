
const app = require("./app/app")

const PORT  = process.env.PORT || 2010


app.listen(PORT, async ()=> {

    console.log(`server is running on port ${PORT}`)
} )

// module.exports = channel