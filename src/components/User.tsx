import { Col, Layout, Menu, Row } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import React, {Component} from 'react'
import { ChangeRouter } from '../api/router';

class User extends Component<any, any> {
    constructor(props: any){
        super(props);
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
                                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['user']} onClick={(item)=>{
                                    ChangeRouter(item["key"]);
                                }}>
                                    <Menu.Item key="home">首页</Menu.Item>
                                    <Menu.Item key="publish">新闻投稿</Menu.Item>
                                    <Menu.Item key="user">个人主页</Menu.Item>
                                </Menu>    
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: '60px'}}>
                       
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>News App©2022 Created by Kronos</Footer>
                </Layout>
            </div>
        )
    }
}

export default User