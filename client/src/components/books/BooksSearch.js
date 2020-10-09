import React, {useEffect} from 'react'
import { withRouter} from "react-router-dom";
import { Button, Divider, Grid, Segment, Header } from 'semantic-ui-react'
import { connect} from "react-redux"
import { getBooks } from "../../actions/bookActions";
const BooksSearch = (props) => {
    useEffect(() => {
        props.getBooks();
        // eslint-disable-next-line
      }, []);
      
    return (
        <div>
            <DividerExampleVerticalForm {...props} />
        </div>
    )
}

const mapStateToProps = state => ({
    book: state.book,
    loading: state.book.loading,
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(
    mapStateToProps,
    { getBooks }
  )(withRouter(BooksSearch));
  




const DividerExampleVerticalForm = (props) => {
    function nextPath(path) {
        props.history.push(path);
      }
    return (<>
     <Header as='h2'>Welcome Back!</Header>
  <Segment placeholder>
 
    <Grid columns={2} relaxed='very' stackable>

    <Grid.Column verticalAlign='middle'>
        <Button content='Search Books' icon='search' size='big' onClick={() => nextPath('/books') }/>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button content='Dashboard' icon='chart bar' size='big' onClick={() => nextPath('/dashboard') }/>
      </Grid.Column>

    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
  </>)
}
