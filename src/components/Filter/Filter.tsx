import { FC, useCallback, useEffect, useRef, useState } from 'react'
import filtericon from "../../assets/icons/filter_icon.svg";
import { capitalize } from '../../utils/capitalize';
import './Filter.css'

type Props = {
	filterType: {
		[key: string]: {
			[key: string]: boolean;
		}
	};
	setFilterType: React.Dispatch<React.SetStateAction<{
    [key: string]: {
        [key: string]: boolean;
    };
	}>>;
	optionImages?: {
		[key: string]: {
			[key: string]: string;
		};
	}
};

export const Filter: FC<Props> = ({
	filterType,
	setFilterType,
	optionImages,
	...props // all usual props like `className`, `style` and `id`
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const filterRef = useRef<HTMLDivElement | null>(null)
	const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (filterRef.current
      && !filterRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, [filterRef.current]);

	const categories = Object.keys(filterType);

	useEffect(() => {
		if (!document || !filterRef.current) {
			return;
		}
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);
		return () => {
      document.removeEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
		}
	}, [filterRef.current]);

	return (
		<div
			className={`fltr${
				categories.some(cat => Object.keys(filterType[cat]).some(opt => !filterType[cat][opt]))
					? ' fltr--open'
					: ''
			}`}
			ref={filterRef}
			{...props}
		>
			<div className="fltr__tltp-txt">
				Filter
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
					className="fltr__toggle"
					src={filtericon}
					alt="toggle filters"
				/>
			</button>

			<div
				className={`fltr__modal${isOpen ? ' fltr__modal--open' : ''}`}
			>
				{categories.map(ft => (
					<div
						key={`fltr_${ft}`}
						aria-label="list of filters"
						className={
							`fltr__list${optionImages != null && optionImages[ft] ? ' fltr__list--img' : ''}`
						}
					>
						<h4 className="fltr__title">{ft.split('_').map(str => capitalize(str)).join(' ')}</h4>
						{Object.keys(filterType[ft]).map(optn => {
							const selected = filterType[ft][optn];
							return (
								<button
									key={optn}
									type="button"
									className="fltr__btn"
									onClick={() => {
										console.log(ft, optn)
										setFilterType(prev => ({
											...prev,
											[ft]: {
												...prev[ft],
												[optn]: !selected
											},
										}))
									}}
								>
									{optionImages && optionImages[ft] && optionImages[ft][optn] ? (
										<img
											alt={optn}
											className={`fltr__item${selected ? ' fltr__item--slctd' : ''}`}
											width="30"
											height="30"
											src={optionImages[ft][optn]}
										/>
									) : (
										<p className={`fltr__item fltr__item--txt${selected ? ' fltr__item--slctd' : ''}`}>
											{capitalize(optn)}
										</p>
									)}
								</button>
							)
						})}
					</div>
				))}
			</div>
		</div>
	)
}