import React, { useState } from 'react';
import styled from 'styled-components';
import { Shimmer } from './Shimmer';

const Table = ({ transactions, deleteTransaction, openModalToEdit, loading, isDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(transactions.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleButtonClick = (e, number) => {
    setCurrentPage(number);
  }

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  }

  const handleDeleteTransaction = (id) => {
    if (id == undefined) {
      return;
    }
    deleteTransaction(id);
  }

  const handleEditTransaction = (e, transaction) => {
    openModalToEdit(transaction);
  }

  return (
    <>
      <TableContainer>
        {loading ? <Shimmer rows={3} /> : (
          <table>
            <thead>
              <tr>
                <th>Aa Title</th>
                <th><span><i className="fa-solid fa-calendar-days"></i></span>&nbsp; Date</th>
                <th><span><i className="fa-solid fa-hashtag"></i></span>&nbsp; Amount</th>
                <th>Edit Transaction</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions?.map((expense, ind) => (
                <tr key={`${expense.title}__${expense.id}`}>
                  <td className='title'>
                    <TableRow>
                      {
                        isDelete &&
                        <span onClick={() => handleDeleteTransaction(expense.id)}>
                          <i className="fa-solid fa-circle-xmark"></i>
                        </span>
                      }
                    </TableRow>
                    &nbsp;
                    {expense.title}
                  </td>
                  <td>{expense.date}</td>
                  <td>$ <b>{expense.amount}</b></td>
                  <td>
                    <button onClick={(e) => handleEditTransaction(e, expense)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {currentTransactions.length > 0 && (
          <PaginationDiv>
            <button onClick={handlePrevClick} disabled={currentPage === 1}><span><i className="fa-solid fa-angles-left"></i></span> Prev</button>
            {pageNumbers.map((pageNo, ind) => {
              return <button key={`page_${pageNo}`}
                onClick={(e) => handleButtonClick(e, pageNo)}
              >
                {pageNo}
              </button>
            })}
            <button onClick={handleNextClick} disabled={currentPage === pageNumbers.length}>Next <span><i className="fa-solid fa-angles-right"></i></span></button>
          </PaginationDiv>
        )}
      </TableContainer>
    </>
  )
}

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.2rem;

  .title{
    text-align: left;
    white-space: nowrap;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;

    @media(max-width: 440px){
      white-space: normal;
    }
  }

  table{
    /* border: 1px solid pink; */
    width: 100%;
    border-collapse: collapse;

    th, td{
      padding: 1rem;
    }

    td:not(:first-child){
      text-align: center;
    }

    tr:nth-child(odd) td{
      background-color: var(--button-bg-clr);
    }

    tr:nth-child(odd) td:last-child button{
      background-color: var(--body-bg-clr);
    }

  }

`;

const TableRow = styled.div`
  display: inline-block;

& > span{
    /* margin: 0 0.6rem; */
    cursor: pointer;
    color: var(--danger-red-clr);
  }
`;

const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export default Table;