import { Express } from "express"
import { dashBoardRoutes } from "./dashboard.route";
import { systemConfig } from "../../configs/config";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";

const adminRoutes = (app: Express):void => {

    const pathAdmin = `/${systemConfig.prefix_admin}`

    app.use(pathAdmin + "/dashboard", dashBoardRoutes);

    app.use(pathAdmin + "/topics", topicRoutes);

    app.use(pathAdmin + "/songs", songRoutes)

}

export default adminRoutes;