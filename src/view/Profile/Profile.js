import React from 'react'
import { Button, Grid ,Image, Segment,Header} from 'semantic-ui-react';
import './Profile.scss'
import { connect } from 'react-redux';
import RepoCard from './RepoCard';
import { Link } from 'react-router-dom';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            userData:''
        }
    }
    componentDidMount() {
        
        let username = this.props.location.state
        console.log(username)
        fetch(`https://api.github.com/search/users?q=${encodeURIComponent(username)}`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result.items)
                this.setState({
                    userData: result.items
                })
            }
            )
    }
    render(){
       let profileData = this.state.userData
        return(
            <div className="todo-list">
               <Grid>
                   <Grid.Column width='16'>
                   <Segment color='blue' inverted>
                       
                   <Link to="/"> <Header as='h2'>GitHub Profile</Header></Link> 
                            
                    </Segment>
                   </Grid.Column>
                   <Grid.Row>
                        <Grid.Column width='5'>
                            {profileData &&
                                <Segment>
                                    <Image src={profileData[0].avatar_url} />
                                    <br></br>
                                    <h3>{profileData[0].login}</h3>
                                    <Button primary>Follow</Button>
                                </Segment>
                            }

                        </Grid.Column>
                       <Grid.Column width='11'>
                           <RepoCard resposData={this.props.reposData }/>
                       </Grid.Column>
                   </Grid.Row>
               </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        reposData: state.ProfileReducer.profile
    }
}

export default connect(mapStateToProps)(Profile)