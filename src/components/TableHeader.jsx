import React from 'react';
import styled from 'styled-components';

const TableHeader = ({ openModalToAdd, setIsDelete, isDelete }) => {
  return (
    <TableHeaderContainer>
      <Heading>
        Transactions
      </Heading>
      <div>
        <button onClick={() => setIsDelete((prevState) => !prevState)}>{isDelete ? 'Done' : 'Delete'}</button>
        <button className='add-transaction-btn' onClick={openModalToAdd} disabled={isDelete}>New transaction</button>
      </div>
    </TableHeaderContainer>
  )
}

const TableHeaderContainer = styled.div`
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.3rem 0;
  padding: var(--common-padding);

  & > div{
    /* background: pink; */
    display: flex;
    gap: 1.2rem;
  }

  @media(max-width: 768px){
    flex-direction: column;
    gap: 1.2rem;
  }
`;

const Heading = styled.h1`
  font-size: 1.7rem;
`;

export default TableHeader;