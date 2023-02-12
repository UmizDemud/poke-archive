export function sortBy(array: any[], field:string): any[] {
  let typ: string;
  let i = 0;

  typ = array[i][field];

  while (typ === 'object' || typ === 'undefined') {
    i += 1;
    typ = array[i][field];
  }

  switch (typ) {
    case 'string':
      return array.sort((a, b) => a[field].localeCompare(b[field]));
    case 'number':
      return array.sort((a, b) => a[field] - b[field]);
    default:
      return array.sort((a, b) => String(a[field]).localeCompare(String(b[field])));
  }
}

const returnBranch = (obj: object, fields: string[]): any => {
	let x: any = obj[fields[0] as keyof typeof obj];
	let i = 1;

	while (i < fields.length) {
		x = x[fields[i++] as keyof typeof x];
	}

	return x;
}

const helper = (a: any, b: any, field: string[]): number => {
  let typ: string;
	let pointer = returnBranch(a, field);

  typ = typeof pointer;

  switch (typ) {
    case 'string':
      return pointer.localeCompare(returnBranch(b, field))
    case 'number':
      return returnBranch(b, field) - pointer;
    default:
      return String(pointer).localeCompare(String(returnBranch(b, field)));
  }
}

export const sorter = (array: any[], fields: string[]): any[] => {
	if (fields.length === 0) {
		return array;
	}
	const spl = fields.map(field => field.split('/'))
	let i;
	return [...array].sort((a, b) => {
		i = 0;
		let lv = helper(a, b, spl[i++]);
		while (lv === 0) {
			if (i >= fields.length) {
				return 0;
			}
			lv = helper(a, b, spl[i++]);
		}
		
		if (lv > 0) {
			return 1;
		} else {
			return -1;
		}
	});
} 