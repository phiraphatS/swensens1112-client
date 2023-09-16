// ********************** Hi I want to tell that this is first page I installed ant-design to use with form, 
// Don't have to care that I manual custom style in project before this page *********************


import React, { useState } from 'react'
import styles from '@/styles/Page.module.scss'
import { Button, Checkbox, Col, DatePicker, Form, Input, Radio, Row, Space, message } from 'antd'
import { error } from 'console'
import { userService } from '@/_services/user.service'

export default function Register() {
  const [form] = Form.useForm() // Starting use ant-design
  const watchEmail = Form.useWatch('email', form)
  const watchRule1 = Form.useWatch('acception_rule1', form)
  const watchRule2 = Form.useWatch('acception_rule2', form)

  const handleSubmit = (formVal: any) => {
    userService.register(formVal).then((res) => {
      if(res.status === true) {
        console.log(res.message);
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
          <h1>สร้างบัญชี</h1>
          <span>สมัครสมาชิกและเริ่มใช้งาน</span>
        </div>

        <div className={styles.form}>
          <Form 
          form={form} 
          onFinish={handleSubmit}
          layout='vertical' 
          autoComplete='false'
          >
            <Space direction='vertical'>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name='first_name'
                    label='ชื่อ'
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (value && value.length >= 2) {
                            return Promise.resolve()
                          } else {
                            return Promise.reject('กรุณากรอกอย่างน้อย 2 ตัวอักษร')
                          }
                        },
                      })
                    ]}>
                    <Input placeholder='กรอกชื่อ' maxLength={255} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='lastname'
                    label='นามสกุล'
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (value && value.length >= 2) {
                            return Promise.resolve()
                          } else {
                            return Promise.reject('กรุณากรอกอย่างน้อย 2 ตัวอักษร')
                          }
                        },
                      })
                    ]}>
                    <Input placeholder='กรอกนามสกุล' maxLength={255} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name='tel' label='เบอร์โทรศัพท์'
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value && value.length == 10 && /^[0-9]+$/.test(value)) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject('กรุณากรอกเบอร์โทรศัพท์')
                      }
                    },
                  })
                ]}>
                <Input placeholder='กรอกเบอร์โทรศัพท์' maxLength={10} />
              </Form.Item>

              <Form.Item name='email' label='อีเมล'
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject(['กรุณากรอกอีเมล','กรุณาตรวจสอบอีเมลที่ระบุให้ถูกต้อง'])
                      }
                    },
                  })
                ]}>
                <Input placeholder='กรอกอีเมล' maxLength={255} />
              </Form.Item>

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

              <Form.Item name='gender' label='เพศ (ไม่ระบุได้)'
                rules={[({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject('กรุณาเลือก')
                    }
                  },
                })]}>
                <Radio.Group optionType='button'>
                  <Radio value={1}>ชาย</Radio>
                  <Radio value={2}>หญิง</Radio>
                  <Radio value={3}>ไม่ระบุ</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item name='birth_date' label='ของขวัญวันเกิดรอคุณอยู่'
                rules={[({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject('กรุณาระบุวันเกิด')
                    }
                  },
                })]}>
                <DatePicker placeholder='dd/mm/yyyy' format={'DD/MM/YYYY'} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item name="acception_rule1" valuePropName="checked"
                rules={[({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject(null)
                    }
                  },
                })]}>
                <Checkbox>
                  <span style={{ color: '#787878' }}>
                    ฉันได้อ่านและยอมรับ <a href="#" style={{ color: '#e21c23' }}>ข้อกำหนดการใช้งาน</a> และ <a href="#" style={{ color: '#e21c23' }}>นโยบายความเป็นส่วนตัว</a> ของสเวนเซ่นส์
                  </span>
                </Checkbox>
              </Form.Item>

              <Form.Item name="acception_rule2" valuePropName="checked"
                rules={[({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject(null)
                    }
                  },
                })]}>
                <Checkbox style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'start' }}>
                  <span style={{ color: '#787878' }}>
                    ฉันยินยอมรับข้อมูลข่าวสาร กิจกรรมส่งเสริมการขายต่างๆ จากสเวนเซ่นส์และ<a href="#" style={{ color: '#e21c23' }}>บริษัทในเครือ</a> โดยเราจะเก็บข้อมูลของท่านไว้เป็นความลับ สามารถศึกษาเงื่อนไขหรือข้อตกลง <a href="#" style={{ color: '#e21c23' }}>นโยบายความเป็นส่วนตัว</a> เพิ่มเติมได้ที่เว็บไซต์ของบริษัทฯ
                  </span>
                </Checkbox>

              </Form.Item>

              <Form.Item>
                <Button 
                type='primary' 
                htmlType='submit' 
                className={styles.btn_submit}
                style={{width: '100%', height: '48px'}}
                disabled={!watchRule1}
                >
                  สมัครสมาชิก
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  )
}
