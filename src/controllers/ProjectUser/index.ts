import { Request, Response } from "express";
import { FieldPacket, RowDataPacket } from "mysql2";
import { connect } from "../../services/connection";

export class ControllerProjectUser {
    async getProjectUser(req: Request, res: Response) {
        const { filterProject, pageNumber } = req.params;

        const start = ( Number(10) * Number(pageNumber) ) - Number(10);

        let filter: string;
        
        if(filterProject == 'null') {
            filter = '';
        } else {
            filter = filterProject;
        }

        const sql = `SELECT 
        project_user.id_project_user,
        users.name, 
        users.id,
        projects.name_projects
        FROM ((project_user  
            INNER JOIN projects ON projects.id = project_user.id_project)
            INNER JOIN users ON users.id = project_user.id_user)
            WHERE projects.name_projects LIKE '%${filter}%'
            ORDER BY project_user.id_project_user ASC LIMIT ${start}, 10
        `;

        const sqlPagination = "SELECT id_project_user FROM project_user";

        const [ results ] = await connect.promise().query(sql);
        const [ resultsPagination ]: [RowDataPacket[], FieldPacket[]] = await connect.promise().query(sqlPagination);

        const totalUsers = resultsPagination.length;
        const totalPages = Math.ceil(totalUsers / Number(10));

        res.status(200).json({
            error: false,
            results,
            totalPages
        });
    }

    async addProjectUser(req: Request, res: Response): Promise<Response> {
        const { id_user, id_project } = req.body;

        const sql = `INSERT INTO project_user (id_user, id_project) VALUES (?, ?)`;
        const values = [ id_user, id_project ];

        try {
            const [ results ] = await connect.promise().query(sql, values);

            return res.status(201).json({
                error: false,
                message: 'O projeto foi adicionado com sucesso'
            })
        } catch(err) {
            return res.send(401).json({
                error: true,
                message: 'Erro ao adicionar o projeto'
            })
        }
    }

    async getOneProjectUser(req: Request, res: Response) {
        const { id } = req.params;

        const sql = `
        SELECT 
        project_user.id_project_user,
        users.name, 
        users.id,
        projects.name_projects
        FROM ((project_user  
            INNER JOIN projects ON projects.id = project_user.id_project)
            INNER JOIN users ON users.id = project_user.id_user)
            WHERE id_user = ${id}
        `;

        const [ results ] = await connect.promise().query(sql);

        res.status(200).json({
            error: false,
            message: 'O usuário foi obtido com sucesso',
            results
        }).end();
    }
}  