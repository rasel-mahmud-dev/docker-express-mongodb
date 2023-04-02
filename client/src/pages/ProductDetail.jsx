import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import api from "../apis/axios";
import {toast} from "react-toastify";
import appContext, {AppContext} from "../store/AppContext";


const desc = `
Nunc nec neque. Proin pretium, leo ac pellentesque mollis, felis nunc ultrices eros, sed gravida augue augue mollis justo. Fusce pharetra convallis urna. Phasellus ullamcorper ipsum rutrum nunc. Vivamus laoreet.

Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Fusce ac felis sit amet ligula pharetra condimentum. Aenean imperdiet. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Nam adipiscing.

Ut a nisl id ante tempus hendrerit. Donec venenatis vulputate lorem. Nulla consequat massa quis enim. Ut varius tincidunt libero. Aenean imperdiet.

Vestibulum turpis sem, aliquet eget, lobortis pellentesque, rutrum eu, nisl. Donec venenatis vulputate lorem. Mauris sollicitudin fermentum libero. Donec posuere vulputate arcu. Donec posuere vulputate arcu.

Sed hendrerit. Praesent egestas neque eu enim. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Pellentesque dapibus hendrerit tortor. Aenean massa.

`

const ProductDetail = () => {
    const {slug} = useParams()

    const [{}, setState]  = useContext(AppContext)

    const [comments, setComments] = useState([])
    const [totalComment, setTotalComment] = useState(0)


    const [postDetail, setPostDetail] = useState(null)

    useEffect(() => {
        fetchPost(slug)
    }, [slug])


    async function fetchPost(slug) {
        try {
            let {status, data} = await api.get("/api/products/" + slug)
            if (status === 200) {
                setPostDetail(data.product)
            }
        } catch (ex) {

        }
    }

    async function fetchComments(postId) {
        try {
            let {status, data} = await axios.get("http://localhost:2001/api/comments/" + postId)
            if (status === 200) {
                setComments(data.comments)
                setTotalComment(data.count)
            }
        } catch (ex) {

        }
    }

    async function handleAddComment(e) {
        e.preventDefault()

        const content = e.target.content.value

        let {data, status} = await axios.post("http://localhost:2001/api/comments", {content, postId})

        if (status === 201) {
            e.target.content.value = ""
            setTotalComment(prev => prev + 1)
            setComments((prev) => ([
                ...prev,
                data.comment
            ]))
        }
    }


    async function buyNowHandler(){

        try {
            let {data, status} = await api.post("/api/products/buy", {
                productId: postDetail._id,
                quantity: 1
            })
            
            if(status === 201){
                toast.success("Your order is create successfully");
            }

        } catch (ex) {
            toast.error(ex.response?.data?.message)
        }
    }
    
    
    async function addToCartHandler(){
        
        try {
            let {data, status} = await api.post("/api/carts", {
                productId: postDetail._id,
                quantity: 1
            })
            
            if(status === 201){

                    setState(prev=>({
                        ...prev,
                        totalCarts: prev.totalCarts + 1
                    }))

                toast.success("Product successfully added in cart");
            }
            
        } catch (ex) {
            toast.error(ex.response?.data?.message)
        }
    }
    
    
    return postDetail && (
        <div className="max-w-5xl mx-auto mt-10">

            <div className="mb-2">
                <Link to="/">Back All Products </Link>
            </div>

            <div className="grid grid-cols-6">

                <div className="col-span-2">

                    <div className="mt-4">
                        <img className="w-max max-w-[200px]"
                             src={postDetail.thumb} alt=""/>
                    </div>

                    <div className="flex items-center gap-x-2">
                        {postDetail.images.map(img => (
                            <div>
                                <img className="w-14" src={img} alt=""/>
                            </div>
                        ))}
                    </div>


                    <div className="flex items-center gap-x-2 mt-8">
                        <button type="submit" className="mt-2 btn btn-secondary" onClick={buyNowHandler}>Buy Now</button>
                        <button type="submit" className="mt-2 btn btn-primary" onClick={addToCartHandler}>Add to Cart</button>
                    </div>
                </div>

                <div className="col-span-4">
                    <h2 className="text-2xl mt-4 font-semibold text-gray-800">{postDetail.title}</h2>
                    <h2 className="text-lg mt-4 font-semibold text-gray-800">TK. {postDetail.price}</h2>
                    <h2 className="text-sm mt-2 font-semibold text-red-400">Stock. {postDetail.stock}</h2>


                    <div className="mt-2">
                        <p className="text-gray-600 text-base whitespace-pre-line">{desc}</p>
                    </div>


                    <div className="mt-10">
                        <h4 className="text-2xl text-gray-700 font-semibold">Reviews ({totalComment})</h4>

                        <div className="my-4">
                            {comments.map(comment => (
                                <div className="border border-gray-600 rounded-lg my-4 p-2">

                                    <div className="flex gap-x-4">
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
                                        <p className="text-sm text-gray-400">{comment.content.substring(0, 180)}</p>
                                        {comment.content.length > 180 &&
                                            <a className="font-medium text-sm cursor-pointer">Read more...</a>}
                                    </div>
                                </div>
                            ))}
                        </div>


                        <form onSubmit={handleAddComment}>
					<textarea rows={4} name="content" className="mt-2 w-full textarea textarea-primary"
                              placeholder="You comment"></textarea>
                            <button type="submit" className="mt-2 btn btn-primary">Post</button>
                        </form>
                    </div>
                </div>


            </div>


        </div>
    );
};

export default ProductDetail;