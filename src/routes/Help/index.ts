import { controllerHelp, middlewareHelp } from "../../instance/Help";
import { middlewareToken } from "../../instance/Token";

import { Router } from "express";

const helpRouter = Router();

helpRouter.post('/new-called', middlewareToken.verifyToken, middlewareHelp.validation, controllerHelp.create);
helpRouter.get('/get-called', middlewareToken.verifyToken, controllerHelp.get);
helpRouter.get('/getOne-called/:id', middlewareToken.verifyToken, controllerHelp.getOne);

export { helpRouter };