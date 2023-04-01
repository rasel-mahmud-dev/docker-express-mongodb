import React from 'react';
import {Link} from "react-router-dom";

const Products = ({products}) => {
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
			{products && products.map(post=>(
				<Link to={`/p/${post.slug}`}>
					<div className="rounded-xl shadow-xs card bg-white">
						<div className="">
							<div className="w-32">
								<img src={post.thumb} alt=""/>
							</div>
							<h4 className="font-normal text-md mt-3 text-gray-900">{post.title}</h4>
							<h4 className="font-normal text-xs mt-2 text-primary">TK. {post.price}</h4>

							<div>
								{/*<button className="btn-sm rounded-btn btn-primary">Add To Cart</button>*/}
							</div>

						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Products;