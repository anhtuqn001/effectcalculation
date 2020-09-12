import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { List, Typography, Divider, Radio, Row, Input, Col, Button, message, Select} from 'antd';
const { Text } = Typography;
import { calculateThanhphanScore, calculateTieuchiScore, calculateDetaiScore, flattenThanhphans, checkIfDone } from '../Utils.js'
import {
    useParams,
    useHistory
  } from "react-router-dom";
import { LeftOutlined } from '@ant-design/icons';
const { Option } = Select;


const ListCauHoi = ({ tieuchis, tieuchi, tieuchisLength, current, next, prev, handleOnNext, donvi, handleDonviChange, id, tendetai }) => {
    const [thanhphans, setThanhphans] = useState([]);
    const [isDone, setIsDone] = useState(false);
    let history = useHistory();
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        let { thanhphans } = tieuchi;
        if (tieuchi) {
            if (donvi == 1) {
                thanhphans = thanhphans && thanhphans.filter(i => i.cauhoi1 != null);
            } else {
                thanhphans = thanhphans && thanhphans.filter(i => i.cauhoi2 != null);
            }
        }
        setThanhphans(thanhphans);
    }, [tieuchi, donvi]);

    useEffect(() => {
        if(checkIfDone(flattenThanhphans(tieuchis))) {
            setIsDone(true);
        } else {
            setIsDone(false);
        }
    }, [tieuchis])

    const handleOnAnswer = (thanhphanId, value) => {
        let index = thanhphans.findIndex(i => i.id == thanhphanId);
        if (index >= 0) {
            if (donvi == 1) {
                thanhphans[index].pivot.result1 = value;
            } else {
                thanhphans[index].pivot.result2 = value;
            }
        }
        setThanhphans([...thanhphans]);
        if(checkIfDone(flattenThanhphans(tieuchis))) {
            setIsDone(true);
        } else {
            setIsDone(false);
        }
    }

    const test = () => {
        console.log(thanhphans);
    }

    const handleOnNextButton = () => {
        let { id } = tieuchi;
        next();
    }

    const handleSubmit = () => {
        setIsSubmitting(true);
        let formattedTieuchis = tieuchis.map(tieuchi => formatTieuchi(tieuchi));
        let diemdetai = calculateDetaiScore(1, formattedTieuchis);
        let data = {
            detaiId: id,
            diemdetai,
            tieuchis: formattedTieuchis
        };
        console.log(data);
        fetch("/api/updatescores", {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        }).then((result) => {
            message.success("Lưu thành công");
            setIsSubmitting(false);
        }, (error) => {
            if (error.status == 401) {
                // localStorage.removeItem("token");
                // history.push('/dangnhap');
                // doLogout();
            } else {
                message.error("Lỗi hệ thống");
            }
        })
    }

    const formatTieuchi = (tieuchi) => {
        let { id, thanhphans } = tieuchi
        let formattedThanhphans = thanhphans.map(thanhphan => formatThanhphan(thanhphan));
        let diemtieuchi = calculateTieuchiScore(1, formattedThanhphans);
        return {
            id,
            diemtieuchi,
            thanhphans: formattedThanhphans
        }
    }

    const formatThanhphan = (thanhphan) => {
        let { id, pivot: { result1, result2 } } = thanhphan
        return {
            id,
            diemthanhphan1: calculateThanhphanScore(thanhphan),
            result1,
            result2
        }
    }

    const handleGoBack = () => {
        history.goBack();
    }


    return (
        <React.Fragment>
            {/* <Button type="primary" onClick={test}>Test Button</Button> */}
            <Row style={{ margin: '10px 0px' }}>
                <Col span={1}><Button type="primary" icon={<LeftOutlined />} onClick={handleGoBack}/></Col>
                <Col span={4} offset={1}>
                    <Select value={donvi} onChange={handleDonviChange}
                        style={{ width: 150 }}
                    >
                        <Option value={1}>Đơn vị chủ trì</Option>
                        <Option value={2}>Đơn vị triển khai</Option>
                    </Select>
                </Col>
                <Col offset={4} span={4}>
                    <Button type="primary" style={isDone ? {background: '#389e0d', borderColor: "#389e0d"} : {background: '#d9f7be', borderColor: "#d9f7be"}} disabled={!isDone} onClick={handleSubmit} loading={isSubmitting}>Lưu kết quả</Button>
                </Col>
                <Col offset={6} span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="steps-action">
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()} disabled={!(current > 0)}>
                                Quay Lại
                            </Button>
                            <Button type="primary" onClick={handleOnNextButton} disabled={!(current < tieuchisLength - 1)}>
                                Tiếp Tục
                            </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Text strong>ĐỀ TÀI:</Text><Text style={{marginLeft: '5px'}}>{tendetai}</Text>
            </Row>
            <List
                itemLayout="vertical"
                size="small"
                header={<div><Text strong>Câu hỏi khảo sát</Text></div>}
                // footer={<div>Footer</div>}
                bordered
                dataSource={thanhphans}
                renderItem={item => <List.Item><CauhoiItem donvi={donvi} thanhphan={item} handleOnAnswer={handleOnAnswer} /></List.Item>}
            />
        </React.Fragment>
    )
}

const CauhoiItem = ({ donvi, thanhphan, handleOnAnswer }) => {
    const [value, setValue] = useState(null);
    const [cauhoi, setCauhoi] = useState(null)

    useEffect(() => {
        let { pivot } = thanhphan
        let { result1, result2 } = pivot;
        if (donvi == 1) {
            setValue(result1);
        } else if (donvi == 2) {
            setValue(result2);
        }
        let cauhoi = donvi == 1 ? thanhphan.cauhoi1 : thanhphan.cauhoi2;
        setCauhoi(cauhoi);
    }, [thanhphan, donvi])

    const onRadioChange = (e) => {
        let { id } = thanhphan;
        setValue(e.target.value);
        handleOnAnswer(id, e.target.value);
    }

    return (
        <React.Fragment>
            <Row>
                {thanhphan.mathanhphan + '. ' + cauhoi}
            </Row>
            <Row style={{ marginTop: 10 }}>
                {thanhphan.loaithanhphan == 1 &&
                    <Radio.Group value={value} onChange={onRadioChange}>
                        <Radio value={0}>Không</Radio>
                        <Radio value={1}>Có</Radio>
                    </Radio.Group>
                }
                {thanhphan.loaithanhphan == 3 &&
                    <Radio.Group value={value} onChange={onRadioChange}>
                        <Radio value={0}>Không có</Radio>
                        <Radio value={1}>Rất ít</Radio>
                        <Radio value={2}>Ít</Radio>
                        <Radio value={3}>Vừa phải</Radio>
                        <Radio value={4}>Nhiều</Radio>
                        <Radio value={5}>Rất nhiều</Radio>
                    </Radio.Group>
                }
                {thanhphan.loaithanhphan == 2 &&
                    <Col span={4}>
                        <Input value={value} onChange={onRadioChange} />
                    </Col>
                }
            </Row>
        </React.Fragment>
    );
}

export default ListCauHoi;