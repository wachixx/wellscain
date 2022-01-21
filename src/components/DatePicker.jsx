import React, {useState, useContext, useEffect} from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {MonthDiff} from "../utils";
import {Context}  from '../context/Store';

const DatePicker = () => {

    var d = new Date();
    d.setMonth(d.getMonth() - 3);

    const [state, dispatch] = useContext(Context);
    const [value, onChange] = useState([d, new Date()]);

    useEffect(()=>{
        if(MonthDiff(value[0],value[1]) <= 3 ){
            dispatch({type:"SET",key:"dateRange", payload: value});
        }else{
            alert("Date range is limited to at most 3 months of data");
        }
    },[value])

    return (
        <DateRangePicker
            onChange={onChange}
            value={value}
        />
    )
}

export default DatePicker;