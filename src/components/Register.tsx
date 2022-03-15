import { Button, Card, Col, DatePicker, Form, FormInstance, Input, Row, Select } from 'antd';
import React, { Component } from 'react'
import { addUser } from '../api/userApi'
import { RedirectToHome, RedirectToLogin} from '../api/router'

type registerState = {
    username: string,
    password: string,
    password_confirm: string,
    phone: string,
    birth: string
}

class register extends Component<any, registerState> {

    formRef = React.createRef<FormInstance>();

    onFinish = async (values: any) => {
        let birth = values["birth"].format("YYYY/MM/DD");
        if (values["password"] === values["password_confirm"]) {
            let res = await addUser(values["username"],values["password"],values["phone"],birth);
            if (res === "OK") {
               RedirectToHome();
               localStorage.setItem("username", values["username"]);
            } else {
                console.log("register failed");
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
            <div style={{ width: '100vw', height: '100vh', background: `url(${require('../assets/bg.jpg')})`, backgroundSize: "cover" }}>
                <Row justify='center' align='middle'>
                    <Col span={6}>
                        <Card style={{ marginTop: "25vh", height: "40vh" }} title="注 册" headStyle={{ fontSize: "18px", fontWeight: 600 }}>
                            <Form name="basic" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} initialValues={{ remember: true }} autoComplete="off" ref={this.formRef} onFinish={this.onFinish}>
                                <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名不能为空!' }]}>
                                    <Input placeholder='输入用户名' />
                                </Form.Item>
                                <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码不能为空!'},{min: 6, message:"密码不能小于6位"}]}>
                                   <Input.Password placeholder='输入密码'/>
                                </Form.Item>
                                <Form.Item label="确认密码" name="password_confirm" dependencies={['password']} hasFeedback rules={[{ required: true, message: '密码不能为空!'},({getFieldValue})=>({
                                    validator(_, values: String){
                                        if(!values || getFieldValue("password") === values){
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("密码不一致!"))
                                    }
                                }),{min: 6, message:"密码不能小于6位"}]}>
                                    <Input.Password placeholder='请确认密码'/>
                                </Form.Item>
                                <Form.Item name="phone" label="请输入电话" rules={[{len:11, message: "电话号码不合法!"}]}>
                                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder='再次输入电话'/>
                                </Form.Item>
                                <Form.Item name="birth" label="生日" >
                                    <DatePicker format={"YYYY/MM/DD"} />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                                    <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
                                        注册
                                    </Button>
                                    <Button style={{ width: "40%", marginLeft: "10%" }} onClick={RedirectToLogin}>
                                        返回登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default register
