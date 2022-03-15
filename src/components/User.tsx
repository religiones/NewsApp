import { Button, Card, Col, DatePicker, Form, Input, Layout, Menu, Row, Select } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import moment from 'moment';
import React, { Component } from 'react'
import { ChangeRouter, openNotification, RedirectToLogin } from '../api/router';
import { getUser, updateUser } from '../api/userApi';
import { FormInstance } from 'antd/es/form';
import { MehOutlined, SmileOutlined } from '@ant-design/icons';
type userState = {
    username: string,
    password: string,
    password_confirm: string,
    phone: string,
    birth: string
}

class User extends Component<any, userState> {
    formRef = React.createRef<FormInstance>();

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo = async() => {
        let userName = localStorage.getItem("username");
        if (userName) {
            let res = await getUser(userName);
            this.formRef.current?.setFieldsValue({ 
            username: res["userName"],
            password: res["userPassword"],
            password_confirm: res["userPassword"],
            phone: res["userPhone"],
            birth: moment(res["userBirth"],"YYYY/MM/DD")});
        } else {
            console.log("connot get user info");
        }
    }

    updateUserInfo = async (values: any) => {
        let birth = values["birth"].format("YYYY/MM/DD");
        if (values["password"] === values["password_confirm"]) {
            let user = {
                userName : values["username"],
                userPassword : values["password"],
                userPhone : values["phone"],
                userBirth : birth
            }
            let res = await updateUser(localStorage.getItem("username"), user);
            if (res === "OK") {
                openNotification("更改成功","",<SmileOutlined style={{color:"rgb(135, 208, 104)"}}/>);
                localStorage.setItem("username", values["username"]);
            } else if(res === "USER_EXITS"){
                openNotification("用户已存在","请更换其他用户名",<MehOutlined style={{color:"#f4364c"}}/>)
            } else{
                openNotification("更改失败","请等待...",<MehOutlined style={{color:"#f4364c"}}/>)
            }
        } else {
            console.log("password error");
        }
    }

    render() {
        const { Option } = Select;
        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select style={{ width: 70 }} defaultValue="86">
                    <Option value="86">+86</Option>
                    <Option value="87">+87</Option>
                </Select>
            </Form.Item>
        );
        return (
            <div className='container'>
                <Layout className='layout'>
                    <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <Row>
                            <Col span={6}>
                                <div className="logo">News</div>
                            </Col>
                            <Col span={6} offset={12}>
                                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['user']} onClick={(item) => {
                                    ChangeRouter(item["key"]);
                                }}>
                                    <Menu.Item key="home">首页</Menu.Item>
                                    <Menu.Item key="publish">新闻投稿</Menu.Item>
                                    <Menu.Item key="user">个人主页</Menu.Item>
                                </Menu>
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: '60px' }}>
                        <Row justify='center' align='middle'>
                            <Col span={10}>
                                <Card style={{ marginTop: "25vh", height: "35vh" }} title="用户个人信息" headStyle={{ fontSize: "18px", fontWeight: 600 }}>
                                    <Form name="basic" ref={this.formRef} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} initialValues={{ remember: true }} autoComplete="off" onFinish={this.updateUserInfo}>
                                        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名不能为空!' }]}>
                                            <Input placeholder='输入用户名' />
                                        </Form.Item>
                                        <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码不能为空!' }, { min: 6, message: "密码不能小于6位" }]}>
                                            <Input.Password placeholder='输入密码' />
                                        </Form.Item>
                                        <Form.Item label="确认密码" name="password_confirm" dependencies={['password']} hasFeedback rules={[{ required: true, message: '密码不能为空!' }, ({ getFieldValue }) => ({
                                            validator(_, values: String) {
                                                if (!values || getFieldValue("password") === values) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error("密码不一致!"))
                                            }
                                        }), { min: 6, message: "密码不能小于6位" }]}>
                                            <Input.Password placeholder='请确认密码' />
                                        </Form.Item>
                                        <Form.Item name="phone" label="电话" rules={[{ len: 11, message: "电话号码不合法!" }]}>
                                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder='再次输入电话' />
                                        </Form.Item>
                                        <Form.Item name="birth" label="生日" >
                                            <DatePicker format={"YYYY/MM/DD"}/>
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                                            <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
                                                更改信息
                                            </Button>
                                            <Button style={{ width: "40%", marginLeft: "10%" }} onClick={()=>{
                                                localStorage.removeItem("username");
                                                RedirectToLogin();
                                            }}>
                                                退出登录
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>News App©2022 Created by Kronos</Footer>
                </Layout>
            </div>
        )
    }
}

export default User