import { FC } from 'react';
import Style from './Multihome.css';
import classNames from 'classnames';

const ElementWrapper: FC<any> = props => {

    const classes = classNames(
        Style.ElementWrapperContainer,
        props.blockClass ? Style.ElementWrapperContainer + '--' + props.blockClass : null
    )

    return <div className={classes}>{props.children}</div>
}

export default ElementWrapper;
