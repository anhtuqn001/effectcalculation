import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { message, Button, Table, Tag, Popconfirm, Row, Col } from 'antd';
import CreateModal from './CreateModal.js';
import EditModal from './EditModal.js';
import {
    Link
} from "react-router-dom";

const styles = {
    button : {
        margin: '2px'
    },
    longButton : {
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
            if(result.success) {
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
       if(detai != null) {
        let { diemdetai } = detai;
            return !!diemdetai;
       }
       return false;
    }

    const columns = [
        {
            title: 'Tên đề tài',
            dataIndex: 'tendetai',
            key: 'tendetai',
            width: '30%'
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
            width: '18%',
            render: id => {
                return (
                    <React.Fragment>
                        <Button
                            type="primary"
                            onClick={(e) => { showEditModal(id) }}
                            style={styles.button}
                        >Sửa</Button>
                        <Popconfirm
                            placement="top"
                            title="Chắc chắn xóa"
                            onConfirm={() => { onDeleteConfirm(id) }}
                            cancelText="Không"
                            okText="Xóa"
                            okButtonProps={{type: 'danger', loading: isDeleteButtonLoading}}
                        >
                            <Button
                            type="danger"
                            style={styles.button}
                            >
                            Xóa
                            </Button>
                        </Popconfirm>
                        <Link to={`/khaosat/${id}`}><Button type="primary" style={styles.longButton}>Khảo sát</Button></Link>
                        {checkResultStatus(id) && <Link to={`/ketqua/${id}`}><Button type="danger" style={styles.longButton}>Kết quả</Button></Link>}
                    </React.Fragment>
                )
            }
        }

    ];
    return (
        <React.Fragment>
            <Row style={{marginTop: '5px', marginBottom: '5px'}}>
                <Col span={2} offset={22}>
                    <Button type="primary" onClick={showCreateModal} style={{background: '#389e0d', borderColor:'#389e0d'}}>Thêm đề tài</Button>
                </Col>
            </Row>
            <CreateModal isOpen={isCreateModalOpen} hide={hideCreateModal} appendNewDetai={appendNewDetai}/>
            <EditModal isOpen={isEditModalOpen} hide={hideEditModal} editDetai={editDetai} changeEditedDetai={changeEditedDetai} />
            <Table dataSource={detais} columns={columns} loading={isLoading}/>
        </React.Fragment>
    )
}

export default DeTaiList;
