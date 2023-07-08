import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../../store/auth-context';

import OwnerTab from './OwnerTab';
import UserTab from './UserTab';
const Report = (props) => {
    const ctx = useContext(AuthContext);
    return (
        <div>
            {ctx.isLoggedIn.owner && <OwnerTab data={props.data} state={props.state}onClose={props.onClose}/>}
            {!ctx.isLoggedIn.owner && <UserTab data={props.data} onClose={props.onClose}/>}
        </div>
    );
};

export default Report;