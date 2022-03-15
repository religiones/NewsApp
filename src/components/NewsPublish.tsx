import { Button, Card, Col, Form, Input, Layout, Menu, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import React, {Component} from 'react'
import { ChangeRouter, RedirectToHome} from '../api/router';
import axios from 'axios'

type newsPublisState = {
    newsTitle: string,
    newsContent: string,
    newsSource: string,
    newsTime: string,
    newsPicture: any
}

class newsPublish extends Component<any, newsPublisState> {
    constructor(props: any){
        super(props);
        this.state = {
            newsTitle: "",
            newsContent: "",
            newsSource: "",
            newsTime: "",
            newsPicture: null
        }
    }

    onFinish = (values: any) => {
        console.log(values);
        const time = `${new Date().getFullYear()}/${new Date().getDate()}/${new Date().getDay()}`;
        const news = {
            ctime: time,
            title: values["newsTitle"],
            description: values["newsContent"],
            source: values["newsSource"]
        }
        const formData = new FormData();
        formData.append("news",JSON.stringify(news));
        formData.append("newsPic", values["newsPic"]["file"]["originFileObj"]);
        axios.post('/api/addNews',formData,{
            headers:{'Content-Type':'multipart/form-data;charset=UTF-8'}
        }).then(res=>{
            RedirectToHome();
        }).catch(err=>{
            console.log(err);
        });
    }

    render(){
        return(
            <div className='container'>
                <Layout className='layout'>
                    <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <Row>
                            <Col span={6}>
                                <div className="logo">Logo</div>
                            </Col>
                            <Col span={6} offset={12}>
                                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['pulish']} onClick={(item)=>{
                                    ChangeRouter(item["key"]);
                                }}>
                                    <Menu.Item key="home">首页</Menu.Item>
                                    <Menu.Item key="pulish">新闻投稿</Menu.Item>
                                    <Menu.Item key="user">个人主页</Menu.Item>
                                </Menu>    
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: '14vh'}}>
                        <div className="site-layout-content" style={{height:'80.5vh'}}>
                            <Row>
                                <Col span={12} offset={6}>
                                    <Card title="新 闻 发 布" headStyle={{fontSize: "20px", fontWeight:"600"}} bordered={false} >
                                        <Form name='newsPublis' layout='vertical' onFinish={this.onFinish}>
                                            <Form.Item label="新闻标题"  name="newsTitle" rules={[{required: true, message: "标题不能为空!"}]}>
                                                <Input placeholder='请输入新闻标题'/>
                                            </Form.Item>
                                            <Form.Item label="新闻来源"  name="newsSource" rules={[{required: true, message: "标题不能为空!"}]}>
                                                <Input placeholder='请输入新闻标题'/>
                                            </Form.Item>
                                            <Form.Item label="新闻内容"  name="newsContent" rules={[{required: true, message: "内容不能为空!"}]}>
                                                <TextArea showCount maxLength={300} style={{height: 300}} placeholder='请输入新闻内容'/>
                                            </Form.Item>
                                            <Form.Item name="newsPic">
                                                <Upload maxCount={1} listType="picture" style={{float:"left", width:"200px",marginRight:"8px"}}>
                                                    <Button icon={<UploadOutlined/>}>上传图片</Button>    
                                                </Upload>
                                            </Form.Item>
                                            <Form.Item name="submit">
                                                <Button type='primary' htmlType='submit' style={{width:"40%",height:"40px",fontSize:"18px",marginLeft:"30%"}}>提交</Button>
                                            </Form.Item>
                                        </Form>
                                    </Card>
                                </Col>
                            </Row>   
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>News App©2022 Created by Kronos</Footer>
                </Layout>
            </div>
        )
    }
}

export default newsPublish