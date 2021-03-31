import Link from 'next/link';

export default ({currentUser}) =>{

const links = [
	!currentUser && {'label': 'Sign In', 'href': '/auth/signin'},
	!currentUser && {'label': 'Sign Up', 'href': '/auth/signup'},
	currentUser && {'label': 'Sign Out', 'href': '/auth/signout'}
].filter(linkConfig => linkConfig).map(({label, href}) =>{
	return (
		<li key={href}>
		<Link href={href}>
		<a href={href}>{label}</a>
		</Link>
		</li>
		);
});
return (<nav className="navbar navbr-light bg-light">
	<Link href="/">
	<a className="navbar-brand" href = "/">GitTix</a>
	</Link>

	<div className="d-flex justify-content-end">
	<ul className = "nav d-flex alight-items-center">
	{links}
	</ul>
	</div>
	</nav>);
};