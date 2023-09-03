import React from 'react';
import classes from './Cards.module.css'
const Cards = (props) => {
    return (
        <div className="card border-0">
            <div className="position-relative text-white">
                <div className="card-img-overlay three">
                    <span className="badge badge-light text-uppercase">{props.title}</span>
                </div>
                <div className="--card-smooth-caption">
                    <div className="d-flex justify-content-between align-items-center">
                        {props.header}
                    </div>
                </div>
            </div>
            <div className="card-body">
                {props.children}
            </div>
            <div className="card-footer btn-connect">
            </div>
        </div>
    );
};

export default Cards;