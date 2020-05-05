import React, { useState, useCallback } from 'react';
import { debounce } from "lodash";
import HeaderContainer from './HeaderContainer';

const Number = ({ title, value, onChange }) => {
    const [mod, setMod] = useState(0);


    const handler = useCallback(debounce((v) => { onChange(v); setMod(0); }, 500), []);

    const onClick = (n) => {
        setMod((x) => x + n);

        handler(value + mod + n);
    };

    return (
        <HeaderContainer title={title}>
        <div className="number">
            <span className="minus" onClick={() => onClick(-1)}>-</span>
            <span>{value + mod}</span>
            <span className="plus" onClick={() => onClick(1)}>+</span>
        </div>
        </HeaderContainer>
    );
};

export default Number;