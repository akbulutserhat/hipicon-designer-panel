import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicModal from '../DynamicModal';
import { getProducts,editProduct, searchProducts } from '../../store/modules/product/product.action';
import Table from "../Table";
const Products = ({searchColumn,searchText}) => {

  const [openModal,setOpenModal] = useState(false);

  const [isEditPage,setIsEditPage] = useState(false);

  const [rowData,setRowData] = useState();

  const [page,setPage] = useState(0);

  const [ pageSize, setPageSize] = useState(8);

  const [ pageCount, setPageCount ] = useState(1);

  const productState = useSelector((state) => state.Product)

  const products = productState.products;

  const totalCount = productState.count;

  const dispatch = useDispatch()

  useEffect(() => {
    (searchColumn && searchText) ? dispatch(searchProducts({column:searchColumn,filter:searchText,page,limit:pageSize}))
      :dispatch(getProducts({page,limit:pageSize}))
      setPageCount(Math.ceil(totalCount / pageSize))
    },[dispatch,totalCount,page,pageCount,pageSize,searchColumn,searchText])

  const handleEdit = (data) => {
    setOpenModal(true)
    setRowData(data)
    setIsEditPage(true)
  }

  const handleChange = (e) => {
    setRowData({
      ...rowData,
      [e.target.name]: e.target.type === "number" ? e.target.value*1:e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editProduct(rowData.id,rowData))
    dispatch(getProducts({page,limit:pageSize}))
    setOpenModal(false)
  }

  const columns = Object.keys(products[0] ? products[0]:{notFound:'Not Found'}).map((key, id)=>{
    return {
      Header: key,
      accessor: key
    }
  })

  columns.push({
    Header: 'Processes',
    Cell: row => (
        <div className="text-center">
            <a onClick={() => handleEdit(row.cell.row.original)}><i className="fas fa-edit"></i></a>
        </div>
    )
    }
  )

  const Modal = (
    <DynamicModal
      closeModal={() => setOpenModal(false)}
      isEditPage = {isEditPage}
      handleChange= {handleChange}
      handleSubmit = {handleSubmit}
      rowData={rowData}
    ></DynamicModal>
  )

  return (
    <div className="table-container d-flex flex-column">
      <div className="table-header">
       Products
      </div>
      <Table 
      columns={columns} 
      data={products}
      pageCount={pageCount}
      onPageChange={pageIndex => {
          dispatch(getProducts({page:pageIndex,limit:pageSize})) 
          setPage(pageIndex);
      }}
      onPageSizeChange={(pageSize,pageIndex) => {
          dispatch(getProducts({page:pageIndex,limit:pageSize})) 
          setPage(pageIndex);
          setPageSize(pageSize);
      }}
      ></Table>
      {openModal ? Modal:''}
    </div>
  )

}

  export default Products;