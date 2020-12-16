import React from 'react'
import {
    BrowserRouter,
    Route,
    Switch
  } from 'react-router-dom';
import App from './App';
import NotFound from './NotFound'
export default function Main() {
    return (
        <BrowserRouter>
        <div className="container">
          
          <Switch>
            <Route exact path="/" component={App} />
            {/* <Route path="/about" render={ () => <About title='About' /> } />
            <Route exact path="/teachers" component={Teachers} />
            <Route path="/teachers/:topic/:name" component={Featured} />
            <Route path="/courses" component={Courses} /> */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
}
