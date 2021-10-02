// this function will transform a string from camelCase to snake_case
// e.g. fullName -> full_name
export function toSnakeCase(str) {
	const array = [...str].map(char => {
		if (char === char.toUpperCase()) {
			return `_${char.toLowerCase()}`;
		} else return char;
	});
	return array.join('');
}
