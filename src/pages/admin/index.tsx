import { productService } from '@/_services/product.service'
import styles from '@/styles/Page.module.scss'
import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Form, Input, InputNumber, Modal, Radio, Row, Typography, Upload, message } from 'antd'
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const { Title } = Typography
const { Meta } = Card

interface adminContentInterface {
  id: number,
  title_th: string,
  title_en: string | null,
  product_list: any[]
}

export default function Admin() {
  const [form] = Form.useForm()
  const watchFile = Form.useWatch(['uploadFile', 'fileList'], form)
  const [open, setOpen] = useState<boolean>(false)
  const [openCate, setOpenCate] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [menuList, setMenuList] = useState<any[]>([])
  const [adminContent, setAdminContent] = useState<adminContentInterface[]>([])
  const [modalCategory, setModalCategory] = useState<number | null>(null)
  const [modalStatus, setModalStatus] = useState('create')

  useEffect(() => {
    const resCategory = productService.getCategory().then((res) => {
      if (res.status == true) {
        setMenuList(res.results)
      } else {
        setMenuList([])
      }
    })
    getProduct()
  }, [])

  const getProduct = () => {
    setLoading(true)
    const resProduct = productService.getProduct(0).then((res) => {
      if (res.status == true) {
        setAdminContent(res.results)
      } else {
        setAdminContent([])
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  const categoryName = menuList.find((x: any) => x.id == modalCategory)?.title_th

  const onCreate = async (formVal: any) => {
    setModalCategory(null)
    setOpen(false)
    const req = {
      category_id: formVal.category_id,
      product_name: formVal.product_name,
      detail: formVal.detail,
      price: formVal.price,
      file: formVal.uploadFile.file.originFileObj,
    }

    const res = await productService.addProduct(req).then((res) => {
      if (res.status == true) {
        getProduct()
      } else {
        message.open({ content: res.message, type: 'warning' })
      }
    }).catch((error) => {
      message.open({ content: error.message, type: 'error' })
    })
  }

  const toOpenModal = (_id: number, type: string) => {
    setModalStatus(type)
    setModalCategory(_id)
    setOpen(true)
  }

  const toCloseModal = () => {
    setModalCategory(null)
    setOpen(false)
  }

  const deleteProduct = async (cate_id: number, prod_id: number) => {
    setLoading(true)
    const req = {
      cate_id: cate_id,
      product_id: prod_id,
    }

    const res = await productService.deleteProduct(req).then((res) => {
      if (res.status == true) {
        getProduct()
      } else {
        message.open({ content: res.message, type: 'warning' })
      }
    }).catch((error) => {
      message.open({ content: error.message, type: 'error' })
    }).finally(() => {
      setLoading(false)
    })
  }

  const createCategory = async (formVal: any) => {
      setOpenCate(false)
      const req = {
        title_th: formVal.title_th,
        title_en: formVal.title_en
      }

      const res = await productService.createCategory(req).then((res) => {
        if (res.status == true) {
          getProduct()
        } else {
          message.open({ content: res.message, type: 'warning' })
        }
      }).catch((error) => {
        message.open({ content: error.message, type: 'error' })
      })
  }

  const removeCategory = async (cate_id: number) => {
    const req = {
      cate_id: cate_id,
    }

    const res = await productService.removeCategory(req).then((res) => {
      if (res.status == true) {
        getProduct()
      } else {
        message.open({ content: res.message, type: 'warning' })
      }
    }).catch((error) => {
      message.open({ content: error.message, type: 'error' })
    })
  }

  function getBase64Image(buffer: Buffer, contentType: string) {
    const base64String = Buffer.from(buffer).toString('base64');
    return `data:${contentType};base64,${base64String}`;
  }

  return (<>
    <main className={styles.home_page}>
      <div className={styles.title} />
      <div style={{ padding: '60px', background: '#fff' }}>

        {adminContent.map((element, i) => (
          <Row gutter={[32, 32]} justify='center' key={i}>
            <Col xs={24} sm={22} md={20}>
              <Row justify='space-between'>
                <Title level={3}> {element.title_th} </Title>
                <DeleteOutlined key="delete" onClick={() => removeCategory(element.id)} style={{ color: 'red' }}/>
              </Row>
            </Col>
            <Col xs={24} sm={22} md={20}>

              <Row justify='start' align='middle' gutter={[24, 24]} style={{ width: '100%' }}>

                {element.product_list.map((sub, subi) => {
                  const img = getBase64Image(sub.file_blob, sub.file_type)
                  return (
                    <>
                      <Col lg={8} md={12} sm={16} xs={20} key={`${subi}-${i}`}>
                        <Card
                          actions={[
                            <EditOutlined key="edit" />,
                            <DeleteOutlined key="delete" onClick={() => deleteProduct(element.id, sub.id)} />
                          ]}
                          cover={
                            <Image src={img} alt=''
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: '100%', height: 'auto' }}
                            />
                          }
                          style={{ width: '100%', minHeight: '250px', padding: '0px' }}>

                          <Title level={4}>
                            {sub.name}
                          </Title>

                          <span style={{ color: '#e21c23', fontSize: '18px', fontWeight: '700' }}>
                            {sub.price}
                          </span>
                        </Card>
                      </Col>
                    </>
                  )
                })}

                <Col lg={8} md={12} sm={16} xs={20}>
                  <Button
                    type='dashed'
                    icon={<PlusOutlined />}
                    style={{ height: '250px', width: '100%' }}
                    onClick={() => toOpenModal(element.id, 'create')}
                  >
                    เพิ่ม
                  </Button>
                </Col>
              </Row>
            </Col>
            <Divider />
          </Row>
        ))}

        <Row justify='center'>
          <Button type='dashed' icon={<PlusOutlined />} onClick={() => setOpenCate(true)} style={{ width: '100%', height: '60px'}}>
            เพิ่มหมวดหมู่
          </Button>
        </Row>
      </div>
    </main>

    <Modal
      open={open}
      title={`เพิ่ม ${categoryName}`}
      okText="Create"
      cancelText="Cancel"
      onCancel={() => toCloseModal()}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({ category_id: modalCategory, ...values });
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item name='uploadFile'>
          <Upload
            listType="picture-card"
            maxCount={1}
          >
            <Button type='dashed' icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="product_name"
          label="หัวข้อ"
          rules={[{ required: true, message: 'Please input the title' }]}
        >
          <Input placeholder='ระบุหัวข้อ' />
        </Form.Item>

        <Form.Item name="detail" label="รายละเอียด">
          <Input.TextArea rows={4} placeholder='ระบุรายละเอียด' />
        </Form.Item>

        <Form.Item name="price" label="รายละเอียด" initialValue={100}>
          <InputNumber min={10} />
        </Form.Item>
      </Form>
    </Modal>

    <Modal
      open={openCate}
      title={`เพิ่มหมวดหมู่`}
      okText="Create"
      cancelText="Cancel"
      onCancel={() => setOpenCate(false)}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            createCategory(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >

        <Form.Item
          name="title_th"
          label="หัวข้อภาษาไทย"
          rules={[{ required: true, message: 'Please input the title' }]}
        >
          <Input placeholder='ระบุหัวข้อ' />
        </Form.Item>

        <Form.Item
          name="title_en"
          label="หัวข้อภาษาอังกฤษ"
          rules={[{ required: true, message: 'Please input the title' }]}
        >
          <Input placeholder='ระบุหัวข้อ' />
        </Form.Item>

      </Form>
    </Modal>
  </>
  )
}