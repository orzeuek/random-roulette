import * as mysql from 'mysql2/promise';

export class Database {
    public static async getConnection(host: string, user: string, database: string): Promise<mysql.Pool> {
        return mysql.createPool({ host, user, database })
    }
}