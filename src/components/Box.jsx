import React, {useEffect,useContext} from 'react';
import { css } from '@emotion/react';
import TimeseriesChart from './TimeseriesChart';
import HistogramChart from './HistogramChart';
import KPIs from './KPIs';
import {Context}  from '../context/Store';

const Box = () => {
    const [state, dispatch] = useContext(Context);

    useEffect(()=>{
    },[state.currentTab])

    return (
        <div css={boxStyle}>     
            {state.currentTab? <h3>Insights for metric {state.currentTab}</h3> : <h3>Add Metric to view insights</h3>}
            <div className='charts'>
                <div className="chart">
                    <TimeseriesChart/>
                </div>
                <div className='chart'>
                    <HistogramChart/>
                </div>
            </div>
            <KPIs/>
        </div>  
    );
  };


  const boxStyle = () => {
    return css`
      width: 75%;
      margin: -1px auto 0px;
      text-align: center;
      border: 1px #ccc solid;
      margin-bottom:80px;

      & > h3 {
          margin-top: 20px;
      }
      & div.charts{
          display:flex;
          flex-direction: row;
          justify-content:space-between;
          padding:0px 10px
      }
      & div.chart {
        width: 49%;
        margin: 5px 5px;
        background-color:#fff;
      }
    `;
  };

export default Box;