import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AddTransactionModal = ({ addTransaction, isModalOpen, closeModal, transactionToEdit, editTransaction }) => {
    const [title, setTitle] = useState(transactionToEdit ? transactionToEdit.title : '');
    const [date, setDate] = useState(transactionToEdit ? transactionToEdit.date : '');
    const [amount, setAmount] = useState(transactionToEdit ? transactionToEdit.amount.toString() : '');
    const [type, setType] = useState(transactionToEdit ? transactionToEdit.type : '');

    // Error States
    const [titleError, setTitleError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [typeError, setTypeError] = useState(false);

    useEffect(() => {
        if (transactionToEdit) {
            setTitle(transactionToEdit.title);
            setDate(transactionToEdit.date);
            setAmount(transactionToEdit.amount);
            setType(transactionToEdit.type);
        } else {
            // Reset the form
            setTitle('');
            setDate('');
            setType('');
            setAmount('');
        }
    }, [transactionToEdit]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let hasError = false;

        if (!title) {
            setTitleError(true);
            hasError = true;
        } else {
            setTitleError(false);
        }

        if (!date) {
            setDateError(true);
            hasError = true;
        } else {
            setDateError(false);
        }

        if (!type) {
            setTypeError(true);
            hasError = true;
        } else {
            setTypeError(false);
        }

        if (!amount) {
            setAmountError(true);
            hasError = true;
        } else {
            setAmountError(false);
        }

        if (hasError) return;

        const newTransaction = {
            id: Date.now(),
            title,
            date,
            type,
            amount: Number.parseFloat(amount)
        }

        if (transactionToEdit) {
            editTransaction(transactionToEdit.id, newTransaction);
        } else {
            addTransaction(newTransaction);
        }

        // Reset the form
        setTitle('');
        setDate('');
        setType('');
        setAmount('');

        // Close the modal after done editing 
        closeModal();
    }

    const handleBlur = (field) => {
        switch (field) {
            case 'title':
                setTitleError(!title);
                break;

            case 'amount':
                setAmountError(!amount);
                break;

            case 'date':
                setDateError(!date);
                break;

            case 'type':
                setTypeError(!type);
                break;

            default:
                break;
        }
    }

    return (
        <ModalContainer>
            <form onSubmit={handleFormSubmit}>
                <ModalHeader>
                    <span className='close-modal-icon' onClick={closeModal}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                    {
                        transactionToEdit ? (<button type='submit'>Edit</button>) : (<button type='submit'>Add</button>)
                    }
                </ModalHeader>
                <ModalBody>
                    <div className='amount-div'>
                        <h2>$</h2>
                        <input
                            className={amountError ? 'input-error' : ''}
                            type="number"
                            placeholder='0.00'
                            value={amount}
                            onBlur={() => handleBlur('amount')}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className='amount-div'>
                        <h2>Aa</h2>
                        <input
                            className={`input-title ${titleError ? 'input-error' : ''}`}
                            type="text"
                            placeholder='Transaction title...'
                            value={title}
                            onBlur={() => handleBlur('title')}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                </ModalBody>

                <ModalFooter>
                    <div className='income__form'>
                        <p>
                            <span><i class="fa-solid fa-money-check-dollar"></i></span>
                            &nbsp;
                            <span>Type</span>
                        </p>
                        <select
                            className={typeError ? 'input-error' : ''}
                            name="" id=""
                            value={type}
                            onBlur={() => handleBlur('type')}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className='expense__form'>
                        <p>
                            <span><i className="fa-solid fa-calendar-days"></i></span>
                            &nbsp;
                            <span>When</span>
                        </p>
                        <input
                            className={dateError ? 'input-error' : ''}
                            type="date"
                            onBlur={() => handleBlur('date')}
                            placeholder='dd-mm-yyyy'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </ModalFooter>
            </form>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.7);

    & > form{
        width: 330px;
        /* padding: 1.8rem; */
        border-radius: 1.2rem;
        background: var(--modal-bg-clr);
        border: 1px solid var(--modal-border-clr);
        overflow: hidden;
    }
`;

const ModalHeader = styled.div`
    padding: 1rem 1.2rem;

    .close-modal-icon{
        cursor: pointer;
    }

    display: flex;
    justify-content: space-between;

    & > span i{
        font-size: 2rem;
    }
`;

const ModalBody = styled.div`
    padding: 1rem 1.2rem;

    .input-title{
        font-weight: 500;
        font-size: 1.3rem;
    }

    .input-error{
        border-bottom: 2px solid var(--danger-red-clr);
    }

    input{
        width: 100%;
        background: transparent;
        border: none;
        padding: 0.4rem 1rem;
        font-size: 2.5rem;
        font-weight: 700;
        outline: none;
        margin: 0.9rem 0;
        color: var(--body-text-clr);
        border-bottom: 2px solid var(--faint-clr);
        
        &::placeholder{
            color: var(--modal-input-text-clr);
        }
    }

    .amount-div{
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }

    .amount-div h2{
        font-size: 2.2rem;
        color: var(--faint-clr);
    }
`;

const ModalFooter = styled.div`
    .income__form, .expense__form{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.2rem;
        padding: 1rem 0.8rem;
        font-weight: 700;
    }

    .income__form:hover, .expense__form:hover{
        background: var(--button-bg-clr);
    }

    .income__form p, .expense__form p{
        color: var(--faint-clr);
    }

    select, input[type='date']{
        background: transparent;
        font-size: 1.1rem;
        padding: 0.4rem 1.3rem;
        color: var(--body-text-clr);
        border: none;
    }

    select option{
        background: var(--modal-bg-clr);
        color: var(--body-text-clr);
    }
`;

export default AddTransactionModal;