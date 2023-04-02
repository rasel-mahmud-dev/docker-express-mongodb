import React, {useEffect, useState} from 'react';
import api from "../apis/axios";


const Carts = () => {

    const [carts, setCarts] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        fetchCarts()
    }, [])


    async function fetchCarts(){
        try {
            let {status, data} = await api.get("/api/carts")
            if (status === 200) {
                setCarts(data.carts)
            }
        } catch (ex) {

        }
    }


    return (
        <div className="container">


            <h3 className="page-title">Your Cart items</h3>

            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product ID</th>
                        <th>Order At</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {carts && carts.map((order)=>(
                        <tr>
                            <td>{order._id}</td>
                            <td>{order?.productId}</td>
                            <td>{new Date(order?.createdAt).toDateString()}</td>
                            <td>{order.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Carts;