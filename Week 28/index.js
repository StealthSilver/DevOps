const express = require("express");
const cluster = require("cluster");
const os = require("os");

const totalCPUs = os.cpus().length;
const port = 3000;

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const app = express();

  console.log(`Worker ${process.pid} started`);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/api/:n", (req, res) => {
    let n = parseInt(req.params.n, 10);
    let count = 0;

    if (isNaN(n)) {
      return res.status(400).send("Invalid number");
    }

    if (n > 500000000) n = 500000000; // Limit n to prevent server overload

    for (let i = 0; i <= n; i++) {
      count += 1;
    }

    res.send(`Final count is ${count} from worker ${process.pid}`);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port} (PID: ${process.pid})`);
  });
}
