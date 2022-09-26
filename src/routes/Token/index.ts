import { middlewareToken } from "../../instance/Token";

import { Router } from "express";
const tokenRoute = Router();

tokenRoute.post('/validate-token', middlewareToken.validateToken);

export { tokenRoute };