import React, { Fragment } from 'react';
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';


/**
 * importing custom components
 */

import Join from './components/Join/Join';
import ChatDashboard from './components/ChatDashboard/Chats';

import { Provider } from 'react-redux';
import store from './store';



const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <main className="main-content">
                        <Switch>
                            <Route exact path='/' component={Join} />
                            <Route exact path='/chats' component={ChatDashboard} />
                        </Switch>
                    </main>
                </Fragment>
            </Router>
        </Provider>

    )
}

export default App;