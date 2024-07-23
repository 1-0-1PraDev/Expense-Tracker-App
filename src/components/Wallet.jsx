import React from 'react'
import styled from 'styled-components';

const Wallet = ({ balance, totalIncome = 0, totalExpense = 0, totalTransactions }) => {
    return (
        <WalletContainer>
            <BalanceDiv>
                <p>Balance</p>
                <h1 className={balance < 0 && 'text-red'}>$ {balance.toLocaleString()}</h1>
                <p>{totalTransactions} transactions</p>
            </BalanceDiv>
            <AmountDiv>
                <div className="incomeBx">
                    <p>
                        <span className="incomeBx__icon">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        &nbsp;
                        <span className='incomeBx--text'>Income</span>
                    </p>
                    <p className="incomeBx__amount">+${totalIncome.toLocaleString()}</p>
                </div>
                <div className="expenseBx">
                    <p>
                        <span className="expenseBx__icon">
                            <i className="fa-solid fa-circle-minus"></i>
                        </span>
                        &nbsp;
                        <span className='expenseBx--text'>Expenses</span>
                    </p>
                    <p className="expenseBx__amount">-${totalExpense.toLocaleString()}</p>
                </div>
            </AmountDiv>
        </WalletContainer>
    )
}

const WalletContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 1.3rem;

    @media(max-width: 991px){
        flex-direction: row;
        align-items: center;
    }
`;

const BalanceDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 1rem;

    & > p:first-child{  
        font-size: 1rem;
        color: var(--faint-clr);    
        font-weight: 600;
    }

    & > h1{
        font-weight: 470;
    }

    & > h1.text-red{
        color: var(--danger-red-clr);
    }
`;

const AmountDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;

    .incomeBx, .expenseBx{
        display: flex;
        width: 100%;
        justify-content: space-between;
        border-bottom: 0.16rem solid var(--border-bg-clr);
        padding-bottom: 1.2rem;

        @media(max-width: 991px){
            align-items: center;
            gap: 0.5rem;
        }
    }

    .expenseBx{
        @media(max-width: 991px){
           border: none;
        }
    }

    .incomeBx > p , .expenseBx > p{
        color: var(--faint-clr);    
        font-weight: 600;
        font-size: 1.2rem;  
    }

    .incomeBx .incomeBx__amount{
        color: var(--button-trans-bg-clr);
    }

    .expenseBx .expenseBx__amount{
        color: #FF7E6E;
    }
`;

export default Wallet;