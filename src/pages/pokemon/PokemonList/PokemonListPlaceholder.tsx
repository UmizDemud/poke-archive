export const PokemonsListPlaceholder = () => (
	<div className="pokedex">
		<div className="header">

			<h1 className="pokedex__title">Pokedex</h1>
		</div>
		<div id="pokedex-table">
			<div className="head">
				<div style={{width: '100px', height: '34px'}} className="placeholder head col"></div>
				<div style={{width: '100px', height: '34px'}} className="placeholder head col"></div>
				<div style={{width: '100px', height: '34px'}} className="placeholder head col"></div>
				<div style={{width: '100px', height: '34px'}} className="placeholder head col"></div>
			</div>
			{Array(20).fill(0).map((_, i) => (
					<div className="row" key={i}>
					<div style={{width: '100px', height: '30px'}} className="placeholder col">

					</div>
					<p style={{width: '100px', height: '30px'}} className="placeholder"></p>
					<div className="col">
						<p style={{width: '100px', height: '30px'}} className="placeholder"></p>
					</div>
					<p style={{width: '100px', height: '30px'}} className="placeholder"></p>
				</div>
			))}
		</div>
	</div>
);
