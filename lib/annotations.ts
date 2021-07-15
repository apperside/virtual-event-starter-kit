/* eslint-disable @typescript-eslint/require-await */
export const atomic = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;

	descriptor.value = async function (...args: any[]) {
		console.log("args", args)
		// const storage = getNamespace('globalStorage')
		// if (!storage) {
		// 	throw new Error("session storage not available")
		// }
		// const sessionId = storage.get<string>('sessionId')
		// if (!sessionId) {
		// 	throw new Error("session id not available")
		// }
		// try {
		// 	await dbManager.initTransaction(sessionId)
		// 	let result = await originalMethod.apply(this, args)
		// 	await dbManager.endTransaction(sessionId)
		// 	return result
		// }
		// catch (err) {
		// 	dbManager.abortTransaction(sessionId);
		// }
	}
};