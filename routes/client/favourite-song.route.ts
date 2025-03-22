import { Router } from 'express';
const router: Router = Router();

import * as controller from "../../controllers/client/favourite-song.controller";

router.get("/", controller.index);

export const favouriteSongRoutes: Router = router;