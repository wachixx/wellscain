import React, {useContext} from 'react';
import { css } from '@emotion/react';
import {Context}  from '../context/Store';

const KPIs = () => {
    const [state, dispatch] = useContext(Context);
    return (
        <div css={kpiStyle}>
            <div className='kpi'>
                <span>AVERAGE</span>
                <span className='avgs'>{state.kpiAverage}</span>
            </div>
            <div className='kpi'>
                <span>AVG. PER REPO</span>
                <span className='avgs'>{state.kpiAveragePerRepo}</span>
            </div>
        </div>
    )
}

const kpiStyle = () => {
    return css`
      width: 60%;
      border: 1px #ccc solid;
      padding:5px;
      margin: 15px auto;
      display:flex;
      flex-direction: row;
      justify-content:space-between;

      & div.kpi {
        width: 44.5%;
        background-color:#fff;
        display:flex;
        flex-direction: row;
        justify-content:space-between;
        padding:15px;
        border-radius:5px;
      }

      & div.avgs {
          font-weight: bolder;
      }
    `;
  };

export default KPIs;