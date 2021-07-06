import React from 'react'
import { Button, Card, Grid ,Image, Segment} from 'semantic-ui-react';
import './Profile.scss'
import { connect } from 'react-redux';

class RepoCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    
    render(){
        console.log(this.props.resposData)
        let data=this.props.resposData
        return(
            <div className="todo-list">
               <Grid>
                   <Grid.Row>
                       <Grid.Column width='11'>
                           <h4>Popular repositories</h4>
                           <hr></hr>
                           <br></br>
                            <Card.Group itemsPerRow='2'>
                                {
                                    data.map((items) =>
                                        <Card style={{with:"50%"}}>
                                            <Card.Content>
                                                <Card.Header style={{color:"#0088cc"}}>{items.name}</Card.Header>
                                                <Card.Meta>{items.full_name}</Card.Meta>
                                                <Card.Description>
                                                    {items.language}
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    )
                                }

                            </Card.Group>
                       </Grid.Column>
                   </Grid.Row>
               </Grid>
            </div>
        )
    }
}


export default RepoCard;