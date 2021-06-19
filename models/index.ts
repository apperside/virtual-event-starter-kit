// To make importing them easier, you can export all models from single file
import { BookingEntity } from "./Booking";
import { EventEntity } from "./Event";
import User, { UserSchema } from "./User"

const Models = {
	User: {
		model: User,
		schema: UserSchema,
	},
	Events: EventEntity,
	Bookings: BookingEntity
}

export default Models;
