import { Express } from "express"
import { dashBoardRoutes } from "./dashboard.route";
import { systemConfig } from "../../configs/config";

const adminRoutes = (app: Express):void => {

    const pathAdmin = `/${systemConfig.prefix_admin}`

    app.use(pathAdmin + "/dashboard", dashBoardRoutes);

}

export default adminRoutes;