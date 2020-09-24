import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { List, Typography, Divider, Radio, Row, Input, Col, Button, message, Select, Tooltip } from 'antd';

import { calculateThanhphanScore, calculateTieuchiScore, calculateDetaiScore, flattenThanhphans, checkIfDone, getThanhphanOptions } from '../Utils.js'
import {
    useParams,
    useHistory,
    Link
} from "react-router-dom";
import { LeftOutlined, QuestionCircleFilled } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

const styles = {
    radioStyles: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    }
}

const ListCauHoi = ({ tieuchis, tieuchi, tieuchisLength, current, next, prev, handleOnNext, donvi, handleDonviChange, id, tendetai, updateDetai, haveResult, isLoading, linhvuc }) => {
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
        console.log('thanhphans', thanhphans);
    }, [tieuchi, donvi]);

    useEffect(() => {
        if (tieuchis != null) {
            if (checkIfDone(flattenThanhphans(tieuchis))) {
                setIsDone(true);
            } else {
                setIsDone(false);
            }
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
        if (checkIfDone(flattenThanhphans(tieuchis))) {
            setIsDone(true);
        } else {
            setIsDone(false);
        }
    }

    const handleOnSubAnswer = (thanhphanId, value, ind) => {
        let index = thanhphans.findIndex(i => i.id == thanhphanId);
        if (index >= 0) {
            if (donvi == 1) {
                let property;
                switch (ind) {
                    case 1:
                        property = 'additional1';
                        break;
                    case 2:
                        property = 'additional2';
                        break;
                    case 3:
                        property = 'additional3';
                        break;
                    case 4:
                        property = 'additional4';
                        break;
                }
                thanhphans[index].pivot[property] = value;
            } else {
                let property;
                switch (ind) {
                    case 1:
                        property = 'additional5';
                        break;
                    case 2:
                        property = 'additional6';
                        break;
                    case 3:
                        property = 'additional7';
                        break;
                    case 4:
                        property = 'additional8';
                        break;
                }
                thanhphans[index].pivot[property] = value;
            }
        }
        setThanhphans([...thanhphans]);
        console.log('thanhphans', thanhphans);
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
        let formattedTieuchis = tieuchis.map(tieuchi => formatTieuchi(tieuchi, linhvuc));
        let diemdetai = calculateDetaiScore(linhvuc, formattedTieuchis);
        let data = {
            detaiId: id,
            diemdetai,
            tieuchis: formattedTieuchis
        };
        console.log('data', data);
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
            let { detai } = result;
            setIsSubmitting(false);
            updateDetai(detai);
            message.success("Lưu thành công");
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

    const formatTieuchi = (tieuchi, linhvuc) => {
        let { id, thanhphans } = tieuchi
        let formattedThanhphans = thanhphans.map(thanhphan => formatThanhphan(thanhphan));
        let diemtieuchi = calculateTieuchiScore(linhvuc, formattedThanhphans);
        return {
            id,
            diemtieuchi,
            thanhphans: formattedThanhphans
        }
    }

    const formatThanhphan = (thanhphan) => {
        let { id, pivot: { result1, result2, additional1, additional2, additional3, additional4, additional5, additional6, additional7, additional8 } } = thanhphan
        return {
            id,
            diemthanhphan1: calculateThanhphanScore(thanhphan),
            result1,
            result2,
            additional1,
            additional2,
            additional3,
            additional4,
            additional5,
            additional6,
            additional7,
            additional8
        }
    }

    const handleGoBack = () => {
        history.goBack();
    }

    const resetAdditionalValues = (thanhphanId) => {{
        let index = thanhphans.findIndex(i => i.id == thanhphanId);
        if(index > 0) {
            if(donvi == 1) {
                thanhphans[index].pivot.additional1 = null;
                thanhphans[index].pivot.additional2 = null;
                thanhphans[index].pivot.additional3 = null;
                thanhphans[index].pivot.additional4 = null;
            } else {
                thanhphans[index].pivot.additional5 = null;
                thanhphans[index].pivot.additional6 = null;
                thanhphans[index].pivot.additional7 = null;
                thanhphans[index].pivot.additional8 = null;
            }
        }
        setThanhphans([...thanhphans]);
        console.log('thanhphans reset', thanhphans)
    }}


    return (
        <React.Fragment>
            {/* <Button type="primary" onClick={test}>Test Button</Button> */}
            <Row style={{ margin: '10px 0px' }}>
                <Col span={1}><Button type="primary" icon={<LeftOutlined />} onClick={handleGoBack} /></Col>
                <Col span={4} offset={1}>
                    <Select value={donvi} onChange={handleDonviChange}
                        style={{ width: 150 }}
                    >
                        <Option value={1}>Đơn vị chủ trì</Option>
                        <Option value={2}>Đơn vị triển khai</Option>
                    </Select>
                </Col>
                <Col offset={4} span={6}>
                    <Button type="primary"
                        // style={isDone ? { background: '#389e0d', borderColor: "#389e0d" } : { background: '#d9f7be', borderColor: "#d9f7be" }}
                        disabled={!isDone}
                        onClick={handleSubmit}
                        loading={isSubmitting}>Lưu kết quả</Button>
                    {haveResult && <Link to={`/ketqua/${id}`}><Button type="primary" style={{ marginLeft: '5px', background: '#389e0d', borderColor: "#389e0d" }}>Xem Kết Quả</Button></Link>}
                </Col>
                <Col offset={4} span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            <Row style={{ margin: '5px' }}>
                <Text strong>ĐỀ TÀI:</Text><Text style={{ marginLeft: '5px' }}>{tendetai}</Text>
            </Row>
            <List
                itemLayout="vertical"
                size="small"
                header={<div><Text strong>Câu hỏi khảo sát</Text></div>}
                // footer={<div>Footer</div>}
                loading={isLoading}
                bordered
                dataSource={thanhphans}
                renderItem={item => <List.Item><CauhoiItem donvi={donvi} thanhphan={item} handleOnAnswer={handleOnAnswer} handleOnSubAnswer={handleOnSubAnswer}resetAdditionalValues={resetAdditionalValues}/></List.Item>}
            />
        </React.Fragment>
    )
}

const CauhoiItem = ({ donvi, thanhphan, handleOnAnswer, handleOnSubAnswer, resetAdditionalValues }) => {
    const [value, setValue] = useState(null);
    const [cauhoi, setCauhoi] = useState(null);
    const [hasHint, setHasHint] = useState(false);
    const [isSubInfoShown, setIsSubInfoShown] = useState(false);
    const [subValue1, setSubValue1] = useState(null);
    const [subValue2, setSubValue2] = useState(null);
    const [subValue3, setSubValue3] = useState(null);
    const [subValue4, setSubValue4] = useState(null);
    useEffect(() => {
        console.log('item render')
    }, [])

    useEffect(() => {
        let { pivot, chuthich, loaithanhphan } = thanhphan;
        let { result1, result2, additional1, additional2, additional3, additional4, additional5, additional6, additional7, additional8 } = pivot;
        if (donvi == 1) {
            setValue(result1);
            setSubValue1(additional1);
            setSubValue2(additional2);
            setSubValue3(additional3);
            setSubValue4(additional4);
            switch (loaithanhphan) {
                case 1:
                    if (result1 == 1) {
                        setIsSubInfoShown(true);
                    } else {
                        setIsSubInfoShown(false);
                    }
                    break;
                case 2:
                    if (result1 > 0) {
                        setIsSubInfoShown(true);
                    } else {
                        setIsSubInfoShown(false);
                    }

            }
        } else if (donvi == 2) {
            setValue(result2);
            setSubValue1(additional5);
            setSubValue2(additional6);
            setSubValue3(additional7);
            setSubValue4(additional8);
            switch (loaithanhphan) {
                case 1:
                    if (result2 == 1) {
                        setIsSubInfoShown(true);
                    } else {
                        setIsSubInfoShown(false);
                    }
                    break;
                case 2:
                    if (result2 > 0) {
                        setIsSubInfoShown(true);
                    } else {
                        setIsSubInfoShown(false);
                    }
            }
        }
        let cauhoi = donvi == 1 ? thanhphan.cauhoi1 : thanhphan.cauhoi2;
        setCauhoi(cauhoi);
        if (!!chuthich) {
            setHasHint(true);
        } else {
            setHasHint(false);
        }

        // console.log(mathanhphan, hasHint);
    }, [thanhphan, donvi])

    const onRadioChange = (e) => {
        let { id, loaithanhphan } = thanhphan;
        setValue(e.target.value);
        handleOnAnswer(id, e.target.value);
        switch (loaithanhphan) {
            case 1:
                if (e.target.value == 1) {
                    setIsSubInfoShown(true);
                } else {
                    setIsSubInfoShown(false);
                    resetSubValues();
                    resetAdditionalValues(id);
                }
                break;
            case 2:
                if (e.target.value > 0) {
                    setIsSubInfoShown(true);
                } else {
                    setIsSubInfoShown(false);
                    resetSubValues();
                    resetAdditionalValues(id);
                }

        }
    }

    const resetSubValues = () => {
        setSubValue1(null);
        setSubValue2(null);
        setSubValue3(null);
        setSubValue4(null);
    }

    const onSubInputChange = (e, index) => {
        let { id } = thanhphan;
        switch (index) {
            case 1:
                setSubValue1(e.target.value);
                break;
            case 2:
                setSubValue2(e.target.value);
                break;
            case 3:
                setSubValue3(e.target.value);
                break;
            case 4:
                setSubValue4(e.target.value);
                break;
        }
        handleOnSubAnswer(id, e.target.value, index);
    }

    return (
        <React.Fragment>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
                {hasHint ?
                    <React.Fragment>
                        <div style={{ marginRight: '10px' }}>
                            {cauhoi}
                        </div>
                        <Tooltip title={thanhphan.chuthich} placement="right">
                            <QuestionCircleFilled />
                        </Tooltip>
                    </React.Fragment> : cauhoi
                }
            </Row>
            <Row style={{ marginTop: 10 }}>

                {thanhphan.loaithanhphan == 1 &&
                    <Col span={3}>
                        <Radio.Group value={value} onChange={onRadioChange}>
                            <Radio value={0}>Không</Radio>
                            <Radio value={1}>Có</Radio>
                        </Radio.Group>
                    </Col>
                }
                {thanhphan.loaithanhphan == 3 &&
                    <Col span={15}>
                        <Radio.Group value={value} onChange={onRadioChange}>
                            {/* <Radio value={0}>Không có</Radio>
                            <Radio value={1}>Rất ít</Radio>
                            <Radio value={2}>Ít</Radio>
                            <Radio value={3}>Vừa phải</Radio>
                            <Radio value={4}>Nhiều</Radio>
                            <Radio value={5}>Rất nhiều</Radio> */}
                            {getThanhphanOptions(thanhphan.mathanhphan).map((item, index) => <Radio value={index}>{item}</Radio>)}
                        </Radio.Group>
                    </Col>
                }
                {thanhphan.loaithanhphan == 2 &&
                    <Col span={4}>
                        <Input value={value} onChange={onRadioChange} />
                    </Col>
                }

                <Col span={15} style={{ paddingLeft: '15px' }}>
                    {isSubInfoShown && thanhphan.subinfos.length > 0 && (thanhphan.loaithanhphan == 1 ?
                        <Row>
                            <Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>Trong đó:</Col>
                            <Col span={9}>
                                <Radio.Group value={subValue1} onChange={(e) => { onSubInputChange(e, 1) }}>
                                    {thanhphan.subinfos.map((item, index) => <Radio style={styles.radioStyles} value={index}>{item.title}</Radio>)}
                                </Radio.Group>
                            </Col>
                            <Col span={12} offset={1} style={{display:'flex', alignItems:'center'}}>
                                <Text type="warning">(Vui lòng chọn giá trị, không để trống)</Text>
                            </Col>
                        </Row> :
                        <React.Fragment>
                            <Row>
                                <Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>Trong đó:</Col>
                                <Col span={9}>
                                    {thanhphan.subinfos.map((item, index) => <div key={index}>{item.title} <Input value={index == 0 ? subValue1 : (index == 1 ? subValue2 : (index == 2 ? subValue3 : subValue4))} onChange={(e) => { onSubInputChange(e, index + 1) }} /></div>)}
                                </Col>
                                <Col span={12} offset={1} style={{display:'flex', alignItems:'center'}}>
                                <Text type="warning">(Nếu giá trị bằng 0 thì điền 0, vui lòng không để trống)</Text>
                            </Col>
                            </Row>
                        </React.Fragment>)}
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default ListCauHoi;