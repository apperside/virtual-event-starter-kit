export class Error401 extends Error {
	constructor() {
		super("not authorized")
	}
}