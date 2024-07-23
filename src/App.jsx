import './App.css';
import data from './constants/data.json'
import Header from './components/Header';
import Table from './components/Table';
import TableHeader from './components/TableHeader';
import Wallet from './components/Wallet';
import styled from 'styled-components';
import TransactionModal from './components/modal/TransactionModal';
import { useState, useEffect } from 'react';
import { calculateTotalAmount } from './utils';

function App() {
  const [appTheme, setAppTheme] = useState(() => {
    let savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'dark-theme';
  });

  const [transactions, setTransactions] = useState(() => {
    try {
      const savedTransactions = localStorage.getItem('transactions');
      return savedTransactions ? JSON.parse(savedTransactions) : data;
    } catch (err) {
      console.error('Fail to store the transaction to localstorage', err);
      return data;
    }
  });

  const [totalAmount, setTotalAmount] = useState(() => {
    const { totalExpense, totalIncome } = calculateTotalAmount(transactions);
    return (totalIncome - totalExpense);
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [loading, setLoading] = useState(true);

  // Simulating shimmer effect on table
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setTransactions(data);
    }, 1000);
  }, []);

  useEffect(() => {
    document.body.className = appTheme;
    localStorage.setItem('theme', appTheme);
  }, [appTheme]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    const { totalExpense, totalIncome } = calculateTotalAmount(transactions);
    setTotalAmount(totalIncome - totalExpense);
  }, [transactions]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if(searchQuery){
        setFilteredTransactions(transactions.filter((transaction) => {
          return transaction.title.toLowerCase().includes(searchQuery.toLowerCase());
        }))
      }else{
        setFilteredTransactions(transactions);
      }
    }, 400);

    return () => clearTimeout(debounce);
  }, [searchQuery, transactions]);

  const openModalToAdd = () => {
    setIsModalOpen(true);
    setTransactionToEdit(null);
  }

  const openModalToEdit = (transaction) => {
    setIsModalOpen(true);
    setTransactionToEdit(transaction);
  }

  const closeModal = () => {
    setIsModalOpen(false);  
    setTransactionToEdit(null);
  }

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  }

  const deleteTransaction = (id) => {
    setTransactions((prevState) => {
      return prevState.filter((transaction) => transaction.id !== id);
    });
  }

  const editTransaction = (id, updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) => (
      transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
    ));
    setTransactions(updatedTransactions);
  }

  const { totalExpense, totalIncome } = calculateTotalAmount(transactions);

  return (
    <MainContainer>
      <Header 
        theme={appTheme}
        setAppTheme={setAppTheme}
      />
      <ExpenseContainer>
        <LeftDiv>
          <Wallet
            totalExpense={totalExpense}
            totalIncome={totalIncome}
            balance={totalAmount}
            totalTransactions={transactions.length}
          />
        </LeftDiv>
        <RightDiv>
          <SearchInput 
            type="text"
            placeholder='Search transaction by title'
            className='search-input'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <TableHeader
            openModalToAdd={openModalToAdd}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
          />
          {isModalOpen && (
            <TransactionModal
            addTransaction={addTransaction}
            closeModal={closeModal}
            transactionToEdit={transactionToEdit}
            editTransaction={editTransaction}
          />
          )}
          <Table
            transactions={filteredTransactions}
            deleteTransaction={deleteTransaction}
            openModalToEdit={openModalToEdit}
            loading={loading}
            isDelete={isDelete}
          /> 
        </RightDiv>
      </ExpenseContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  position: relative;
  max-width: 100%;
  padding: var(--common-padding) ;
`;

const ExpenseContainer = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr; 
  grid-gap: 1rem;
  padding: var(--common-padding) ;
  padding-left: 0rem;

  @media(max-width: 991px){
    grid-template-columns: 1fr; 
  }
`;

const LeftDiv = styled.div`

  @media(max-width: 991px){
    margin: 1rem 0;
  }
`;

const RightDiv = styled.div`
  height: 100vh;
  border-left: 0.16rem solid var(--border-bg-clr);
  padding-top: 1rem;
  padding-left: 1rem;
  

  @media(max-width: 991px){
    border-left: none;
    padding: 0;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 1.1rem;
  padding: 0.6rem 1.2rem;
  background-color: var(--body-bg-clr);
  color: var(--body-text-clr);
  border: 2px solid var(--body-text-clr);
  border-radius: 2rem;
  outline: none;
`;

export default App
