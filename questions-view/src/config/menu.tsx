import React from 'react'
import { HomeTwoTone, CheckCircleTwoTone } from '@ant-design/icons'

import { Template } from '../Template'

import NumberInput_Readme from '../../../1_NumberInput/README.md?raw'
import { Demo as NumberInput } from '../../../1_NumberInput/src/Demo'

export default [
  {
    label: '首页',
    icon: <HomeTwoTone />,
    path: '',
    element: <Template title='欢迎来到司南前端训练营！' />,
  },
  {
    label: '#1：NumberInput',
    icon: <CheckCircleTwoTone />,
    path: 'question/1',
    element: (
      <Template
        content={NumberInput_Readme}
        demo={<NumberInput />}
        repo='https://github.com/CompassChina/compass-fe-camp--q1-NumberInput'
        slack='https://compass-china.slack.com/archives/C03HJ00CXDK'
      />
    ),
  },
]
