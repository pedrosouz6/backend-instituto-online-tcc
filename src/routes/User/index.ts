import { middlewareUser, controllerUser } from '../../instance/User';

import { Router } from "express";
const userRoutes = Router();

userRoutes.post('/create-user', 
    middlewareUser.dataValidation, 
    middlewareUser.findByEmail, 
    middlewareUser.findByCPF, 
    controllerUser.createUser
);

userRoutes.get('/get-users', controllerUser.getUsers);

export { userRoutes };