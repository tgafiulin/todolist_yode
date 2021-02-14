import './AddItem.scss'
import { useState } from 'react'
import Button from 'components/common/Button/Button'
import Input from 'components/common/Input/Input'

function AddItem ({placeholder, addNewItem, buttonValue}) {
    const [inputValue, changeInputValue] = useState('');
    const [errorMessage, editErrorMessage] = useState('');

    const keyPress = (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    }

    const addItem = () => {
        if (inputValue) {
            addNewItem(inputValue);
            changeInputValue('');
            editErrorMessage('');
        } else {
            editErrorMessage('field must not be empty')
        }
    }

    return <div className="add-input-block">
        <Input className="input" value={inputValue} onChange={(e) => changeInputValue(e.target.value)} onKeyPress={keyPress} placeholder={placeholder} />
        <Button onClick={addItem} value={buttonValue} className="button" />
        <span>{errorMessage}</span>
    </div>
    
}

export default AddItem;