import React, {useContext, useEffect, useState} from "react";
import { css } from '@emotion/react';
import {DateFormatter} from "../utils";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import {Line} from "react-chartjs-2";
import {Context}  from '../context/Store';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const TimeseriesChart = () => {

    const repositories = [
        "github.com/athenianco/athenian-api",
        "github.com/athenianco/athenian-webapp",
        "github.com/athenianco/infrastructure",
        "github.com/athenianco/metadata"
    ]

    const [state, dispatch] = useContext(Context);
    const [labels, setLabels] = useState();
    const [chartData, setChartData] = useState();
    const [averages, setAverages] = useState();
    const [loading, setLoading] = useState(false);

    const data = {
        labels: labels,
        datasets: [
          {
            label: state.currentTab || "No Metric",
            data: chartData,
            fill: true,
            backgroundColor: "orange",
            borderColor: "green"
          },
          {
            label: "Averages",
            data: averages,
            fill: false,
            borderColor: "#742774",
            borderDash: [15, 2],
          }
        ]
    };

    const fetchData = () =>{
        setLoading (true);
        fetch("https://api.athenian.co/v1/metrics/pull_requests", {
                "body": JSON.stringify({
                    "for":[
                    {"repositories": repositories}
                    ],
                    "metrics":[state.currentTab],
                    "date_from":state.dateRange[0],
                    "date_to": state.dateRange[1],
                    "granularities":["week"],
                    "exclude_inactive":true,
                    "account":1,
                    "timezone":60
                }),
                "method": "POST",
                "mode": "cors",
                "credentials": "omit"
            })
            .then(response => response.json())
            .then(data => {
                var labels = getValues(data.calculated[0].values, "labels");
                var values = getValues(data.calculated[0].values, "values");
                setLabels(labels)
                setChartData(values)
                const arrAvg = (values.reduce((a,b) => a + b, 0) / values.length) || 0;

                dispatch({type:"SET",key:"kpiAverage", payload: arrAvg});
                setAverages(Array(labels.length).fill(arrAvg));
                setLoading(false);
            }).
            catch(err => {
                dispatch({type:"SET",key:"kpiAverage", payload: 0});
                setLoading(false);
        });
        
    }

    const getValues = (data, valueType) => {
        const values = [];
        data.forEach(function(item){
            if (valueType === "labels"){
               const value = item.date;
               values.push(DateFormatter(value));
            }else{
               const value = item.values[0];
               values.push(value);
            }
        })
        return values;
    }

    useEffect(()=>{
        if(typeof state.currentTab !== "undefined" && state.dateRange !== null){
            fetchData();
        }else{
            setLoading(false);
        }
        // eslint-disable-next-line
    }, [state.dateRange, state.currentTab]);
    
    return (
        <div css={timeSeriesChartStyle}>
            {loading ? <div className="loadingContainer"><p>Loading..</p></div> : <Line data={data}/>}
        </div>
    )
}

const timeSeriesChartStyle = () => {
    return css`
        width: 90%;
        padding: 10px;
        margin:5px;

        & div.loadingContainer{
            height:225px;
            width:100%;
        }
    `
}

export default TimeseriesChart;