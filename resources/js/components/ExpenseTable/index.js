import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { List, Typography, Divider, message, Steps, Button, Row, Col, Table } from 'antd';
import { handleExpenseTableData, handleSummedExpenseTableData, getSummedValueAccordingToLinhvucExpenseTable } from '../Utils';
import {
    Link
} from "react-router-dom";

const { Title } = Typography;
const columns = [
    {
        title: 'Mức xếp loại',
        dataIndex: 'grade',
        align: 'center'
    },
    {
        title: 'Tự nhiên',
        dataIndex: 'linhvuc2',
        children: [
            {
                title: 'Số tiền (triệu đồng)',
                dataIndex: 'sotien2',
                render: i => {
                    if (i == null) {
                        return 0;
                    };
                    return i;
                },
                align: 'center'
            },
            {
                title: 'Tỷ lệ %',
                dataIndex: 'tyle2',
                render: i => {
                    if (i == null) {
                        return '0%';
                    };
                    if (i == '100%') {
                        return i;
                    }
                    return parseFloat(i * 100).toFixed(2) + "%";
                },
                align: 'center'
            }
        ]
    },
    {
        title: 'Kỹ thuật Công nghệ',
        dataIndex: 'linhvuc5',
        children: [
            {
                title: 'Số tiền (triệu đồng)',
                dataIndex: 'sotien5',
                render: i => {
                    if (i == null) {
                        return 0;
                    };
                    return i;
                },
                align: 'center'
            },
            {
                title: 'Tỷ lệ %',
                dataIndex: 'tyle5',
                render: i => {
                    if (i == null) {
                        return '0%';
                    };
                    if (i == '100%') {
                        return i;
                    }
                    return parseFloat(i * 100).toFixed(2) + "%";
                },
                align: 'center'
            }
        ]
    },
    {
        title: 'Nông nghiệp',
        dataIndex: '1',
        children: [
            {
                title: 'Số tiền (triệu đồng)',
                dataIndex: 'sotien1',
                render: i => {
                    if (i == null) {
                        return 0;
                    };
                    return i;
                },
                align: 'center'
            },
            {
                title: 'Tỷ lệ %',
                dataIndex: 'tyle1',
                render: i => {
                    if (i == null) {
                        return '0%';
                    };
                    if (i == '100%') {
                        return i;
                    }
                    return parseFloat(i * 100).toFixed(2) + "%";
                },
                align: 'center'
            }
        ]
    },
    {
        title: 'Y Dược',
        dataIndex: 'linhvuc4',
        children: [
            {
                title: 'Số tiền (triệu đồng)',
                dataIndex: 'sotien4',
                render: i => {
                    if (i == null) {
                        return 0;
                    };
                    return i;
                },
                align: 'center'
            },
            {
                title: 'Tỷ lệ %',
                dataIndex: 'tyle4',
                render: i => {
                    if (i == null) {
                        return '0%';
                    };
                    if (i == '100%') {
                        return i;
                    }
                    return parseFloat(i * 100).toFixed(2) + "%";
                },
                align: 'center'
            }
        ]
    },
    {
        title: 'Xã hội Nhân văn',
        dataIndex: 'linhvuc3',
        children: [
            {
                title: 'Số tiền (triệu đồng)',
                dataIndex: 'sotien3',
                render: i => {
                    if (i == null) {
                        return 0;
                    };
                    return i;
                },
                align: 'center'
            },
            {
                title: 'Tỷ lệ %',
                dataIndex: 'tyle3',
                render: i => {
                    if (i == null) {
                        return '0%';
                    };
                    if (i == '100%') {
                        return i;
                    }
                    return parseFloat(i * 100).toFixed(2) + "%";
                },
                align: 'center'
            }
        ]
    }
]

const ExpenseTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dataSource, setDataSource] = useState(null);

    useEffect(() => {
        fetch("/api/getdetaiexpenses", {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        }).then((result) => {
            let { groupedDetais, linhvucGroupedDetais } = result;
            let summedValuesAccordingToLinhvuc = getSummedValueAccordingToLinhvucExpenseTable(linhvucGroupedDetais);
            let dataSource = [...handleExpenseTableData(groupedDetais, summedValuesAccordingToLinhvuc), handleSummedExpenseTableData(linhvucGroupedDetais)];
            setDataSource(dataSource);
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

    return (
        <React.Fragment>
            <Row style={{ marginTop: '25px', marginBottom: '15px' }}>
                <Col span={3}>
                    <Link to="/"><Button>Danh sách đề tài</Button></Link>
                </Col>
                <Col span={19} offset={2}>
                <Title level={3}>KẾT QUẢ KINH PHÍ ĐÃ CẤP PHÂN THEO XẾP LOẠI CỦA TỪNG LĨNH VỰC ĐỀ TÀI</Title>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={isLoading}
                bordered
                pagination={false}
            />
        </React.Fragment>
    )
}

export default ExpenseTable;