import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { message, Button, Table, Tag, Popconfirm, Row, Col, Select, Form } from 'antd';
import CreateModal from './CreateModal.js';
import EditModal from './EditModal.js';
import {
    Link
} from "react-router-dom";
import ChartContainer from './ChartContainer.js'

const { Option } = Select;
const styles = {
    button: {
        margin: '2px'
    },
    longButton: {
        margin: '2px',
        paddingLeft: '5px',
        paddingRight: '5px'
    }
}


const DeTaiList = () => {
    const [detais, setDetais] = useState();
    const [idState, setIdState] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editDetai, setEditDetai] = useState(null);
    const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
    const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectingLinhvuc, setSelectingLinhvuc] = useState(0);
    const [isChartShown, setIsChartShown] = useState(false);
    const [currentDetais, setCurrentDetais] = useState([]);
    useEffect(() => {
        fetch("/api/detai", {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        }).then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        }).then((result) => {
            let { detais } = result;
            detais = detais.map(i => ({ ...i, key: i.id }));
            setDetais(detais);
            setIsLoading(false);
            console.log(detais);
        }, (error) => {
            if (error.status == 401) {
                // localStorage.removeItem("token");
                // history.push('/dangnhap');
                // doLogout();
            } else {
                message.error("Lỗi hệ thống");
            }
        })
    }, []);

    useEffect(() => {
        if (editDetai != null) {
            setIsEditModalOpen(true);
        }
    }, [editDetai])

    useEffect(() => {
        if (editDetai != null) {
            setIsEditModalOpen(true);
        }
    }, [isEditButtonClicked])

    const hideEditModal = () => {
        setIsEditModalOpen(false);
    }

    const handleClick = (id) => {
        setIdState(id);
        console.log(idState);
    }

    const showCreateModal = () => {
        setIsCreateModalOpen(true);
    }

    const hideCreateModal = () => {
        setIsCreateModalOpen(false);
    }

    const showEditModal = (id) => {
        let detai = detais.find(i => i.id == id);
        if (detai != null) {
            setEditDetai(detai);
            setIsEditButtonClicked(!isEditButtonClicked);
        }
    }

    const appendNewDetai = (detai) => {
        setDetais([...detais, detai]);
    }

    const changeEditedDetai = (editedDetai) => {
        let { id } = editedDetai;
        let detaiIndex = detais.findIndex(i => i.id == id);
        detais[detaiIndex] = editedDetai;
        setDetais([...detais]);
    }

    const removeDetai = (id) => {
        let newDetais = detais.filter(i => i.id != id);
        setDetais([...newDetais]);
    }

    const onDeleteConfirm = (id) => {
        setIsDeleteButtonLoading(true);
        let data = {
            _method: "DELETE"
        }
        fetch("/api/detai/" + id, {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (!res.ok) return Promise.reject(res)
            return res.json();
        }).then((result) => {
            if (result.success) {
                removeDetai(id);
            }
            message.success('Xóa đề tài thành công!');
            setIsDeleteButtonLoading(false);
        }, (error) => {
            if (error.status == 401) {
                // localStorage.removeItem("token");
                // history.push('/dangnhap');
                // doLogout();
            } else {
                message.error("Lỗi hệ thống");
            }
        });
    }

    const checkResultStatus = (id) => {
        let detai = detais.find(i => i.id == id);
        if (detai != null) {
            let { diemdetai } = detai;
            return !!diemdetai;
        }
        return false;
    }

    const handleLinhVucChange = (val) => {
        setSelectingLinhvuc(val);
    }

    const columns = [
        {
            title: 'Tên đề tài',
            dataIndex: 'tendetai',
            key: 'tendetai',
            width: '35%'
        },
        {
            title: 'Tên chủ nhiệm',
            dataIndex: 'tenchunhiem',
            key: 'tenchunhiem',
            width: '13%'
        },
        {
            title: 'Cơ quan chủ trì',
            dataIndex: 'cqchutri',
            key: 'cqchutri',
            width: '13%'
        },
        {
            title: 'Cơ quan triển khai',
            dataIndex: 'cqtrienkhai',
            key: 'cqtrienkhai',
            width: '13%'
        },
        {
            title: 'Lĩnh vực',
            dataIndex: 'linhvuc',
            key: 'linhvuc',
            width: '13%',
            render: linhvuc => {
                switch (linhvuc) {
                    case 1:
                        return (
                            <Tag color="#00b33c">
                                KH Nông nghiệp
                            </Tag>
                        )
                    case 2:
                        return (
                            <Tag color="#3b5999">
                                KH Tự Nhiên
                            </Tag>
                        )
                    case 3:
                        return (
                            <Tag color="#cc0000">
                                KH Xã hội và Nhân Văn
                            </Tag>
                        )
                    case 4:
                        return (
                            <Tag color="#8600b3">
                                KH Y dược
                            </Tag>
                        )
                    case 5:
                        return (
                            <Tag color="#ac7339">
                                KH Kỹ thuật và Công nghệ
                            </Tag>
                        )
                }
            }
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            width: '13%',
            render: id => {
                return (
                    <React.Fragment>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Button
                                    type="primary"
                                    onClick={(e) => { showEditModal(id) }}
                                    style={styles.button}
                                    block
                                >Sửa</Button>
                            </Col>
                            <Col span={12}>
                                <Popconfirm
                                    placement="top"
                                    title="Chắc chắn xóa"
                                    onConfirm={() => { onDeleteConfirm(id) }}
                                    cancelText="Không"
                                    okText="Xóa"
                                    okButtonProps={{ type: 'danger', loading: isDeleteButtonLoading }}
                                >
                                    <Button
                                        type="danger"
                                        style={styles.button}
                                        block
                                    >
                                        Xóa
                                    </Button>
                                </Popconfirm>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Link to={`/khaosat/${id}`}><Button type="primary" block style={{ ...styles.longButton, background: '#13c2c2', borderColor: '#13c2c2' }}>Khảo sát</Button></Link>
                            </Col>
                            <Col span={12}>
                                {checkResultStatus(id) && <Link to={`/ketqua/${id}`}><Button type="danger" block style={{ ...styles.longButton, background: '#389e0d', borderColor: "#389e0d" }}>Kết quả</Button></Link>}
                            </Col>
                        </Row>
                    </React.Fragment>
                )
            }
        }
    ];

    const showChart = () => {
        if (!currentDetais || currentDetais.length == 0) {
            message.warning('Vui lòng chọn đề tài để so sánh');
        } else {
            setIsChartShown(true);
        }
    }

    const hideChart = () => {
        setIsChartShown(false);
    }

    const handleRowSelection = (selectedIdArr) => {
        if (detais) {
            let filteredDetais = detais.filter(i => selectedIdArr.includes(i.id));
            setCurrentDetais([...filteredDetais]);
        }
    }


    const rowSelection = {
        fixed: true,
        onChange: handleRowSelection
    }

    return (
        <React.Fragment>
            <Row style={{ marginTop: '5px', marginBottom: '5px' }} gutter={12}>
                <Col span={6} offset={12}>
                    <Form.Item label="Lĩnh vực">
                        <Select defaultValue={0} onChange={handleLinhVucChange}>
                            <Option value={0}>Tất cả</Option>
                            <Option value={1}>KH học Nông nghiệp</Option>
                            <Option value={2}>KH Tự nhiên</Option>
                            <Option value={3}>KH Xã hội và Nhân văn</Option>
                            <Option value={4}>KH Y dược</Option>
                            <Option value={5}>KH Kỹ thuật và Công nghệ</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={2} offset={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary" onClick={showChart}>So sánh</Button>
                </Col>
                <Col span={2}>
                    <Button type="primary" onClick={showCreateModal} style={{ background: '#389e0d', borderColor: '#389e0d' }}>Thêm đề tài</Button>
                </Col>
            </Row>
            <CreateModal isOpen={isCreateModalOpen} hide={hideCreateModal} appendNewDetai={appendNewDetai} />
            <EditModal isOpen={isEditModalOpen} hide={hideEditModal} editDetai={editDetai} changeEditedDetai={changeEditedDetai} />
            <Table rowSelection={rowSelection} dataSource={selectingLinhvuc == 0 ? detais : detais.filter(i => i.linhvuc == selectingLinhvuc)} columns={columns} loading={isLoading} />
            <ChartContainer isShown={isChartShown} hide={hideChart} currentDetais={currentDetais} />
        </React.Fragment>
    )
}

export default DeTaiList;
