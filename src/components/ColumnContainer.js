import React from 'react';
import Column from './Column.js'

import {ColumnContext} from './../context'

function ColumnContainer() {

    const {Consumer: ColumnConsumer} = ColumnContext;
    
    const generateColumns = (context) => {
    
        return context.columns.map(column =>
            <Column className={column.className} key={column.id} id={column.id} item={column} columnTitle={column.title} limit={column.limit}/>)
    }
    
    return (
        <div className='column__container'> 
            <ColumnConsumer>
                {(context) =>  generateColumns(context)}
            </ColumnConsumer>
        </div>
    )
}

export default ColumnContainer
