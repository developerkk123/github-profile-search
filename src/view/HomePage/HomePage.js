import React, { Component } from "react";
import { Link  } from "react-router-dom";
import { Grid, Icon, Input,Header, Segment, Button ,Image, Card} from "semantic-ui-react";
import { getProfile } from "../../action/profileAction";
import { connect } from 'react-redux';

import './HomePage.scss'
class HomePage extends Component {

    constructor(props){  
        super(props);  
        this.state = {  
             people: '',
             suggestion:[],
             userDetails: ''
          }  
      }  
      handleChange=(e)=>{
        let value = e.target.value;
        let suggestion=[];
        if(value.length > 0){
           fetch(`https://api.github.com/search/users?q=${encodeURIComponent(value)}`)
           .then((response)=> response.json())
           .then((result)=>{
               console.log(result, "result")
               this.setState({suggestion: result.items})
           })
           .catch(function(err) {
            console.log(err)
          })
        }
        this.setState({
          people: e.target.value
        })
      }
      handleClick=(item)=>{
        
        console.log(item, "login")
        this.props.dispatch(getProfile(item))
        
        fetch('https://api.github.com/users/' + item, {
            method: 'get'
         })
         .then((res)=>res.json())
         .then((result)=>{
            //  console.log(result)
             fetch(result.repos_url)
             .then((response)=>response.json())
             .then((reposData)=>{
                this.props.dispatch(getProfile(reposData))
                this.setState({people: item, suggestion:[]})
                this.props.history.push( {pathname: "/profile", state: item});
             })
         })
       
      }
      returnSuggestion(){
        const {suggestion}= this.state
        if(suggestion.length == 0){ 
          return null;
        }
        console.log(suggestion, "suggestion")
        return(
          <div className="suggestion-box">
              {
                  suggestion.map((item)=>
                  <Grid>
                  <Grid.Row>
                      <Grid.Column width='2'>
                          <Image src={item.avatar_url} />
                      </Grid.Column>
                      <Grid.Column width='10'>
                      <h4 className="username" onClick={()=>this.handleClick(item.login)}>{item.login}</h4>
                      
                          <p>{item.login}</p>
                      </Grid.Column>
                      <Grid.Column width='4'>
                      <Link to="/profile"><Button visible>Follow</Button></Link>
                        
                        
                      
                      </Grid.Column>
                  </Grid.Row>
                  
              </Grid>
                  )
              }
          </div>
        )
      }
    render() {
        const {suggestion, people}= this.state
        return (
            <React.Fragment>
                <Grid>
                    <Grid.Column width='16'>
                    <Segment color='blue' inverted>
                        <Grid>
                            <Grid.Row columns='2'>
                                <Grid.Column><Header as='h2'>GitHub Profile Search</Header></Grid.Column>
                                <Grid.Column><Input icon='search' placeholder='Search...' onChange={this.handleChange} value={people}/></Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                        <h2>{this.returnSuggestion()}</h2>
                    </Grid.Column>

                    <Grid.Row>
                        {suggestion.length === 0 &&
                            <Grid.Column width='16' className="header-text">
                                <Card className="small-card">
                                    <Card.Header><h1>Github Profile Search</h1></Card.Header>
                                </Card>
                            </Grid.Column>
                        }
                    </Grid.Row>
                    
                </Grid>
            </React.Fragment>
        )

    }
}
// export default HomePage;
export default connect()(HomePage)