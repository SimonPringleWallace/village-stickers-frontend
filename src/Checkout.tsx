import React, { useState } from 'react'
import { Form, Message } from 'semantic-ui-react'
import { states } from './assets/states';

const style = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 500
}

const stateOptions = states.map(state => ({ text: state, value: state }))

const Checkout = () => {
    const [ userDetails, setUserDetails ] = useState({} as {[formValue: string]: string});
    const [ isFormError, setIsFormError ] = useState(false); 
    
    
    const handleChange = (key:string, e: React.SyntheticEvent<HTMLElement, Event>, { value }: any) => {
        setUserDetails({
            ...userDetails, 
            [key]: value
        }) 
    }

    const onSubmit = () => {
        console.log('submitted')
       for (const value in userDetails) {
        userDetails[value]
        if (userDetails[value] === '' || userDetails[value] == null) {
            setIsFormError(true);
            return;
        }
        if(isFormError)
            setIsFormError(false);


       }
    }
    console.log(isFormError)
    // on submit check for empty fields
    return (
        <Form error={isFormError} widths='equal' onSubmit={onSubmit}>
            <Form.Group style={style}>
            <Form.Input onChange={(e, data) => handleChange('firstName', e, data)} required label='First name' placeholder='First name' />
            <Form.Input onChange={(e, data) => handleChange('lastName', e, data)} required  label='Last name' placeholder='Last name' />
            <Form.Input onChange={(e, data) => handleChange('address', e, data)} required  label='Address' placeholder='Address' />
            <Form.Input onChange={(e, data) => handleChange('city', e, data)} required  label='City' placeholder='City' />
            <Form.Input onChange={(e, data) => handleChange('state', e, data)} required label='State' placeholder='State'
          />
            </Form.Group>
            <Form.Button enabled>Submit</Form.Button>
            <Message
                error
                header='Require Fields'
                content='Please fill all required fields.'
            />
        </Form>
    );
}

export default Checkout