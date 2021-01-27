import * as orderTypes from './order.types';
import API_ROUTE from '../../../apiRoute';

export const getOrders = ({filter,page,limit}) => {
    return async (dispatch) => {
        dispatch({type: orderTypes.GET_ORDERS_REQUEST})
        try {
            
            const res = await fetch(filter === "all" ? `${API_ROUTE}/orders?_page=${page}&_limit=${limit}`:
            `${API_ROUTE}/orders?status=${filter}&_page=${page}&_limit=${limit}`)
            const count = res.headers.get("X-Total-Count");
            const data = await res.json();
            dispatch({ type:orderTypes.GET_ORDERS_SUCCESS, payload:{data:data,count:count}})
        } catch(err) {
            dispatch({ type:orderTypes.ORDER_ERROR, payload:err })
        }
    }
}

export const searchOrders =  ({column,filter,page,limit}) => {
    return async (dispatch) => {
        dispatch({type: orderTypes.GET_ORDERS_REQUEST})
        try {
            
            const res = await fetch(`${API_ROUTE}/orders?${column}=${filter}&_page=${page}&_limit=${limit}`)
            const count = res.headers.get("X-Total-Count");
            const data = await res.json();
            dispatch({ type:orderTypes.GET_ORDERS_SUCCESS, payload:{data:data,count:count}})
        } catch(err) {
            dispatch({ type:orderTypes.ORDER_ERROR, payload:err })
        }
    }
}