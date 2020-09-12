import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { List, Typography, Divider, message, Steps, Button, Row, Col } from 'antd';
import ListCauHoi from './listcauhoi.js';

import { currentDonvi1, currentDonvi2 } from '../Utils.js'
import './index.css';

const { Step } = Steps;

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const KhaoSat = () => {
    const [current, setCurrent] = useState(0);
    const [detai, setDetai] = useState({});
    const [tieuchis, setTieuchis] = useState([]);
    const [donvi, setDonvi] = useState(1);
    const [current1, setCurrent1] = useState(0);
    const [current2, setCurrent2] = useState(0);
    const [filteredTieuchis, setFilteredTieuchis] = useState([])
    useEffect(() => {
        fetch("/api/getdetai/1", {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        }).then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        }).then((result) => {
            let { detai } = result;
            let { tieuchis } = detai;
            setDetai(detai);
            setTieuchis(tieuchis)
            console.log(tieuchis);
        }, (error) => {
            if (error.status == 401) {
                // localStorage.removeItem("token");
                // history.push('/dangnhap');
                // doLogout();
            } else {
                message.error("Lỗi hệ thống");
            }
        })
    }, [])

    const next = () => {
        if(donvi == 1) {
            let index = currentDonvi1.findIndex(i => i == current1);
            let newCurrent = currentDonvi1[index + 1];
            setCurrent1(newCurrent);
        } else {
            let index = currentDonvi2.findIndex(i => i == current2);
            let newCurrent = currentDonvi2[index + 1];
            setCurrent2(newCurrent);
        }
    }

    const prev = () => {
        // let newCurrent = current - 1;
        // setCurrent(newCurrent);
        if(donvi == 1) {
            let index = currentDonvi1.findIndex(i => i == current1);
            let newCurrent = currentDonvi1[index - 1];
            setCurrent1(newCurrent);
        } else {
            let index = currentDonvi2.findIndex(i => i == current2);
            let newCurrent = currentDonvi2[index - 1];
            setCurrent2(newCurrent);
        }
    }

    const handleDonviChange = (val) => {
        setDonvi(val);
        setCurrent1(0);
        setCurrent2(0);
    }

    return (
        <React.Fragment>
            <Steps current={donvi == 1 ? current1 : current2} size="small">
                {!!tieuchis.length && tieuchis.map(item => (
                    <Step key={item.id} title={item.title} description={item.tentieuchi} />
                ))}
            </Steps>
            <ListCauHoi donvi={donvi} tieuchis={tieuchis} tieuchi={!!tieuchis.length ? (donvi == 1 ? tieuchis[current1] : tieuchis[current2]) : {}} tieuchisLength={tieuchis.length} current={donvi == 1 ? current1 : current2} next={next} prev={prev} handleDonviChange={handleDonviChange}/>
        </React.Fragment>
    )
}

export default KhaoSat;