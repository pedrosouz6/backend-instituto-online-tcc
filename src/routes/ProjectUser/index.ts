import { controllerProjectUser } from "../../instance/ProjectUser";

import { Router } from "express";

const projectUserRoutes = Router();

projectUserRoutes.get('/get-projectUser/:filterProject/:pageNumber', controllerProjectUser.getProjectUser);
projectUserRoutes.post('/add-projectUser', controllerProjectUser.addProjectUser);
projectUserRoutes.get('/getOne-projectUser/:id', controllerProjectUser.getOneProjectUser);

export { projectUserRoutes };