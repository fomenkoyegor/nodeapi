const app = require('./server/app');
const port = process.env.PORT || 5000;

app.listen(port, async ()=> console.log(`server run on http://localhost:${port}`));