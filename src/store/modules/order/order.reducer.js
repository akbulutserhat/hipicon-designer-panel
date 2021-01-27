import * as orderTypes from './order.types';

export const initState = {
    orders:[],
    count:0,
    isLoading:false,
    orderError:null
}

const orderReducer = (state = initState, action) => {
    switch(action.type) {
        case orderTypes.GET_ORDERS_REQUEST:
            return {
                ...state,
                isLoading:true
            }
        case orderTypes.GET_ORDERS_SUCCESS:
            return {
                ...state,
                isLoading:false,
                orders:action.payload.data,
                count:action.payload.count
            }
        case orderTypes.ORDER_ERROR:
            return {
                ...state,
                isLoading:false,
                orderError:action.payload
            }
        default:
            return state;
    }
}

export default orderReducer;