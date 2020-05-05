import React from 'react';

const HeaderContainer = ({title, children}) => {
    const className = `HeaderContainer ${title}`;
    return (
        <div className={className}>
            <h1 className="header">{title}</h1>
            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default HeaderContainer;