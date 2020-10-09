import React from "react";
import { Tab, Header, Icon, Divider } from 'semantic-ui-react'
// import Trans from "./Trans";
import SidebarMenu from './SidebarMenu'
import TransSearch from "../search/TransSearch";

const Dashboard = () => {
  return (
    <>
    <div style={{backgroundColor:"background: rgba(211, 211, 211, 0.144)"}}>
      <Header><Icon name='book'/>Dashboard</Header>
      <Divider/>
      {/* <TransSearch /> */}
      {/* <SidebarMenu > */}
      <Tab panes={panes} />
      {/* </SidebarMenu > */}
      </div>
    </>
  );
};

export default Dashboard;


const panes = [
  { menuItem: 'Transactions', render: () => <Tab.Pane ><TransSearch/></Tab.Pane> },
  { menuItem: 'Report', render: () => <Tab.Pane>Reports tab: under construction</Tab.Pane> },
  { menuItem: 'Customers', render: () => <Tab.Pane>Customers tab: : under construction</Tab.Pane> },
]
