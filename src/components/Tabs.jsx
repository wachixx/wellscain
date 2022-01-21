import React, {useContext, useEffect} from 'react';
import { css } from '@emotion/react';
import {v1 as uuid} from "uuid"; 
import {Context}  from '../context/Store';

const Tabs = ({ children }) => {

    let metricsList = [
        "pr-wip-time",
        "pr-wip-count",
        "pr-review-time",
        "pr-review-count",
        "pr-merging-time",
        "pr-merging-count",
        "pr-release-time",
        "pr-release-count",
        "pr-lead-time",
        "pr-lead-count",
        "pr-cycle-time",
        "pr-cycle-count",
        "pr-opened",
        "pr-reviewed",
        "pr-not-reviewed",
        "pr-merged",
        "pr-rejected",
        "pr-closed",
        "pr-done"
    ]

    const [state, dispatch] = useContext(Context);

    const addTab = (metric) => {
        let tabs = state.tabs? state.tabs : [];
        let newTabsList = [...tabs, metric]

        //remove duplicates
        newTabsList = [...new Set(newTabsList)];
        dispatch({type:"SET",key:"currentTab", payload: metric});
        dispatch({type:"SET",key:"tabs", payload: newTabsList});
    }

    const removeTab = (metric) => {
        let tabPosition = state.tabs.indexOf(metric);
        let newTabs  = state.tabs.filter((tab) => tab !== metric);

        if (tabPosition !== 0) {
            dispatch({type:"SET",key:"currentTab", payload: state.tabs[tabPosition-1]});
        }else if(tabPosition === 0) {
            dispatch({type:"SET",key:"currentTab", payload: state.tabs[tabPosition+1]});
        }else{
            dispatch({type:"SET",key:"currentTab", payload: ""});
        }
        dispatch({type:"SET",key:"tabs", payload: newTabs});
    }

    const setActiveTab = (tabDetails) => {
        dispatch({type:"SET",key:"currentTab", payload: tabDetails});
    }

    return (
        <div css={insightsStyle}>
            <h2>Insights</h2>
            <div className="tabs">

                {state.tabs?.map((tab, index) => {
                    return (
                    <div className={tab === state.currentTab? 'tab tabCurrent': 'tab'} key={index}><span onClick={() => setActiveTab(tab)}>{tab} </span>
                        <button className='closeTab' onClick={() => removeTab(tab)}>X</button> 
                    </div>
                )})}

                <div className='btnContainer'>
                    <button className='addTab' >ADD METRIC</button>
                    <div className='dropDown'>
                        <ul>
                            {metricsList?.map((item,index) => {
                                return (
                                    <li key={index} onClick={() => addTab(item)}>{item}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

            </div>
            {children}
        </div>
    );
};

const insightsStyle = () => {
    return css`
      margin: 30px auto;
      padding: 30px 0;
      width: 90%;
      border: 1px #ccc solid;

      & div.tabs {
      width: 75%;
      margin: 0px auto;
      height: 42px;
      }

      & div.tab {
        float:left;
        border: 1px #ccc solid;
        border-right: none;
        padding: 11px;
        display:flex;
        justify-content:space-between;
        aligh-items: center;
        cursor:pointer;
        z-index:10;
      }

      & div.tab:hover {
          background-color:#eee
      }

      & div.tabCurrent {
        border-bottom: 2px solid orange;
      }

      & button.closeTab {
        height:18px;
        width:18px;
        border: none;
        margin-left:15px;
        font-size:10px;
        padding:0;
        cursor:pointer;
      }

      & div.btnContainer {
        position:relative;
        float:left;
      }

      & button.addTab {
        border: 1px black solid;
        float:left;
        height:42px;
        padding-left:15px;
        padding-right:15px;
      }

      & div.dropDown {
        display: none;
        position: absolute;
        top:41px;
        left:0px;
        background-color:#fff;
        min-width:150px;
        max-height: 250px;
        overflow-y: scroll;
        padding:10px;
        border:1px solid black;
      }

      & div.btnContainer: hover .dropDown {
          display:block;
      }

      & div.dropDown ul {
          padding:0px;
          margin:0px;
          text-align: left;
      }

      & div.dropDown ul li {
        list-style: none;
        padding:10px;
        cursor:pointer;
      }

      & div.dropDown ul li:hover{
        background-color: #f1f1f1;
      }
    `;
};

export default Tabs;