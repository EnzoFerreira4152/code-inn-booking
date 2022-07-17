import React from 'react'
import { Field, ErrorMessage } from 'formik'

import '../styles/Input.css'

function Input({ name, label, type = 'text', children, error }) {
    return (
        <div className="input-container">
            <label className="input-label font-sm" htmlFor={name}>
                {label}
            </label>
            {
                name === 'password' &&
                <div className="password-container">
                    <Field className={`input-square font-sm${error ? ' input-error' : ''}`} id={name} type={type} name={name} />
                    {children}
                    <ErrorMessage name={name} component="span" />
                </div>
            }
            {
                name !== 'password' &&
                <>
                    <Field className={`input-square font-sm${error ? ' input-error' : ''}`} id={name} type={type} name={name} />
                    <ErrorMessage name={name} component="span" />
                </>
            }
        </div>
    )
}

export default Input