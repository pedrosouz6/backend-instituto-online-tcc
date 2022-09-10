import { middlewareUser, controllerUser } from '../../instance/User';

import { Router } from "express";
const userRoutes = Router();

userRoutes.post('/create-user', middlewareUser.createUser, controllerUser.createUser);

export { userRoutes };