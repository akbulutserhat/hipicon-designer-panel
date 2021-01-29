import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, searchOrders } from '../../store/modules/order/order.action';
import DynamicModal from "../DynamicModal";
import Table from "../Table";

const Orders = ({searchColumn,searchText}) => {

    const [openModal,setOpenModal] = useState(false);

    const [ whichModal, setWhichModal] = useState("");

    const [rowData, setRowData] = useState();

    const [ filter, setFilter] = useState("all");

    const [page,setPage] = useState(0);

    const [ pageSize, setPageSize] = useState(8);

    const [ pageCount, setPageCount ] = useState(1);

    const orderState = useSelector((state) => state.Order)

    const orders = orderState.orders;

    const totalCount = orderState.count;

    const dispatch = useDispatch()



    useEffect(() => {
      
      (searchColumn && searchText) ? dispatch(searchOrders({column:searchColumn,filter:searchText,page,limit:pageSize}))
      :dispatch(getOrders({filter,page,limit:pageSize}))
      setPageCount(Math.ceil(totalCount / pageSize))
    },[dispatch,totalCount,page,pageCount,pageSize,filter,searchColumn,searchText])

    const columns = Object.keys(orders[0] ? orders[0]:{notFound:'Not Found'}).map((key, id)=>{
      return {
        Header: key,
        accessor: key
      }
    })

    const Modal = (
      <DynamicModal
        closeModal={() => setOpenModal(false)}
        largeModal = {true}
        isCargoModal={whichModal === "cargo" ? true:false}
        isOrderModal={whichModal === "orderDetail" ? true:false}
        rowData={rowData}
      ></DynamicModal>
    )

    const showCargoDetail = (newRowData) => {
      console.log(newRowData)
      setWhichModal("cargo")
      setOpenModal(true)
      setRowData(newRowData)
    }

    const showOrderDetail = (newRowData) => {
      console.log(newRowData)
      setWhichModal("orderDetail")
      setOpenModal(true)
      setRowData(newRowData)
    }

    return (
      <div className="table-container d-flex flex-column">
        <div className="table-header d-flex justify-content-between">
         <span>Orders</span>
         <div>
           <span className="dropdown-label mr-3">Sipariş Türü</span>
         <select
                    value={filter}
                    onChange={e => {
                      setFilter(e.target.value)
                    }}
                >
                    {["all", "Open", "Shipped", "Processing"].map(filterType => (
                    <option key={filterType} value={filterType}>
                        {filterType}
                    </option>
                ))}
                </select>
         </div>
        </div>
        <Table 
        columns={columns} 
        data={orders}
        pageCount={pageCount}
        isOrderPage={true}
        onPageChange={pageIndex => {
            dispatch(getOrders({page:pageIndex,limit:pageSize})) 
            setPage(pageIndex);
        }}
        onPageSizeChange={(pageSize,pageIndex) => {
            dispatch(getOrders({page:pageIndex,limit:pageSize})) 
            setPage(pageIndex);
            setPageSize(pageSize);
        }}
        showCargoDetail={showCargoDetail}
        showOrderDetail={showOrderDetail}></Table>
        {openModal ? Modal:''}
      </div>
    )
  }

  export default Orders;