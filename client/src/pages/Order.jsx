import React, {useEffect, useState} from 'react';
import api from "../apis/axios";
import {BiTrash} from "react-icons/all";


const Order = () => {

    const [orders, setOrders] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        fetchOrders()
    }, [])


    async function fetchOrders(){
        try {
            let {status, data} = await api.get("api/orders")
            if (status === 200) {
                setOrders(data.orders)
            }
        } catch (ex) {

        }
    }

    async function handleDeleteOrder(item){
        try {
            let {status, data} = await api.delete("api/orders/"+item.id)
            if (status === 201) {
                setOrders(prev=>(prev.filter(i=>i.id !== item.id)))
            }
        } catch (ex) {

        }
    }


    return (
        <div className="container">


            <h3 className="page-title">Orders</h3>

            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Order At</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                            {orders.map((order)=>(
                        <tr>
                                <td>{order.id}</td>
                                <td>{order?.title || "No title"}</td>
                                <td>TK. {order?.price}</td>
                                <td>{new Date(order?.createdAt).toDateString()}</td>
                                <td>{order.quantity}</td>
                                <td>
                                    <BiTrash  onClick={()=>handleDeleteOrder(order)}/>
                                </td>
                        </tr>
                            ))}
                    </tbody>
                </table>

        </div>
        </div>
    );
};

export default Order;