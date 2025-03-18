import { Express } from "express";
import { topicRoutes } from "./topic.route";

const clientRoutes = (app: Express): void => {
    
    app.use("/topic", topicRoutes);

}

export default clientRoutes;