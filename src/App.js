import React from 'react';
import { Grid } from '@material-ui/core';
import './App.css';
import history from "./utils/History";

const Title = props => {
  return (
    <Grid container justify="center" alignItems="center" style={{height:"50px"}}>
          <div className="employeeexplorer" style={{color:"#1d8ede"}}>
            {props.title}
        </div>
     </Grid>
  )
}

const Search = props =>{

  return(
    <Grid container justify="center" alignItems="center" style={{height:"50px"}}>
          <Grid container direction="row" style={{width:"450px"}}>
                  <input  
                    type={props.type}
                    name={props.name} 
                    placeholder={props.placeholder}
                    className="kotakinputprofileemploye"
                    value={props.value}
                    onChange= {props.onChange}
                    style={{height:"50px"}}
                  /> 

                  <div onClick={props.submit} className="buttonlistemployee" style={{color:"#ffffff",backgroundColor:"#1d8ede"}}>
                        Search
                  </div>
          </Grid>

      </Grid>

  )
}


export default  class Displayreport extends React.Component {

    constructor(props) {
        super (props);
        this.state = {
          nameofemployee :"",
      }
      
    }

    Submitname= () =>{
        const { nameofemployee } = this.state;
        history.push('/overview?name='+nameofemployee)
        window.location.reload();

     } 
    componentDidMount() {
    }

    render() {
      const { nameofemployee } = this.state;
        return (
            
            <React.Fragment>
                <Grid>
                   <Title title="Employee Explorer"/>
                   <Search  type="text" name="confirmemploye" placeholder="Employee Name?"  onChange={e => {this.setState({ nameofemployee : e.target.value }) }} value={nameofemployee}  submit={this.Submitname} />
              </Grid>                  
            </React.Fragment>
        );
    }
}







  








