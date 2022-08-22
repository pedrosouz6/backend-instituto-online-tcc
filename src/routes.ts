import { Router } from "express";

import { createUserController } from "./useCases/CreateUser";

const router = Router();

router.post('/create-user', (req, res) => {
    return createUserController.execute(req, res);
})

export { router };