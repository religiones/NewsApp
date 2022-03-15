import { Button, Card, Checkbox, Col, Form, FormInstance, Input, Row } from 'antd';
import React, {Component} from 'react'
import { RedirectToHome, RedirectToRegister } from '../api/router';
import { userLogin } from '../api/userApi';

type loginState = {
    resCode: string
}

class login extends Component<any, loginState> {
    constructor(props: any){
        super(props);
        this.state = {
            resCode: ""
        }
    }

    formRef = React.createRef<FormInstance>();
    
    onFinish = async (values: any) => {
        let res: any = await userLogin(values["username"], values["password"]);
        this.setState({
            resCode: res
        });
        if(res === "OK"){
            RedirectToHome();
        }else{
            console.log("false");
        }
    };

    redirectToRegister = ()=>{
        window.location.href= "http://localhost:3000/register";
    }

    redirectToHome = ()=>{
        window.location.href= "http://localhost:3000/";
    }

    render(){
        return(
            <div style={{width:'100vw', height:'100vh', background:`url(${require('../assets/bg.jpg')})`, backgroundSize:"cover"}}>
                 <Row justify='center' align='middle'>
                    <Col span={6}>
                        <Card style={{marginTop:"30vh",height: "30vh"}} title="登 录" headStyle={{fontSize:"18px",fontWeight:600}}>
                        <Form name="basic" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} initialValues={{ remember: true }}  autoComplete="off" ref={this.formRef} onFinish={this.onFinish}>
                            <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名不能为空!'}]}>
                                <Input placeholder='输入用户名'/>
                            </Form.Item>
                            <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码不能为空!' }]}>
                                <Input.Password placeholder='输入密码'/>
                            </Form.Item>
                            <Row justify='center'>
                                <Col span={12}>
                                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 10, span: 16 }}>
                                        <Checkbox>记住密码</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={{paddingTop:"1%",paddingLeft:"32%"}}>
                                    <a href='#'>忘记密码?</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                        <Button type="primary" htmlType="submit" style={{width:"100px"}}>
                                        登录
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                        <Button type="primary"  style={{width:"100px"}} onClick={RedirectToRegister}>
                                        注册
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default login