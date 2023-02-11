import { useEffect } from "react";
import { Link, Outlet, useParams, useSearchParams } from "react-router-dom"
import '../styles/Layout.css'

export const Layout = () => {
	return (
		<>
			<header className="main-header">
				<nav className="nav">
					<div className="logo">
						<div className="nav__logo">
							<Link className="nav__link" to="/">
								Home
							</Link>
						</div>
					</div>
					<ul className="nav__list">
						<li className="nav__item">
							<Link className="nav__link" to="#notaround">Auth</Link>
						</li>
						<li className="nav__item">
							<Link className="nav__link" to="#notaround">Moves</Link>
						</li>
						<li className="nav__item">
							<Link to="/list" className="nav__link">Pokedex</Link>
						</li>
					</ul>
				</nav>
			</header>
			<Outlet />
			<footer className="footer">
				<p style={{width: 'fit-content'}}>
					📓 Have a lovely day! - {new Date().toDateString()}
				</p>
			</footer>
		</>
	)
}