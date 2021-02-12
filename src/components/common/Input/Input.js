import './Input.scss'

function Input({value, className, onKeyPress, onChange, placeholder}) {
    return <input 
        type="text"
        value={value} 
        className={className}
        onKeyPress={onKeyPress} 
        onChange={onChange}
        placeholder={placeholder}
    />
}

export default Input;