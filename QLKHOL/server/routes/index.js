const productRouter = require("./products.js");
const categoryRouter = require("./categories.js");
const userRouter = require("./users.js");
const authRouter = require("./auth.js");
const uploadRouter = require("./upload.js");
const paymentRouter = require("./payment.js");
const orderRouter = require("./order.js");
const lessionRouter = require("./lession.js");

function route(app) {
  // Product routers
  app.use("/api/products", productRouter);

  // Category routers
  app.use("/api/categories", categoryRouter);

  // User routers
  app.use("/api/users", userRouter);

  // Authentication routes
  app.use("/api/auth", authRouter);

  // image upload routers
  app.use("/api/file", uploadRouter);

  // payment routers
  app.use("/api/payment", paymentRouter);

  // order routers
  app.use("/api/orders", orderRouter);

  // lession routers
  app.use("/api/lessions", lessionRouter);
}

module.exports = route;
