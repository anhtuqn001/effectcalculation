import React from 'react';
import ReactDOM from 'react-dom';
import KhaoSat from './KhaoSat';
import DetaiList from './DetaiList';
import { Layout, Menu, Breadcrumb } from 'antd';
import CustomHeader from './Header.js'
import ResultTable from './ResultTable';

const { Header, Content, Footer } = Layout;
function App() {
    return (
        <Layout>
            <CustomHeader>
            
            </CustomHeader>
            <Content style={{ padding: '5px 50px', backgroundColor:'white' }}>
                {/* <DetaiList /> */}
                {/* <KhaoSat /> */}
                <ResultTable />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Bản quyền Lihanet - 2020</Footer>
        </Layout>
    );
}

export default App;

if (document.getElementById('example')) {
    ReactDOM.render(<App />, document.getElementById('example'));
}
