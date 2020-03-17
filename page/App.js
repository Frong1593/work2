
import React,{Component} from 'react';
import '../page/App.css';

import {createAction} from 'redux-act';
import Table from '../component/Table'
import Modal from '../component/Modal';


export const changeLanguage = createAction ('CHANGE_LANGUAGE');

class App extends Component {

 

  render(){
    return (
      <React.Fragment>
        
              <div className="app ">
                <div className="container" style={{marginTop:70}} >
                  <div class="container">
               
                    <Modal/>  
                  </div>
                         <hr/>
                      <Table/>
                </div>
            </div>
            
            
          
      </React.Fragment>
    );
  }
  
}

export default App;
