import app from './app.js';
import { connectToDatabase } from './db/connection.js';
//Connections & listeners
const PORT = process.env.PORT || 5000;
connectToDatabase().then(async () => {
    app.listen(PORT, () => console.log(`server connected to database and started at port ${PORT}`));
}).catch(err => console.log(err));
//# sourceMappingURL=index.js.map