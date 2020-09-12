import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Typography, Button } from 'antd';
import { useHistory } from "react-router-dom";

const { Title, Text } = Typography;

const { Header } = Layout;

const styles = {
    header: {
        backgroundColor: '#096dd9',
        padding: '0px 30px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500'
    },
    img: {
        maxHeight: '90%',
        width: 'auto',
        marginRight: '7px'
    },
    title: {
        display: 'inline-block',
        marginBottom: 0,
        color: 'white'
    }
}

const CustomHeader = () => {
    // const history = useHistory();
    return (
        <Header style={styles.header}>
            <img src="/images/logo2.png" alt="logo" style={styles.img} />
            <Title level={3} style={styles.title}>PHẦN MỀM ĐÁNH GIÁ HIỆU QUẢ KINH TẾ - XÃ HỘI</Title>
        </Header>
    )
}



export default CustomHeader;