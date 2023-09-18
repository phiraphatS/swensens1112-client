import React from 'react'
import styles from '@/styles/Page.module.scss'
import { Form, Space, Row, Col, Input, Radio, DatePicker, Checkbox, Button, message } from 'antd'
import form from 'antd/es/form'
import { userService } from '@/_services/user.service'
import { useRouter } from 'next/router'

export default function Login() {
  const [form] = Form.useForm()
  const router = useRouter()

  const handleSubmit = (formVal: any) => {
    const { email, password } = formVal
    
    userService.logIn({ email: email, password: password }).then((res) => {
      if(res.status === true) {
        window.location.href = '/'
      } else {
        message.open({ content: res.message, type: 'error'})
      }
    }).catch((error) => {
      message.open({ content: error.message, type: 'error'})
    })
  }
  return (
    
    <div className={styles.register_content}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>ยินดีต้อนรับ</h1>
          <span>เข้าสู่ระบบเพื่อใช้งาน</span>
        </div>

        <div className={styles.form}>
          <Form 
          form={form} 
          onFinish={handleSubmit}
          layout='vertical' 
          autoComplete='false'
          >
            <Space direction='vertical' style={{ width: '100%' }}>
              <Form.Item name='email' label='อีเมล'
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject(['กรุณาตรวจสอบอีเมลที่ระบุให้ถูกต้อง'])
                      }
                    },
                  })
                ]}>
                <Input placeholder='กรอกอีเมล' maxLength={255} />
              </Form.Item>

              <span>
              <Form.Item name='password' label='รหัสผ่าน'
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value && value.length >= 8) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject('ตั้งรหัสผ่านอย่างน้อย 8 ตัว')
                      }
                    },
                  })
                ]}>
                <Input.Password placeholder='กรอกรหัสผ่าน' maxLength={255} />
              </Form.Item>
              
              <Row justify='end'>
                <a href="#" style={{ color: '#e21c23' }}>ลืมรหัสผ่าน</a>
              </Row>
              </span>

              <Form.Item>
                <Button 
                type='primary' 
                htmlType='submit' 
                className={styles.btn_submit}
                style={{width: '100%', height: '48px', borderRadius: '25px'}}
                >
                  เข้าสู่ระบบ
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  )
}
