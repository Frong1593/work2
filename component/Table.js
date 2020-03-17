import React,{Component} from 'react';
import  firebase from '../connection/firebase.js';
class Table extends Component {
    constructor(props){
        super(props)
    
        this.state = ({
    
          title: "",
          
          break:'',
           
          items2:[], 
    
          items:[],
          item_id:'',
          title_input:'',
          description:[]
        })
    
    
      
    
      }
    
      componentDidMount(){
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value',(snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for(let item in items){
              newState.push({
                  item_id:item,
                  title_input:items[item].title_input,
                  description:items[item].description
                  
              })
            }
            try{
              this.setState({
              items:newState
            })
          }catch(exception){}
            
        })
    
        const itemsRef2 = firebase.database().ref('list');
        itemsRef2.on('value',(snapshot) => {
          let items2 = snapshot.val();
          let newState2 = [];
          for(let item2 in items2){
            newState2.push({
                item_id:item2,
                title:items2[item2].title,
    
            })
          }
          this.setState({
            items2:newState2
          })
        })
      }
    
      
      handleChange = (e) =>{
        let i;
        this.setState({
          [e.target.name]: e.target.value,
        })
        for(i=0;i<this.state.items.length;i++){
            if(this.state.items[i].name === e.target.value)
            {
              this.setState({
                title:this.state.items[i].title_input
              })
              break
            }
        }
        console.log(this.state.title)
      }
    
      handleSubmit = (e) =>{
        e.preventDefault();
     
        if(this.state.item_id !== ''){
          return this.updateItem();
        }
        
        const itemsRef = firebase.database().ref('items')
        const item = {
          title_input : this.state.title_input,
           description : this.state.description
        }
        itemsRef.push(item)
        this.setState({
           item_id:'',
           title_input:'',
           description:''
        })
     }
    
     handleUpdate = (item_id = null , title_input = null ,description = null) => {
      this.setState({item_id,title_input,description})
    }
    
    updateItem = () =>{
    
        var obj = { title_input:this.state.title_input,description:this.state.description }
    
        const itemsRef = firebase.database().ref('/items')
    
        itemsRef.child(this.state.item_id).update(obj);
    
        this.setState({
          item_id:'',
          title_input:'',
          description:''
        })
    
    }
    
    removeItem = (itemId) => {
      const itemsRef = firebase.database().ref('/items');
      itemsRef.child(itemId).remove();
     
    }
    
    
    
    
    
    submitHandle = (e) =>{
      e.preventDefault();
    
      if(this.state.item_id !== ''){
        return this.updateItem2();
      }
      const itemsRef = firebase.database().ref('items')
        const item = {
           title : this.state.title,
    
        }
        itemsRef.push(item)
        this.setState({
        })             
    }
    
    render(){
      return (
        
        
      
          <div className="container" style={{marginTop:-5}} >
          <div class="container">
          <form  onSubmit={this.handleSubmit}>
        <div className="row">
            <div className="col-10" style={{marginLeft:20}}>
              <div className="form-row">
                <div className="col-2">
                  <input type="text" name="title_input" className="form-control" placeholder="กรอก Title" onChange={this.handleChange} value={this.state.title_input}/>
                </div>
                <div className="col-6">
                  <input type="text" name="description" className="form-control" placeholder="กรอก Description" onChange={this.handleChange} value={this.state.description}/>
                </div>
                <div className="col">
                      <button className="btn btn-success" > Save</button>      
                </div>
              </div>
            </div>
        </div>
      </form>
              {
                        this.state.items.map((item) =>
                         {
                          return (
                            <div class="modal fade" id={item.item_id}  role="dialog">
                            <div class="modal-dialog">
                            
                            
                              <div class="modal-content">
                                <div class="modal-header">
                                <h4 class="modal-title">Description</h4>
                                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                                  
                                </div>
                            <div class="modal-body">
                            <p>{item.description}</p>
                          </div>
                                 <div class="modal-footer">
                                 <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                               </div>
                             </div>
                             
                           </div>
                         </div>
                          )
                          
                        })
              }
      
        
      </div>
        <hr/>
              <table className="table table-sm table-bordered">
                    <tr className="thead-dark" >
                      <th width="10%">Title</th>
                      <th width="10%">Description</th>
                      <th width="2.5%">Edit</th>
                      <th width="2.5%">Delete</th>
                    </tr>
                    {/* <input type="text" class="from-input"/>       */}
                    {
                     
                        this.state.items.map((item) =>  {
                          return (
                        
                            
                              <tr >
                                <td>{item.title_input}</td>
                                <td><button type="button" class="btn btn-info " data-toggle="modal" data-target={'#'+item.item_id}> 
                                  Open Modal</button></td>

                                <td><button className="btn btn-info "  onClick={() => this.handleUpdate(item.item_id,item.title_input,item.description)}>Edit</button></td>
                                <td><button className="btn btn-danger " onClick={() => this.removeItem(item.item_id)}>Delete</button></td>
                                
                              </tr>
                      
                          )
                        })
                    }
                </table>
               
          </div>
  
      
      
    

      );
    }
    
  }
  
  export default Table;
  