import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../../store/auth-context';

import OwnerTab from './OwnerTab';
import UserTab from './UserTab';
const Report = (props) => {
    const ctx = useContext(AuthContext);
    return (
        <div>
            {ctx.isLoggedIn.owner && <OwnerTab/>}
            {!ctx.isLoggedIn.owner && <UserTab type={props.param}/>}
        </div>
    );
};

export default Report;