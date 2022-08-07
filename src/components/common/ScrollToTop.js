import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = (props) => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(1, 0);
	}, [location]);

	return <>{props.children}</>;
};

export default ScrollToTop;
