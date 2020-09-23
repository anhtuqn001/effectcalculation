import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { message, Button, Table, Tag, Modal, Form, Input, Select } from 'antd';

const CreateModal = ({ isOpen, hide, appendNewDetai }) => {
    const [madetai, setMadetai] = useState('');
    const [tendetai, setTendetai] = useState('');
    const [tenchunhiem, setTenchunhiem] = useState('');
    const [cqchutri, setCqchutri] = useState('');
    const [cqtrienkhai, setCqtrienkhai] = useState('');
    const [kinhphichutri, setKinhphichutri] = useState(0);
    const [kinhphitrienkhai, setKinhphitrienkhai] = useState(0);
    const [linhvuc, setLinhvuc] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleMadetaiChange = (e) => {
        setMadetai(e.target.value);
    }

    const handleTendetaiChange = (e) => {
        setTendetai(e.target.value);
    }

    const handleTenchunhiemChange = (e) => {
        setTenchunhiem(e.target.value);
    }

    const handleCqchutriChange = (e) => {
        setCqchutri(e.target.value);
    }

    const handleCqtrienkhaiChange = (e) => {
        setCqtrienkhai(e.target.value);
    }

    const handleLinhvucChange = (val) => {
        setLinhvuc(val);
    }

    const handleKinhphichutriChange = (e) => {
        setKinhphichutri(e.target.value);
    }

    const handleKinhphitrienkhaiChange = (e) => {
        setKinhphitrienkhai(e.target.value);
    }

    const handleSubmit = () => {
        setIsLoading(true);
        let data = {
            madetai,
            tendetai,
            tenchunhiem,
            cqchutri,
            cqtrienkhai,
            kinhphichutri,
            kinhphitrienkhai,
            linhvuc,
        }
        console.log(data);
        fetch("/api/detai", {
            method: "POST",
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
            appendNewDetai(detai);
            setIsLoading(false);
            hide();
            message.success('Tạo mới đề tài thành công');
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

    return (
        <Modal
            title="Tạo mới đề tài"
            visible={isOpen}
            // onOk={this.handleOk}
            onCancel={hide}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    loading={isLoading}
                    onClick={handleSubmit}
                    style={{ background: '#389e0d', borderColor: '#389e0d' }}
                >
                    Tạo
                </Button>,
                <Button
                    key="back"
                    onClick={hide}
                >
                    Hủy
                </Button>,
            ]}
            destroyOnClose={true}
        >
            <Form
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
                name="basic"
            >
                <Form.Item
                    label="Mã đề tài"
                    name="madetai"
                    rules={[
                        {
                            required: true,
                            message: 'Mã đề tài không được để trống',
                        },
                    ]}
                    // style={{ marginBottom: '5px' }}
                    onChange={handleMadetaiChange}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên đề tài"
                    name="tendetai"
                    rules={[
                        {
                            required: true,
                            message: 'Tên đề tài không được để trống',
                        },
                    ]}
                    // style={{ marginBottom: '5px' }}
                    onChange={handleTendetaiChange}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên chủ nhiệm"
                    name="tenchunhiem"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Tên đề tài không được để trống',
                    //     },
                    // ]}
                    // style={{ marginBottom: '5px' }}
                    onChange={handleTenchunhiemChange}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Cơ quan chủ trì"
                    name="cqchutri"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Tên đề tài không được để trống',
                    //     },
                    // ]}
                    // style={{ marginBottom: '5px' }}
                    onChange={handleCqchutriChange}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Cơ quan triển khai"
                    name="cqtrienkhai"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Tên đề tài không được để trống',
                    //     },
                    // ]}
                    // style={{ marginBottom: '5px' }}
                    onChange={handleCqtrienkhaiChange}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Kinh phí chủ trì"
                    name="kinhphichutri"
                    rules={[
                        {
                            required: true,
                            message: 'Kinh phí chủ trì không được để trống',
                        },
                    ]}
                    // style={{ marginBottom: '5px' }}
                    onChange={handleKinhphichutriChange}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Kinh phí triển khai"
                    name="kinhphitrienkhai"
                    rules={[
                        {
                            required: true,
                            message: 'Kinh phí triển khai không được để trống',
                        },
                    ]}
                    // style={{ marginBottom: '5px' }}
                    onChange={handleKinhphitrienkhaiChange}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Lĩnh vực"
                    name="linhvuc"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Tên đề tài không được để trống',
                //     },
                // ]}
                // style={{ marginBottom: '5px' }}

                >
                    <Select onChange={handleLinhvucChange}>
                        <Option value={1}>Khoa học Nông nghiệp</Option>
                        <Option value={2}>Khoa học Tự nhiên</Option>
                        <Option value={3}>Khoa học Xã hội và Nhân Văn</Option>
                        <Option value={4}>Khoa học Y dược</Option>
                        <Option value={5}>Khoa học Kỹ thuật và Công nghệ</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateModal;