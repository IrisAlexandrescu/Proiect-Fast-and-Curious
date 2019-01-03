import React from 'react';
import './UserForm.css';
import { Label, FormGroup, Input } from 'reactstrap';
const UserForm = (props) => {
    return (
        <div>
            <h1>Hello, there!</h1>
            <FormGroup>
                <Label>Enter your name:</Label>
                <Input
                    type="text"
                    name="name"
                    id="username"
                    placeholder="John Doe"
            />
            </FormGroup>
        </div>
    );
}

export default UserForm;
