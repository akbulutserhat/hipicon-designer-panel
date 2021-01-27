import * as productTypes from './product.types';

export const initialState = {
    products:[],
    count:0,
    isLoading:false,
    productError:null
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case productTypes.GET_PRODUCTS_REQUEST:
        case productTypes.EDIT_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading:true
            }
        case productTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading:false,
                products:action.payload.data,
                count:action.payload.count
            }
        case productTypes.EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading:false
            }
        case productTypes.PRODUCT_ERROR:
            return {
                ...state,
                isLoading:false,
                productError:action.payload
            }
        default:
            return state;
    }
}

export default productReducer;