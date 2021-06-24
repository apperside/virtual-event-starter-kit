import { Connection, createConnection, FindConditions, Repository } from "typeorm";


export type QueryOptions<T = any> = {
	objectId?: string | number;
	orderClause?: { [P in keyof T]?: "ASC" | "DESC" | 1 | -1 };
	selectClause?: (keyof T)[];
	whereClause?: string;
	relations?: string[];
	limit?: number;
	offset?: number;
};


export interface IDbEngine {
	init: () => Promise<void>;
	getTableNames: () => string[];
	save: <T>(tableName: string, object: T, userId?: string) => Promise<T>;
	saveMany: <T>(tableName: string, objects: T[], userId?: string) => Promise<T[]>;
	find: <T>(tableName: string, queryOptions: QueryOptions<T>) => Promise<T[]>;
	findById: <T>(tableName: string, id: any) => Promise<T | undefined>;
	remove: (
		tableName: string,
		where?: string | string[] | number | number[] | Date | Date[] | FindConditions<any>
	) => void;
}

export class SqliteDbEngine implements IDbEngine {
	connection!: Connection;
	repos: { [ket: string]: Repository<any> } = {};
	// engine: DbEngineType;
	routes: string[] = [];
	constructor() {
		// this.engine = engine;
	}

	async init() {
		this.connection = await createConnection();
		this.routes = this.connection.entityMetadatas.map(schema => schema.name);
		// this.options = options;
		// this.initRoutes(routes);
		// return this.dbRestController;
	}

	private getConnection() {
		if (!this.connection) {
			throw "method init() has not been called";
		}
		return this.connection;
	}

	getTableNames() {
		return this.routes;
	}
	private getRepo<T>(tableName: string) {
		let repo = this.repos[tableName];
		if (!repo) {
			repo = this.getConnection().getRepository<T>(tableName);
			this.repos[tableName] = repo;
		}
		return repo;
	}

	async save<T>(tableName: string, object: T) {
		return this.getRepo<T>(tableName).save(object);
	}

	async saveMany<T>(tableName: string, object: T[]) {
		const result = await this.getRepo<T>(tableName).save(object);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return result;
	}
	async findById<T>(tableName: string, id: any): Promise<T | undefined> {
		const result = await this.find<T>(tableName, { objectId: id });
		if (result && result.length > 0) {
			return result[0];
		}
		return undefined;
	}
	async find<T>(tableName: string, queryOptions: QueryOptions<T> = {}): Promise<T[]> {
		const repo = this.getRepo(tableName);
		if (repo) {
			const { objectId, orderClause, selectClause, whereClause, relations, limit, offset } = queryOptions;
			// let result = await this.getRepo<T>(tableName).find({
			// 	//@ts-ignore, order and select properties exist in the type, but typescript complaints it doesn't
			// 	select: selectClause,
			// 	order: orderClause,
			// 	where: whereClause,
			// 	relations,
			// 	skip: offset || 0,
			// 	take: limit || 0
			// });
			// return result;
			try {
				if (objectId) {
					const result = await this.getRepo<T>(tableName).findOneOrFail(objectId);
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					return [result] as any;
				} else {
					const result = await this.getRepo<T>(tableName).findAndCount({
						// order: orderClause,
						select: selectClause,
						order: orderClause,
						where: whereClause,
						relations,
						skip: limit,
						take: offset
					});
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					return result[0];
					// if (result && result.length == 2) {
					// 	return res.status(200).send({ data: result[0], totalRows: result[1] });
					// } else {
					// 	return res.status(500).send();
					// }
				}
			} catch (err) {
				console.error(err);
				throw err;
			}

			// return result[0];
		}
		return [];
	}

	async remove(
		tableName: string,
		where?: string | string[] | number | number[] | Date | Date[] | FindConditions<any>
	) {
		return this.getRepo(tableName).delete(where || tableName);
	}
}
