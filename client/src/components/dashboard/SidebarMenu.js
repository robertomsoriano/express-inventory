import React, {useState} from 'react'
import { withRouter} from "react-router-dom";
import {  Icon,  Menu, Segment, Sidebar, Button, Divider, Header } from 'semantic-ui-react'

const SidebarMenu = (props) => {
  const [visible, setVisible] = useState(false)
  function nextPath(path) {
    if(path !== props.history.location.pathname){
        props.history.push(path);
    }
    return setVisible(!visible)
  }
  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation='overlay'
        direction='left'
        icon='labeled'
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='thin'
      >
        <Menu.Item as='a' onClick={()=> nextPath('/')}>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as='a' onClick={()=>nextPath('/books')}>
          <Icon name='book' />
          Books
        </Menu.Item>
        <Menu.Item as='a' onClick={() =>nextPath('/dashboard')}>
          <Icon name='chart bar' />
          Dashboard
        </Menu.Item>
      </Sidebar>

      {/* <Sidebar
        as={Menu}
        animation='overlay'
        direction='right'
        inverted
        vertical
        visible={visible}
      >
        <Menu.Item as='a' header>
          File Permissions
        </Menu.Item>
        <Menu.Item as='a'>Share on Social</Menu.Item>
        <Menu.Item as='a'>Share by E-mail</Menu.Item>
        <Menu.Item as='a'>Edit Permissions</Menu.Item>
        <Menu.Item as='a'>Delete Permanently</Menu.Item>
      </Sidebar> */}

      <Sidebar.Pusher>
        <Segment basic>
        <Button onClick={()=> setVisible(!visible)}>Menu</Button>
        <Divider/>
        <Header><Icon name='book'/>Dashboard</Header>
        
          {props.children}
          
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default withRouter(SidebarMenu)


