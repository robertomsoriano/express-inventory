import React from 'react'
// import { withRouter} from "react-router-dom";
import { Button, Divider, Grid, Segment, Header } from 'semantic-ui-react'
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
// import { connect} from "react-redux"
// import { getBooks } from "../../actions/bookActions";

const LandingPage = (props) => {
    // function nextPath(path) {
    //     props.history.push(path);
    //   }
    return (
        <>
        <Header as='h2'>Welcome Back!</Header>
        <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
          <Grid.Column verticalAlign='middle'>
              <Button content={<LoginModal/>} icon='sign-in' size='big'/>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Button content={<RegisterModal />} icon='signup' size='big' />
            </Grid.Column>
          </Grid>

          <Divider vertical>Or</Divider>
        </Segment>
        </>
    )
}

export default LandingPage
