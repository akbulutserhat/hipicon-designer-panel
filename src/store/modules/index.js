import { combineReducers } from "redux"
import authReducer  from './auth/auth.reducer'
import orderReducer from "./order/order.reducer"
import productReducer from "./product/product.reducer"

const reducer = combineReducers({
    Auth: authReducer,
    Order: orderReducer,
    Product: productReducer
  })
  
  export default reducer