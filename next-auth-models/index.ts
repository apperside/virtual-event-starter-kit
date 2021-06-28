// To make importing them easier, you can export all models from single file
import User, { UserSchema } from "./User"

const Models = {
	User: {
		model: User,
		schema: UserSchema,
	},
}

export default Models;
