import React from 'react';
import { Global, css } from '@emotion/react';
import Header from "./components/Header";
import Tabs from './components/Tabs';
import Box from './components/Box';
import DatePicker from './components/DatePicker';
import Store from './context/Store';

const App = () => {
    return (
      <Store>
        <div>
            <Global styles={css`
                  html, body {
                    background: whitesmoke;
                    text-align: center;
                  }
              `}
            />
            <Header/>
            <div className="body">
              <DatePicker/>
            </div>
            <div className="insights">
              <Tabs>
                <Box/>
              </Tabs> 
            </div>
        </div>
      </Store>
    )
}

export default App;