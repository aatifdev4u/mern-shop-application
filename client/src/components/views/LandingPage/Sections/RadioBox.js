import React, { useState } from 'react'
import { Collapse, Radio } from 'antd';
import { price } from './Datas';
const { Panel } = Collapse;



function RadioBox(props) {

    const [Value, setValue] = useState(0)

    const radioItem = price.map((item)=> (
        <Radio value={item._id}>{item.name}</Radio>
    ))

    const handleRadioChange = (event)=>{
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }
    return (
        <div>
             <Collapse defaultActiveKey={['1']} >
                <Panel header="Price" key="1">
                <Radio.Group onChange={handleRadioChange}>
                    {radioItem}
                </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
