
const app = require("./app/app")

const PORT  = process.env.PORT || 2001



app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`)  )

