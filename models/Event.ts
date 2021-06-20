import { EntitySchemaOptions } from 'typeorm/entity-schema/EntitySchemaOptions';
import { EntitySchema } from "typeorm";

export const EventSchema: EntitySchemaOptions<{ id: number, name: string }> = {
	name: "Event",
	columns: {
		id: {
			type: Number,
			primary: true,
			generated: true
		},
		name: {
			type: String
		}
	}
}
export const EventEntity = new EntitySchema<{ id: number, name: string }>(EventSchema);