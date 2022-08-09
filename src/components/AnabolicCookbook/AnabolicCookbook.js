import { useState, lazy } from 'react';
import * as recipeService from '../../services/recipeService';
import InfiniteScroll from 'react-infinite-scroll-component';

const CookbookCard = lazy(() => import('../AnabolicCookbook/CookbookCard'));

export default function AnabolicCookbook() {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState(false);
	const [nothingFound, setNothingFound] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(0);

	const fetchMoreData = () => {
		setPage(() => page + 3);
		setTimeout(() => {
			recipeService.fetchMoreData(page).then((newPosts) => {
				if (newPosts.length === 0) {
					setHasMore(false);
				} else {
					setPosts((oldPosts) => [...oldPosts, ...newPosts]);
				}
			});
		}, 1000);

		console.log(page);
	};

	const fetchSearchData = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const { query } = Object.fromEntries(formData);
		recipeService.getAllPosts(query).then((newPosts) => {
			if (newPosts.length !== 0) {
				setPosts((oldPosts) => [...newPosts]);
				setSearch((oldSearch) => !oldSearch);
				setNothingFound(false);
				setHasMore(false);
			} else {
				setNothingFound(true);
			}
			setSearch((oldSearch) => !oldSearch);
		});
	};

	return (
		<>
			<div id="gallery" style={{ marginTop: '1px', paddingTop: '200px' }} className="text-center bg-dark text-light has-height-md middle-items wow fadeIn">
				<h2 className="section">Browse all our recipes</h2>
				<div className="col-md-4" style={{ margin: '20px auto' }}>
					<form method="GET" onSubmit={fetchSearchData}>
						<div className="input-group">
							<input type="text" className="form-control" placeholder="Search by recipe name.." name="query" />
							<button type="submit" className="btn btn-primary">
								Search
							</button>
						</div>
					</form>
				</div>
			</div>
			{nothingFound ? (
				<div className="text-center bg-transparent text-dark has-height-md middle-items wow fadeIn">
					<h2>We can't find what you are looking for!</h2>
					<h2>Search for another recipe!</h2>
				</div>
			) : (
				<InfiniteScroll
					style={{ overflow: 'hidden' }}
					dataLength={posts.length}
					scrollThreshold={'400px'}
					next={fetchMoreData}
					hasMore={hasMore}
					loader={
						<div className="text-center bg-transparent text-dark has-height-md middle-items wow fadeIn">
							<h2>Loading....</h2>
						</div>
					}
					endMessage={
						<div className="text-center bg-transparent text-dark has-height-md middle-items wow fadeIn">
							<h2>There are no more recipes to show!</h2>
						</div>
					}
				>
					<div className="gallary row justify-content-lg-start">
						{posts.map((x) => (
							<CookbookCard key={x._id} recipe={x} />
						))}
					</div>
				</InfiniteScroll>
			)}
		</>
	);
}
