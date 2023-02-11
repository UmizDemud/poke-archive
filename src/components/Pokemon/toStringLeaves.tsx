import { ReactNode } from "react"
import { capitalize } from "../../utils/capitalize";

export const toStrLeaves = <T extends {}>(obj: T, lv = 0, prevKey: string = ''): ReactNode => {
	return (
		<div key={`${lv}${prevKey}`}>
			{!!prevKey.length && (
				<h3 style={{fontSize: `${(60 / (lv + 1))}px`}}>{prevKey.split('_').map(it => capitalize(it)).join(' ')}</h3>
			)}
			<div className="treeContainer">
				{
					Object.entries(obj).map(entry => {
						if (typeof entry[1] === 'string') {
							return (
								<div className="subTreeContainer" key={entry[1]}>
									<h4>{entry[0].split('_').map(it => capitalize(it)).join(' ')}</h4>
									<img src={entry[1]} alt={entry[0]} />
								</div>
							)
						} else if (entry[1] == null) {
							return null;
						}
				
						return toStrLeaves(entry[1] as T, lv + 1, entry[0])
					})
				}
			</div>
		</div>
	)
}