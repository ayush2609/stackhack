const taskRoutes = require("./task");
const authRoutes = require("./auth");
const labelRoutes = require("./labels")
const path = require('path');

module.exports = app => {
	app.use("/api/tasks", taskRoutes);
  // app.use("/api/public", publicRoutes);
  app.use("/api/labels",labelRoutes);
  app.use("/auth", authRoutes)
  // app.use(function(req, res) {
  //   res.sendFile(path.join(__dirname, '../../build/index.html'));
  // });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'))
  })
};
