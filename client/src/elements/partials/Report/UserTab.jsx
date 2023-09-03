import React, {useState} from 'react';
import Input from '../../../components/Input/Input';
import classes from './UserTab.module.css'
import Ticket from './Ticket';

const UserTab = (props) => {
    const [input, setInput] = useState(props.type);

    const onChangeHandler = (e) =>{
        setInput(e.target.value);
    }
    return (
       <React.Fragment>
            <div className={classes['wrap-btn']}>
                <Input
                    id="ticket-filter-all"
                    name="ticket-filter"
                    type="radio"
                    onChange={onChangeHandler}
                    checked ={input == "all"}
                    value='all'
                    label='Tutte'/>
                <Input
                    id="ticket-filter-win"
                    name="ticket-filter"
                    type="radio"
                    onChange={onChangeHandler}
                    value="win"
                    checked ={input == "win"}
                    label="Vincenti"/>
            </div>
            <Ticket type={input}/>   
       </React.Fragment>
    );
};

export default UserTab;