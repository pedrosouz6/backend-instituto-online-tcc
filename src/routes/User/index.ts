import { middlewareUser, controllerUser } from '../../instance/User';

import { Router } from "express";
const userRoutes = Router();

userRoutes.post('/create-user', 
    middlewareUser.dataValidation, 
    middlewareUser.findByEmail, 
    middlewareUser.findByCPF, 
    controllerUser.createUser
);

userRoutes.post('/login', 
    middlewareUser.findByEmailLogin,
    controllerUser.login
);

userRoutes.put('/update-user', 
    middlewareUser.dataValidation,
    middlewareUser.findByEmailUpdate,
    middlewareUser.findByCPFUpdate,
    controllerUser.updateUser
);

userRoutes.get('/get-users/:limit/:pageNumber/:searhUser', controllerUser.getUser);
userRoutes.get('/get-user/:id', controllerUser.getOneUser);
userRoutes.delete('/delete-user/:id', controllerUser.deleteUser);

export { userRoutes };