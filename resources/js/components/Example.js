import React from 'react';
import ReactDOM from 'react-dom';
import KhaoSat from './KhaoSat';
import DetaiList from './DetaiList';
import { Layout, Menu, Breadcrumb } from 'antd';
import CustomHeader from './Header.js'
import ResultTable from './ResultTable';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const { Header, Content, Footer } = Layout;
function App() {
    return (
        <Layout>
            <CustomHeader />
            <Router>
                <Content style={{ padding: '5px 50px', backgroundColor: 'white' }}>
                    <Switch >
                        <Route exact path="/">
                            <DetaiList />
                        </Route>
                        <Route path="/khaosat/:id">
                            <KhaoSat />
                        </Route>
                        <Route path="/ketqua/:id">
                            <ResultTable />
                        </Route>
                    </Switch>
                </Content>
            </Router>
            <Footer style={{ textAlign: 'center' }}>Bản quyền Lihanet - 2020</Footer>
        </Layout>
    );
}

export default App;

if (document.getElementById('example')) {
    ReactDOM.render(<App />, document.getElementById('example'));
}
