import { Button, Card, Checkbox, Col, Form, FormInstance, Input, Row } from 'antd';
import React, {Component} from 'react'
import { openNotification, RedirectToHome, RedirectToRegister } from '../api/router';
import { userLogin } from '../api/userApi';
import { MehOutlined, SmileOutlined } from '@ant-design/icons';

type loginState = {
    username: string,
    password: string,
    remember: boolean
}

class login extends Component<any, loginState> {

    constructor(props: any){
        super(props);
        this.state = {
            username: "",
            password: "",
            remember: true
        }
    }

    formRef = React.createRef<FormInstance>();
    
    onFinish = async (values: any) => {
        let res: any = await userLogin(values["username"], values["password"]);
        if(res === "OK"){
            openNotification("登录成功","欢迎来到News",<SmileOutlined style={{color:"rgb(135, 208, 104)"}}/>)
            localStorage.setItem("username", values["username"]);
            localStorage.setItem("remember", values["remember"])
            if(values["remember"]){
                localStorage.setItem("password", values["password"]);
            }
            setTimeout(()=>{
                RedirectToHome();
            },800);
        }else if(res === "PASS_ERR"){
            openNotification("密码错误","请确认密码是否正确",<MehOutlined style={{color:"#f4364c"}}/>)
        }else if(res === "NO_USER"){
            openNotification("用户不存在","请确认用户名是否正确",<MehOutlined style={{color:"#f4364c"}}/>)
        }else{
            openNotification("服务异常","请等待...",<MehOutlined style={{color:"#f4364c"}}/>)
        }
    };

    componentDidMount() {
        
        this.formRef.current?.setFieldsValue({
            username: localStorage.getItem("username"),
            remember: localStorage.getItem("remember") === "true"
        });
        if(localStorage.getItem("remember") === "true"){
            this.formRef.current?.setFieldsValue({
                password: localStorage.getItem("password")
            });
        }
    }

    render(){
        return(
            <div style={{width:'100vw', height:'100vh', background:`url(${require('../assets/bg.jpg')})`, backgroundSize:"cover"}}>
                 <Row justify='center' align='middle'>
                    <Col span={6}>
                        <Card style={{marginTop:"30vh",height: "30vh"}} title="登 录" headStyle={{fontSize:"18px",fontWeight:600}}>
                        <Form name="basic" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} autoComplete="off" ref={this.formRef} onFinish={this.onFinish}>
                            <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名不能为空!'}]}>
                                <Input placeholder='输入用户名'/>
                            </Form.Item>
                            <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码不能为空!' }]}>
                                <Input.Password placeholder='输入密码'/>
                            </Form.Item>
                            <Row justify='center'>
                                <Col span={12}>
                                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 10, span: 16 }}>
                                        <Checkbox checked={this.state.remember} onChange={(e)=>{
                                            localStorage.setItem("remember", e["target"]["checked"].toString());
                                        }}>记住密码</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={{paddingTop:"1%",paddingLeft:"32%"}}>
                                    <a target={"_blank"} rel="noreferrer" href='https://www.baidu.com/s?wd=%E5%BF%98%E8%AE%B0%E5%AF%86%E7%A0%81%E6%80%8E%E4%B9%88%E5%8A%9E'>忘记密码?</a>
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