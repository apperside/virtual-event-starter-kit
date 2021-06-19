import { EntitySchemaOptions } from 'typeorm/entity-schema/EntitySchemaOptions';
import { EntitySchema } from "typeorm";

export const BookingSchema: EntitySchemaOptions<{ id: number, userId: number, eventId: number, paymentType: string, paymentId: string }> = {
	name: "Booking",
	columns: {
		id: {
			type: Number,
			primary: true,
			generated: true
		},
		userId: {
			type: Number
		},
		paymentType: {
			type: String
		},
		paymentId: {
			type: String
		},
		eventId: {
			type: Number
		}
	}
}
export const BookingEntity = new EntitySchema<{ id: number, name: string }>(BookingSchema);