import React, {Component} from 'react'

import 'antd/dist/antd.min.css'
import './css/Layout.css'
import { Layout, Menu, Row, Col, Card, Image} from 'antd';
import { ChangeRouter } from '../api/router';
import { getNews } from '../api/newsApi';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
const { Header, Content, Footer } = Layout;
export type newsType = {
    ctime: string,
    title: string,
    description: string,
    picUrl: string,
    source: string
}

class NewsCard extends Component<newsType, any>{
    constructor(props: any){
        super(props);
        this.state = {
            ctime : "",
            title : "",
            description : "",
            picUrl : "",
            source : ""
        }
    }

    render(){
        const {ctime, title, description, picUrl, source} = this.props;
        return(<Card hoverable style={{marginTop:"1%"}}>
            <Row>
                <Col span={6}>
                    <Image src={picUrl} width={280} height={180} style={{border:"none"}}/>    
                </Col>
                <Col span={14} offset={1}>
                    <div style={{height:"80%"}}>
                        <Title level={2}>{title}</Title>
                        <Text style={{fontSize:"18px",paddingLeft:"2%"}}>{description}</Text>
                    </div>
                    <div style={{height:"20%",paddingLeft:"2%"}}>
                        <Row style={{fontSize:"16px"}}>
                            <Col span={12}>{source}</Col>
                            <Col span={12} style={{paddingLeft:"40%"}}>{ctime}</Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Card>)
    }
};

type newsState = {
    newsList: Array<newsType>
}

class news extends Component<any, newsState> {
    constructor(props: any){
        super(props);
        this.state = {
            newsList: []
        }
    }

    async componentDidMount(){
        let data = await getNews()
        this.setState({
            newsList: data
        })
    }
 
    render(){
        const newsList = this.state.newsList;
        return(
            <div className='container'>
                <Layout className='layout'>
                    <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <Row>
                            <Col span={6}>
                                <div className="logo">News</div>
                            </Col>
                            <Col span={6} offset={12}>
                                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} onClick={(item)=>{
                                    ChangeRouter(item["key"]);
                                }}>
                                    <Menu.Item key="home">首页</Menu.Item>
                                    <Menu.Item key="publish">新闻投稿</Menu.Item>
                                    <Menu.Item key="user">个人主页</Menu.Item>
                                </Menu>    
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: '100px'}}>
                        <div>
                            <Row>
                                <Col span={12} offset={6}>
                                <Card title="新 闻 列 表" headStyle={{fontSize: "20px", fontWeight:"600"}} bordered={false} >
                                    {
                                        newsList.map((item, key)=>{
                                            return <NewsCard key={key} ctime={item["ctime"]} title={item["title"]} description={item["description"]} picUrl={item["picUrl"]} source={item["source"]} ></NewsCard>
                                        })
                                    }
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

export default news