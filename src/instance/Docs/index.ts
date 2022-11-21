import { MiddlewareDocs } from "../../middlewares/Docs";
import { ControllerDocs } from "../../controllers/Docs";
import { DocsValidations } from "../../middlewares/Docs/Validations";

const middlewareDocs = new MiddlewareDocs();
const controllerDocs = new ControllerDocs(); 
const docsValidations = new DocsValidations();

export { middlewareDocs, docsValidations, controllerDocs };