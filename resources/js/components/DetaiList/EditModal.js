import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { message, Button, Table, Tag, Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const EditModal = ({ isOpen, hide, editDetai, changeEditedDetai }) => {
    const [tendetai, setTendetai] = useState('');
    const [tenchunhiem, setTenchunhiem] = useState('');
    const [cqchutri, setCqchutri] = useState('');
    const [cqtrienkhai, setCqtrienkhai] = useState('');
    const [linhvuc, setLinhvuc] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (editDetai != null) {
            let { tendetai, tenchunhiem, cqchutri, cqtrienkhai, linhvuc } = editDetai;
            setTendetai(tendetai);
            setTenchunhiem(tenchunhiem);
            setCqchutri(cqchutri);
            setCqtrienkhai(cqtrienkhai);
            setLinhvuc(linhvuc);
        }
    }, [editDetai])

    useEffect(() => {
        setTendetai('');
        setTenchunhiem('');
        setCqchutri('');
        setCqtrienkhai('');
        setLinhvuc('');
    }, [])

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

    const handleSubmit = () => {
        setIsLoading(true);
        let { id } = editDetai;
        let data = {
            id,
            tendetai,
            tenchunhiem,
            cqchutri,
            cqtrienkhai,
            linhvuc,
            _method: "PUT"
        }
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
            let { editedDetai } = result;
            console.log(editedDetai);
            changeEditedDetai(editedDetai);
            message.success('Cập nhật đề tài thành công!');
            hide();
        }, (error) => {
            if (error.status == 401) {
                // localStorage.removeItem("token");
                // history.push('/dangnhap');
                // doLogout();
            } else {
                message.error("Lỗi hệ thống");
            }
        }).then(() => { setIsLoading(false);})
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
                    // loading={isLoading}
                    // style={{ background: "#389e0d", borderColor: "green" }}
                    onClick={handleSubmit}
                    loading={isLoading}
                >
                    Cập nhật
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
                    initialValue={tendetai}
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
                    initialValue={tenchunhiem}
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
                    initialValue={cqchutri}
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
                    initialValue={cqtrienkhai}
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
                    <Select onChange={handleLinhvucChange} defaultValue={linhvuc}>
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

export default EditModal;