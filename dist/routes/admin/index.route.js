"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const config_1 = require("../../configs/config");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const upload_route_1 = require("./upload.route");
const adminRoutes = (app) => {
    const pathAdmin = `/${config_1.systemConfig.prefix_admin}`;
    app.use(pathAdmin + "/dashboard", dashboard_route_1.dashBoardRoutes);
    app.use(pathAdmin + "/topics", topic_route_1.topicRoutes);
    app.use(pathAdmin + "/songs", song_route_1.songRoutes);
    app.use(pathAdmin + "/upload", upload_route_1.uploadRoutes);
};
exports.default = adminRoutes;
