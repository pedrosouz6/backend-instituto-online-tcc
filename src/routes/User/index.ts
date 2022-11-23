import { middlewareUser, controllerUser } from '../../instance/User';
import { middlewareToken } from '../../instance/Token';

import { Router } from "express";
const userRoutes = Router();

userRoutes.post('/create-user',
    middlewareToken.verifyToken,
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
    middlewareToken.verifyToken,
    middlewareUser.dataValidation,
    middlewareUser.findByEmailUpdate,
    middlewareUser.findByCPFUpdate,
    controllerUser.updateUser
);

userRoutes.get('/get-users/:limit/:pageNumber/:searchUser',
    middlewareToken.verifyToken,
    controllerUser.getUser
);

userRoutes.get('/get-usersProjects/:limit/:pageNumber/:searchUser',
    middlewareToken.verifyToken,
    controllerUser.getUserProjects
);

userRoutes.get('/get-user/:id', 
    middlewareToken.verifyToken,        
    controllerUser.getOneUser
);

userRoutes.delete('/delete-user/:id',
    middlewareToken.verifyToken,
    controllerUser.deleteUser
);

export { userRoutes };