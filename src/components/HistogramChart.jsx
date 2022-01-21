import React , {useContext, useEffect, useState} from "react";
import { css } from '@emotion/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Filler
} from 'chart.js'
import { Bar } from "react-chartjs-2";
import {Context}  from '../context/Store';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Filler
)

const HistogramChart = () => {

    const repositories = [
        "github.com/athenianco/athenian-api",
        "github.com/athenianco/athenian-webapp",
        "github.com/athenianco/infrastructure",
        "github.com/athenianco/metadata"
    ]

    const [state, dispatch] = useContext(Context);
    const [labels, setLabels] = useState();
    const [chartData, setChartData] = useState();
    const [loading, setLoading] = useState(false);

    const data = {
        labels: labels,
        datasets: [
          {
            label: state.currentTab || "No Metric",
            data: chartData,
            fill: true,
            backgroundColor: "orange"
          }
        ]
    };

    const fetchData = () =>{
        setLoading (true);
        fetch("https://api.athenian.co/v1/metrics/pull_requests", {
                "body": JSON.stringify({
                    "for":[
                        {"repositories": repositories, "repogroups":[[0],[1],[2],[3]]}
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
                var values = getValues(data.calculated);
                const arrAvg = (values.reduce((a,b) => a + b, 0) / values.length) || 0;
                setChartData(values);
                dispatch({type:"SET",key:"kpiAveragePerRepo", payload: arrAvg});
                setLoading (false);
        }).
        catch(err => {
                dispatch({type:"SET",key:"kpiAveragePerRepo", payload: 0});
                setLoading(false);
        });
    }

    const getValues = (data) => {
        let chartValues = [];
        data.forEach(item => {
            let value = item.values.reduce((n, {values}) => n + values[0], 0);
            chartValues.push(value);
        });
        return chartValues;
    }

    useEffect(()=>{
        let chartLabels = [];
        repositories.forEach(repo => {
            chartLabels.push(repo.split("/").pop());
        });
        setLabels(chartLabels)
    },[])

    useEffect(()=>{
        if(typeof state.currentTab !== "undefined" && state.dateRange !== null){
            fetchData();
        }else{
            setLoading(false);
        }
        // eslint-disable-next-line
    }, [state.dateRange, state.currentTab]);
    
    return (
        <div css={chartStyle}>
            {loading ? <div className="loadingContainer"><p>Loading..</p></div> : <Bar data={data}/>}
        </div>
    )
}

const chartStyle = () => {
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

export default HistogramChart;