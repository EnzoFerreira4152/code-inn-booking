import React, { useState } from 'react'
import EyeIcon from '../assets/images/svg/EyeIcon'
import Input from './Input';


import '../styles/Input.css'

function PasswordInput({ label, name, error }) {

    const [shown, setShown] = useState(false);

    return (
        <Input name={name} label={label} type={!shown ? 'password' : 'text'} error={error}>
            <EyeIcon className="reveal" handleClick={() => setShown(!shown)} />
        </Input>
    );

}

export default PasswordInput