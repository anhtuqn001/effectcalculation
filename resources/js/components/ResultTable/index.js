import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { message, Button, Table, Tag, Popconfirm, Row, Col, Typography } from 'antd';
import { getLinhVucName, getGrade, getFinalComment, precise, getTieuchiShortName, getDetaiComments } from '../Utils.js';
import ResultChart from './Chart.js';
import {
    useParams,
    useHistory
} from "react-router-dom";
import { LeftOutlined } from '@ant-design/icons';

const styles = {
    backButton: {
        marginBottom: '5px'
    }
}

const { Text } = Typography;

const columns = [
    {
        title: 'Lĩnh vực đề tài',
        dataIndex: 'linhvuc',
        width: '7%'
    },
    {
        title: 'Tên đề tài/dự án',
        dataIndex: 'tendetai',
        width: '10%'
    },
    {
        title: 'Kết quả thực hiện, triển khai và tác động',
        dataIndex: 'comments',
        width: '25%',
        render: comments => {
            return (
            comments.map(i => <div><Text strong>{`- ${i.title}: `}</Text>{i.comment}</div>)
            )
        }
    },
    {
        title: 'Hiệu quả về khoa học',
        dataIndex: 'diemkhoahoc',
        width: '7%',
        render: i => {
            return (
                <React.Fragment>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>{precise(i)}</div>
                    <div style={{ textAlign: 'center' }}>{getGrade(i)}</div>
                </React.Fragment>
            )
        }
    },
    {
        title: 'Hiệu quả về công nghệ',
        dataIndex: 'diemcongnghe',
        width: '7%',
        render: i => {
            return (
                <React.Fragment>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>{precise(i)}</div>
                    <div style={{ textAlign: 'center' }}>{getGrade(i)}</div>
                </React.Fragment>
            )
        }
    },
    {
        title: 'Hiệu quả về kinh tế',
        dataIndex: 'diemkinhte',
        width: '7%',
        render: i => {
            return (
                <React.Fragment>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>{precise(i)}</div>
                    <div style={{ textAlign: 'center' }}>{getGrade(i)}</div>
                </React.Fragment>
            )
        }
    },
    {
        title: 'Hiệu quả về môi trường',
        dataIndex: 'diemmoitruong',
        width: '7%',
        render: i => {
            return (
                <React.Fragment>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>{precise(i)}</div>
                    <div style={{ textAlign: 'center' }}>{getGrade(i)}</div>
                </React.Fragment>
            )
        }
    },
    {
        title: 'Hiệu quả về văn hóa, xã hội',
        dataIndex: 'diemvhxh',
        width: '7%',
        render: i => {
            return (
                <React.Fragment>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>{precise(i)}</div>
                    <div style={{ textAlign: 'center' }}>{getGrade(i)}</div>
                </React.Fragment>
            )
        }
    },
    {
        title: 'Hiệu quả về thông tin quản lý',
        dataIndex: 'diemthongtin',
        width: '7%',
        render: i => {
            return (
                <React.Fragment>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>{precise(i)}</div>
                    <div style={{ textAlign: 'center' }}>{getGrade(i)}</div>
                </React.Fragment>
            )
        }
    },
    {
        title: 'Hiệu quả về đào tạo',
        dataIndex: 'diemdaotao',
        width: '7%',
        render: i => {
            return (
                <React.Fragment>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>{precise(i)}</div>
                    <div style={{ textAlign: 'center' }}>{getGrade(i)}</div>
                </React.Fragment>
            )
        }
    },
    {
        title: 'Đánh giá chung',
        dataIndex: 'danhgiachung',
        width: '9%',
        render: i => {
            return (
                <React.Fragment>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>{precise(i)}</div>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>{getGrade(i)}</div>
                    <div style={{ textAlign: 'center' }}>{getFinalComment(i)}</div>
                </React.Fragment>
            )
        }
    }
]

const ResultTable = () => {
    const [dataSource, setDataSource] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [chartData, setChartData] = useState(null);
    const [isChartShown, setIsChartShown] = useState(false);
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        fetch("/api/getdetai/" + id, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        }).then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        }).then((result) => {
            let { detai } = result;
            let { tieuchis } = detai;
            console.log('getDetaiComments', getDetaiComments(detai));
            let dataSource = {
                linhvuc: getLinhVucName(detai.linhvuc),
                tendetai: detai.tendetai,
                comments: getDetaiComments(detai),
                diemkhoahoc: tieuchis.find(i => i.id == 1).pivot.diemtieuchi,
                diemcongnghe: tieuchis.find(i => i.id == 2).pivot.diemtieuchi,
                diemkinhte: tieuchis.find(i => i.id == 3).pivot.diemtieuchi,
                diemmoitruong: tieuchis.find(i => i.id == 4).pivot.diemtieuchi,
                diemvhxh: tieuchis.find(i => i.id == 5).pivot.diemtieuchi,
                diemthongtin: tieuchis.find(i => i.id == 6).pivot.diemtieuchi,
                diemdaotao: tieuchis.find(i => i.id == 7).pivot.diemtieuchi,
                danhgiachung: detai.diemdetai
            }
            let chartData = [...tieuchis.map(i => ({ name: getTieuchiShortName(i.id), score: precise(i.pivot.diemtieuchi) })), { name: 'Đánh giá chung', score: precise(detai.diemdetai) }]
            console.log('dataSource', dataSource);
            setDataSource([dataSource]);
            setChartData(chartData);
            setIsLoading(false);
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

    const handleGoBack = () => {
        history.goBack();
    }

    const toggleChart = () => {
        setIsChartShown(!isChartShown);
    }

    return (
        <React.Fragment>
            <Button type="primary" icon={<LeftOutlined />} onClick={handleGoBack} style={styles.backButton} />
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={isLoading}
                bordered
                pagination={false}
            />
            <Row style={{ marginTop: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" onClick={toggleChart}>{isChartShown ? 'Đóng đồ thị' : 'Xem đồ thị'}</Button>
            </Row>
            {isChartShown && <ResultChart chartData={chartData} />}
        </React.Fragment>
    )
}

export default ResultTable;