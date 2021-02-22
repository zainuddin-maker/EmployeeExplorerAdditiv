import React from 'react';
import { Grid } from '@material-ui/core';
import './App.css';
import axios from 'axios';


const Validate = props => {
    return (
        <Grid  container justify="center" alignItems="center" style={{display: props.nothing ?"":"none"}}>
                <Grid container direction="row" style={{width:"400px",backgroundColor:""}}>
        
                        <div className="employeeexplorer" style={{fontWeight:"500",fontSize:"9px",color: "#de1d1d" }}>
                        { props.validate ==="" ? "!!! Write the employee's name first" : "!!! The name of those amployee are not available  in this company"}
                        </div>
        
                </Grid>
        </Grid>
    )
  }

const List = props =>{

      return(
     
                <Grid container justify="center" alignItems="center" direction="column" >
                        <Grid container direction="row" style={{width:"400px"}}>
                            <div className="employeeexplorer" style={{fontWeight:"500",fontSize:"15px" ,color:"#1d8ede"}}>
                            {props.title}
                            </div>
                        </Grid>

                        <Grid container direction="column" style={{width:"400px"}}>
                            { props.list.length === 0?
                                    <div className="employeeexplorer" style={{fontWeight:"400",fontSize:"13px"}}>
                                        -
                                    </div>
                                    :
                                    
                                    props.list.map((data,i)=>
                                        <div key={i} className="employeeexplorer" style={{fontWeight:"400",fontSize:"13px"}}>
                                        {data}
                                        </div>
                                        )
                            }
                        </Grid>
               </Grid>

      )

}

export default  class Displayreport extends React.Component {

    constructor(props) {
        super (props);
        this.state = {
            nameofemployee :"",
            jobemployee :"",
            datasubordinates : [],
            datanondirectsubordinates : [],
            close : true ,
            count  :0 ,
            nothing : false,
            employeeparent :[],
            allemploye :[
              "John Hartman",
              "Samad Pitt",
              "Amaya Knight",
              "Leanna Hogg",
              "Aila Hodgson",
              "Vincent Todd",
              "Faye Oneill",
              "Lynn Haigh",
              "Nylah Riddle"
            ]
        }
      
    }

    componentDidMount() {

        const param = new URLSearchParams(this.props.location.search);
        console.log(param.get("name"))
        const nameofemployee = param.get("name")
        this.setState({ nameofemployee : nameofemployee })

        axios.get('http://api.additivasia.io/api/v1/assignment/employees/'+ nameofemployee)
              .then(res => {
                this.setState({ nothing : false  })
                this.setState({close : false})
                 if (res.data[0]=== "employee"){
                    this.setState({datasubordinates : [] })
                    this.setState({employeeparent : [nameofemployee] })
                    this.setState({jobemployee : res.data[0]})
                  }else {
                    this.setState({datasubordinates : res.data[1]["direct-subordinates"]  })
                    this.setState({employeeparent : res.data[1]["direct-subordinates"].concat(nameofemployee) })
                    this.setState({jobemployee : res.data[0]})

                  }
                  this.state.allemploye.forEach((allemploye)=>{
                    axios.get('http://api.additivasia.io/api/v1/assignment/employees/'+ allemploye
                    )
                    .then(res => {
                      this.setState({count : 0})
                      if(allemploye !== nameofemployee){
                        this.state.employeeparent.forEach((employeeparent)=>{
                          if(allemploye !== employeeparent){
                            this.setState({count : this.state.count + 1})
                            if (this.state.count === this.state.employeeparent.length ){
                            this.setState({datanondirectsubordinates : this.state.datanondirectsubordinates.concat(allemploye)})
                            this.setState({count : 0})
                            }
                          }
                      })
                      }
                        if (res.data[0] ==="employee"){
                          this.setState({count : 0})
                          this.state.employeeparent.forEach((employeeparent)=>{
                              if(allemploye !== employeeparent){
                                this.setState({count : this.state.count + 1})
                                if (this.state.count === this.state.employeeparent.length ){
                                this.setState({datanondirectsubordinates : this.state.datanondirectsubordinates.concat(allemploye)})
                                this.setState({count : 0})
                                }
                              }
                          })
                      }else {
                        res.data[1]["direct-subordinates"].forEach((directsubordinates)=>{
                          this.setState({count : 0})
                                  this.state.employeeparent.forEach((employeeparent)=>{
                                    if(directsubordinates !== employeeparent){
                                      this.setState({count : this.state.count + 1})
                                      if (this.state.count === this.state.employeeparent.length  ){
                                      this.setState({datanondirectsubordinates : this.state.datanondirectsubordinates.concat(directsubordinates)})
                                      this.setState({count : 0})
                                      }
                                    }
                                })    
                        })
                      }
                    })
                    .catch(error => {
                     
                    });
                  })
              })
              .catch(error => {
                  this.setState({ nothing : true  })
                  this.setState({close : true}) 
              });
           

    }

    render() {
        const { nameofemployee ,nothing ,close ,jobemployee,datasubordinates,datanondirectsubordinates} = this.state;

        return (
            
            <React.Fragment>
                        <Grid>
                              <Validate validate={nameofemployee} nothing={nothing}/>   
                        {
                           close || nameofemployee ==="" ?

                          null
                          :
                          <Grid container justify="center" alignItems="center"  >
                             <List title={"Subordinates of "+jobemployee+" "+nameofemployee+" :"} list={datasubordinates}/>
                             <List title={"Nondirect Subordinates of "+jobemployee+" "+nameofemployee+" :"} list={datanondirectsubordinates.filter(onlyUnique)}/>
                          </Grid>
                          }

              </Grid>      
                 
            </React.Fragment>
        );
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }





  








