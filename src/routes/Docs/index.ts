import { controllerDocs, middlewareDocs } from '../../instance/Docs';
import { middlewareToken } from '../../instance/Token';

import { Router } from "express";
const docsRoutes = Router();

docsRoutes.get('/get-docs/:limit/:pageNumber/:filterUser',
    middlewareToken.verifyToken,
    controllerDocs.getDocs
);

docsRoutes.get('/get-docs/:id', 
    middlewareToken.verifyToken,        
    controllerDocs.getOneDocs
);

docsRoutes.delete('/delete-docs/:id',
    middlewareToken.verifyToken,
    controllerDocs.deleteDocs
);

export { docsRoutes };