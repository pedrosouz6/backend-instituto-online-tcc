import { ControllerUser } from "../../controllers/User";
import { MiddlewareUser } from "../../middlewares/User";
import { UserValidations } from "../../middlewares/User/Validations";

const controllerUser = new ControllerUser();
const middlewareUser = new MiddlewareUser();
const userValidations = new UserValidations();

export { controllerUser, middlewareUser, userValidations };
