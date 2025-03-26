import { Express } from "express"
import { dashBoardRoutes } from "./dashboard.route";
import { systemConfig } from "../../configs/config";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { uploadRoutes } from "./upload.route";

const adminRoutes = (app: Express):void => {

    const pathAdmin = `/${systemConfig.prefix_admin}`

    app.use(pathAdmin + "/dashboard", dashBoardRoutes);

    app.use(pathAdmin + "/topics", topicRoutes);

    app.use(pathAdmin + "/songs", songRoutes);

    app.use(pathAdmin + "/upload" ,uploadRoutes)

}

export default adminRoutes;