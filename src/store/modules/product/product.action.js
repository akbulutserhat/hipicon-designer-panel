import * as productTypes from './product.types';
import API_ROUTE from '../../../apiRoute';

export const getProducts = ({page,limit}) => {
    return async (dispatch) => {
        dispatch({type: productTypes.GET_PRODUCTS_REQUEST})
        try {
            const res = await fetch(`${API_ROUTE}/products?_page=${page}&_limit=${limit}`)
            const count = res.headers.get("X-Total-Count");
            const data = await res.json();
            dispatch({ type:productTypes.GET_PRODUCTS_SUCCESS, payload:{data:data,count:count}})
        } catch(err) {
            dispatch({ type:productTypes.PRODUCT_ERROR, payload:err })
        }
    }
}

export const editProduct = (id,data) => {
    return async (dispatch) => {
        dispatch({type: productTypes.EDIT_PRODUCT_REQUEST})
        try {
            await fetch(`${API_ROUTE}/products/${id}`,{
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            dispatch({ type:productTypes.EDIT_PRODUCT_SUCCESS})
        } catch(err) {
            dispatch({ type:productTypes.PRODUCT_ERROR, payload:err })
        }
    }
}

export const searchProducts =  ({column,filter,page,limit}) => {
    return async (dispatch) => {
        dispatch({type: productTypes.GET_PRODUCTS_REQUEST})
        try {
            
            const res = await fetch(`${API_ROUTE}/products?${column}=${filter}&_page=${page}&_limit=${limit}`)
            const count = res.headers.get("X-Total-Count");
            const data = await res.json();
            dispatch({ type:productTypes.GET_PRODUCTS_SUCCESS, payload:{data:data,count:count}})
        } catch(err) {
            dispatch({ type:productTypes.PRODUCT_ERROR, payload:err })
        }
    }
}