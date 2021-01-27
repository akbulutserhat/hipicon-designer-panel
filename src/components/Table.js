import React from 'react'
import { useTable, usePagination, useRowSelect,useSortBy } from 'react-table'

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
          <span className="checkbox-custom rectangular"></span>
        </>
      )
    }
  )
  
  const Table = ({ 
    columns,
    data,
    showCargoDetail,
    showOrderDetail,
    isOrderPage,
    onPageChange,
    onPageSizeChange,
    pageCount:controlledPageCount
    }) => {
    
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, // Instead of using 'rows', we'll use page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      gotoPage,
      nextPage,
      pageCount,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        manualPagination: true, 
        pageCount: controlledPageCount,
        initialState:{pageSize:8},
        autoResetPage: false
      },
      useSortBy,
      usePagination,
      useRowSelect,
      hooks => {
        hooks.visibleColumns.push(columns => [
          // Let's make a column for selection
          {
            id: 'selection',
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <label className="checkbox-label">
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </label>
            ),
       
            Cell: ({ row }) => (
              <label className="checkbox-label">
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </label>
            ),
          },
          ...columns,
        ])
      }
    )

    const handleShowCargoClicked = (param) => {
      showCargoDetail(param.row.original)
    }

    const handleShowOrderDetailClicked = (param) => {
      showOrderDetail(param.row.original)
    }
    
    return (
      <>
      <table className="styled-table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column,index) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        { index !== 0 && index !== headerGroup.headers.length -1 &&
                        <span className="float-right">
                            {column.isSorted
                            ? column.isSortedDesc
                                ? <i className="fas fa-sort-down"></i>
                                : <i className="fas fa-sort-up"></i>
                            : <i className="fas fa-sort"></i>
                            }
                        </span>
                        }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell,index) => {
                    return <td {...cell.getCellProps()}
                    onClick={isOrderPage & index === row.cells.length -1 ?() => handleShowCargoClicked(cell):
                      isOrderPage & index === 1 ?() => handleShowOrderDetailClicked(cell):() => {}}>
                      {isOrderPage ? index !== row.cells.length -1 ? cell.render('Cell'): 
                      <i className="fas fa-truck ml-3"></i> : cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="table-footer d-flex justify-content-between">
            <div className="left-footer">
                <span className="mr-2">View</span>
                <select
                    value={pageSize}
                    onChange={e => {
                      onPageSizeChange(Number(e.target.value),pageIndex);
                      setPageSize(Number(e.target.value))
                    }}
                >
                    {[8, 16, 32, 64, 128].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        {pageSize}
                    </option>
                ))}
                </select>
                <span className="ml-2">items per page</span>
            </div>
          <div className="right-footer">
            <button onClick={() =>{ gotoPage(0);onPageChange(0)}} disabled={!canPreviousPage}>
                {'<<'}
            </button>
            <button onClick={() =>{ previousPage();onPageChange(pageIndex-1)}} disabled={!canPreviousPage}>
                {'<'}
            </button>{' '}
            <span>
                Page{' '}<strong>{pageIndex +1 }</strong> of {pageOptions.length}
            </span>
            <button onClick={() =>{ nextPage();onPageChange(pageIndex + 2 )}} disabled={!canNextPage}>
                {'>'}
            </button>
            <button onClick={() => {gotoPage(pageCount - 1);onPageChange(pageCount -1 )}} disabled={!canNextPage}>
                {'>>'}
            </button>
            
            
          </div>
        </div>
        {/* Seçilen itemlere bu şekilde erişebiliniyor
        <div>
            {selectedFlatRows.map((d) => d.original.status )}
        </div> */}
      </>
    )
  }
  
  export default Table
  