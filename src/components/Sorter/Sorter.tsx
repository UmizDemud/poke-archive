import { FC, useCallback, useEffect, useRef, useState } from "react";
import sorticon from "../../assets/icons/sort_icon.svg";
import { moveFields } from '../../assets/moveFields';
import './Sorter.css';

type Props = {
	sortOptions: string[];
	sortBy: string[];
	setSortBy: React.Dispatch<React.SetStateAction<string[]>>;
};

export const Sorter: FC<Props> = ({
	sortOptions,
	sortBy,
	setSortBy,
	...props // all usual props like `className`, `style` and `id`
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const sorterRef = useRef<HTMLDivElement | null>(null)
	const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (sorterRef.current
      && !sorterRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, [sorterRef.current]);

	useEffect(() => {
		if (!document || !sorterRef.current) {
			return;
		}
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);
		return () => {
      document.removeEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
		}
	}, [sorterRef.current]);

	return (
		<div
			ref={sorterRef}
			style={{marginRight: '1rem'}}
			className={`srtr${isOpen || sortBy.length ? ' srtr--open' : ''}`}
			{...props} // copy all the other props
		>
			<div className="srtr__tltp-txt">
				Sort
			</div>
			<button
				type="button"
				onClick={() => {
					setIsOpen(!isOpen)
				}}
			>
				<img
					width="30"
					height="30"
					className="srtr__btn"
					src={sorticon}
					alt="toggle sorting"
				/>
			</button>
			<div
				className={`srtr__list${isOpen ? ' srtr__list--open' : ''}`}
			>
				{sortOptions.map((opt) => {
					const optAsKey = moveFields[opt];
					const selected = sortBy.includes(optAsKey);
					const i = sortBy.indexOf(optAsKey);
					return (
						<button
							key={opt}
							type="button"
							onClick={() => {
								if (selected) {
									setSortBy(prev => prev.filter(item => item !== moveFields[opt]));
								} else {
									setSortBy(prev => [...prev, optAsKey])
								}
							}}
							className={`srtr__item${selected ? ' srtr__item--slctd' : ''}`}
						>
							<span className="srtr__item-idx">{i !== -1 ? i+1 : ''}</span>
							{opt}
						</button>
					)
				})}
			</div>
		</div>
	)
}