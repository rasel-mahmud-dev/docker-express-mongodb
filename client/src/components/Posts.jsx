import React from 'react';
import {Link} from "react-router-dom";

const Posts = ({posts}) => {
	return (
		<div>
			{posts && posts.map(post=>(
				<div className="border border-primary rounded-xl m-4 p-4">
					
					<div className="flex gap-x-2">
						<div>
							<div
								className="w-6 rounded-full ring ring-primary ring-offset-base-100 rounded-full">
								<img className="rounded-full"
								     src="https://res.cloudinary.com/rasel/image/upload/v1679941585/app/core-avatar-hd.jpg"/>
							</div>
						</div>
						<div>
							<h4 className="text-sm font-semibold">Rasel Mahmud</h4>
							<p className="text-xs text-gray-500">{new Date().toDateString()}</p>
						</div>
					</div>
					
					
					<div className="mt-2">
						<h4 className="font-medium text-lg">{post.title}</h4>
						<p className="mt-2 text-gray-400">{post.description.substring(0, 400)}</p>
					</div>
					
					<div className="mt-2">
						<Link  to={`/posts/${post._id}`}> Detail</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default Posts;