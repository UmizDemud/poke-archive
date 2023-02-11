import { ReactNode } from "react";
import { randomKey } from "./getKey";

export const renderObject = <T extends {}>(obj: T): ReactNode => {
	return Object.keys(obj).map((field) => {
		const key = field as keyof T;
		if (!obj[key]) {
			return null;
		}
		switch (typeof obj[key]) {
			case 'string':
			case 'number':
				return <div key={randomKey()}><h4>{field}</h4> <span>{obj[key] as string}</span></div>;
			case 'object':
				if (Array.isArray(obj[key])) {
					return (obj[key] as Array<{}>).map(item => renderObject(item))
				}
				return (
					<div key={randomKey()}>
						<h4>{field}</h4>
						{renderObject(obj[key] as object)}
					</div>
				)
			default:
				return <></>;
		}
	})
}