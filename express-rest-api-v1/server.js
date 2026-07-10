const express     = require("express"),
      API_Router  =require('./router/API_Router');

const app = express();
app.use(express.json());




app.use('/api',API_Router);

app.listen(5000, () => {
  console.log("server runing at http://localhost:5000");
});
