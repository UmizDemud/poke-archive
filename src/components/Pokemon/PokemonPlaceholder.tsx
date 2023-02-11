import arrowleft from '../../assets/icons/arrow-left.svg';
import arrowright from '../../assets/icons/arrow-right.svg';

export const PokemonPlaceholder = () => {
	const color = '#ccc';

	const moves = Array(10).fill(false);

	const abilities = Array(2).fill(false);

	return (
		<main id="main">
			<div className="header">
				<a
					className="btn"
					style={{lineHeight: 0.5, backgroundImage: `radial-gradient(${color}, ${color} 63%, #fff 65%)`}}
					href="#"
				>
					<img width="48" height="48" src={arrowleft} alt="previous page" />
				</a>

				<h1 style={{height: '24px'}} className="placeholder pokename"></h1>

				<a
					className="btn"
					style={{lineHeight: 0.5, backgroundImage: `radial-gradient(${color}, ${color} 63%, #fff 65%)`}}
					href="#"
				>
					<img width="48" height="48" src={arrowright} alt="next page" />
				</a>
			</div>
			<div className="showcase-area">
				<div style={{width: '100px', height: '120px'}} className="showcase-area__description">
					<p className="placeholder" style={{width: '200px', height: '180px'}}> </p>
				</div>
				<div style={{width: '150px', height: '180px', padding: '4rem'}} className="showcase-area__visuals placeholder">
				</div>
			</div>
			<section style={{marginTop: '160px'}} className="section">
				<h4 className="title">Base Skills</h4>
				{(abilities).map((k, i) => {
					return (
						<div className="placeholder" style={{marginTop: '20px', height: '20px'}} key={i}>

						</div>
					)
				})}
			</section>
			{moves.map((k, i) => (
				<div className="placeholder" style={{marginTop: '20px', height: '20px'}} key={`${i}a`}>

				</div>
			))}
		</main>
	)
}