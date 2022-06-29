import React, { FC, useState } from 'react'
import Markdown from 'react-markdown'
import { Layout, Button, Modal } from 'antd'
import { HeartOutlined, StarOutlined } from '@ant-design/icons'

import menu from '../config/menu'
import readme from '../../../README.md?raw'
import styles from './index.module.less'

const { Content, Footer } = Layout

export type Props = {
  title?: string
  content?: string
  demo?: JSX.Element
  href?: string
}

export const Template: FC<Props> = ({
  title = menu.find(item => '#/' + item.path === location.hash)?.label,
  content = readme,
  demo,
  href,
}) => {
  document.title = title || '司南前端训练营'

  const [demoModal, setDemoModal] = useState(false)

  return (
    <Layout>
      <Content className={styles['content']}>
        <div className={styles['title']}>{title}</div>
        <Markdown children={content} />
      </Content>

      <Footer className={styles['footer']}>
        <Button type='text' size='large' icon={<HeartOutlined />} disabled>
          喜欢
        </Button>

        <Button type='text' size='large' icon={<StarOutlined />} disabled>
          收藏
        </Button>

        {demo && (
          <Button size='large' className={styles['button']} onClick={() => setDemoModal(true)}>
            效果演示
          </Button>
        )}

        {href && (
          <Button type='primary' size='large' className={styles['button']} href={href}>
            访问仓库
          </Button>
        )}
      </Footer>

      <Modal
        title='效果演示'
        visible={demoModal}
        onCancel={() => setDemoModal(false)}
        footer={null}
      >
        {demo}
      </Modal>
    </Layout>
  )
}
