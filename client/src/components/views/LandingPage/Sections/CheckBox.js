import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';
import { continents } from './Datas';
const { Panel } = Collapse;



function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value)=>{
        console.log('On change is called');

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if(currentIndex === -1){
            newChecked.push(value);
        }else{
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        //send the checked data to parent component Landing page
        props.handleFilters(newChecked)
    }

    const renderCheckboxLists = () =>  continents.map((continent, index)=>(
        <Checkbox
            onChange={()=>handleToggle(continent._id)}
            key={index}
            checked={Checked.indexOf(continent._id) === -1 ? false : true}
        >
            {continent.name}
        </Checkbox>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['1']} >
                <Panel header="Continents" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
