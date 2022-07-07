import React, { FC } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import { Layout, Menu, Input } from 'antd'
import { CompassTwoTone } from '@ant-design/icons'
import 'antd/dist/antd.css'

import menu from './config/menu'
import styles from './App.module.less'

const { Sider, Header, Content } = Layout
const { Search } = Input

const Route: FC = () => useRoutes(menu)

export const App: FC = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <Sider width='30vw'>
        <Layout className={styles['sider']}>
          <Header className={styles['header']}>
            <div className={styles['title']}>
              <CompassTwoTone />
              司南前端训练营
            </div>
            <Search placeholder='搜索题目' disabled />
          </Header>
          <Content className={styles['content']}>
            <Menu
              items={menu.map(item => ({
                label: item.label,
                icon: item.icon,
                key: item.path,
              }))}
              selectedKeys={[location.hash.slice(2)]}
              onSelect={item => navigate(item.key)}
              style={{ border: 0 }}
            />
          </Content>
        </Layout>
      </Sider>

      <Route />
    </Layout>
  )
}
