import React, { useState, useEffect } from 'react';
import { Drawer, Button, Row, Typography, Col, Form, Select } from 'antd';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip,
} from 'recharts';
import { precise } from '../Utils.js';

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];

const { Text } = Typography;

const ChartContainer = ({ isShown, hide, currentDetais, getDetaiName }) => {
    const [dataChart, setDataChart] = useState([]);
    const [currentTieuchi, setCurrentTieuchi] = useState(0);

    const onClose = () => {
        hide();
    };

    useEffect(() => {
        if (currentDetais !== null && currentDetais.length > 0) {
            let dataChart = currentDetais.map(detai => ({ name: detai.madetai, score: currentTieuchi == 0 ? precise(detai.diemdetai) : getDiemTieuChi(detai, currentTieuchi) }));
            setDataChart([...dataChart]);
            console.log('dataChart', dataChart);
        }
    }, [currentDetais])

    const getDiemTieuChi = (detai, currentTieuchiId) => {
        let tieuchi = detai.tieuchis.find(i => i.id == currentTieuchiId);
        if (tieuchi) {
            return precise(tieuchi.pivot.diemtieuchi);
        }
        return null;
    }

    const handleTieuchiChange = (val) => {
        setCurrentTieuchi(val);
    }

    useEffect(() => {
        if (currentDetais !== null && currentDetais.length > 0) {
            let dataChart = currentDetais.map(detai => ({ name: detai.madetai, score: currentTieuchi == 0 ? precise(detai.diemdetai) : getDiemTieuChi(detai, currentTieuchi) }));
            setDataChart([...dataChart]);
            console.log(dataChart);
        }
    }, [currentTieuchi])

    return (
        <React.Fragment>
            <Drawer
                title={<TitleComponent handleTieuchiChange={handleTieuchiChange} />}
                closable={false}
                onClose={onClose}
                visible={isShown}
                placement="top"
                height={650}
            >
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <BarChart width={1200} height={500} data={dataChart} barSize={100} margin={{ top: 15 }}>
                        <XAxis dataKey="name" />
                        <YAxis type="number" domain={[0, 100]} />
                        <Tooltip content={<CustomTooltip getDetaiName={getDetaiName}/>} wrapperStyle={{ width: 300, backgroundColor: '#ccc' }}/>
                        <Bar
                            dataKey="score"
                            label={{ position: 'top' }}
                        >
                            {
                                dataChart.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={'#3399ff'} />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </Row>
            </Drawer>
        </React.Fragment>
    );
};

const TitleComponent = ({ handleTieuchiChange }) => {
    return (
        <React.Fragment>
            <Row>
                <Col span={5}>
                    <Text>Biểu đồ</Text>
                </Col>
                <Col offset={4} span={5}>
                    <Form.Item label="Tiêu chí" style={{ marginBottom: '5px' }}>
                        <Select
                            defaultValue={0}
                            onChange={handleTieuchiChange}
                        >
                            <Option value={0}>Đánh giá chung</Option>
                            <Option value={1}>Hiệu quả về Khoa học</Option>
                            <Option value={2}>Hiệu quả về Công nghệ</Option>
                            <Option value={3}>Hiệu quả về Kinh tế</Option>
                            <Option value={4}>Hiệu quả về Môi trường</Option>
                            <Option value={5}>Hiệu quả về Văn hóa, xã hội</Option>
                            <Option value={6}>Hiệu quả về Thông tin quản lý</Option>
                            <Option value={7}>Hiệu quả về Đào tạo</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </React.Fragment>
    )
}

const CustomTooltip = ({ payload, label, active, getDetaiName }) => {

    useEffect(() => {
        console.log('payload');
    }, [payload])
    if (active) {
        return (
            <div className="custom-tooltip">
                {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}
                <p>{getDetaiName(label)}</p>
            </div>
        );
    }

    return null;
}



export default ChartContainer;

