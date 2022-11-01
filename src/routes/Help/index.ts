import { controllerHelp, middlewareHelp } from "../../instance/Help";
import { middlewareToken } from "../../instance/Token";

import { Router } from "express";

const helpRouter = Router();

helpRouter.post('/new-called', middlewareHelp.validation, controllerHelp.create);
helpRouter.get('/get-called', middlewareToken.verifyToken, controllerHelp.get);

export { helpRouter };