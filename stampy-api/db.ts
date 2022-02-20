import  knex, { Knex } from 'knex';
import { Project } from './tables/project.table';

export class Db {
    public static knex: Knex<any, unknown[]>;

    static initDb() {
        this.knex.schema.createTableIfNotExists("project", (table: Knex.CreateTableBuilder) => {
            table.increments();
            table.string('title');
        }).then(() => {
            this.knex<Project>("project").insert([
                {title: 'Taschenrechner'},
                {title: 'Todo-App'}
            ]).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });
    }
 
    static connect() {
        this.knex = knex({
            client: 'pg',
            version: '9.5',
            connection: {
                host: 'localhost',
                port: 5432,
                user: 'jarvis',
                password: 'CHANGEME',
                database: 'gdd'
            }
        });
    }
}