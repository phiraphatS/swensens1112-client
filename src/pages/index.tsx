import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Page.module.scss'
import { Button, Card, Col, Divider, Menu, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { productService } from '@/_services/product.service';
import { GetStaticProps } from 'next';
import { EditOutlined, DeleteOutlined, HeartOutlined } from '@ant-design/icons';

interface adminContentInterface {
  id: number,
  title_th: string,
  title_en: string | null,
  product_list: any[]
}

const { Title, Text } = Typography
export default function Home() {
  const [menuList, setMenuList] = useState<ItemType<MenuItemType>[]>([])
  const [content, setContent] = useState<adminContentInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const res = productService.getCategory().then((res) => {
      if (res.status == true) {
        setMenuList([
          { label: <Text onClick={() => getProduct(0)}>ทั้งหมด</Text>, key: 'all' },
          ...res.results.map((item: any) => ({
            label: <Text onClick={() => getProduct(item.id)}>{item.title_th}</Text>,
            key: item.title_en
          }))
        ])

        getProduct()
      } else {
        setMenuList([])
      }
    })
  }, [])


  const getProduct = (cate_id: number | undefined = 0) => {
    setLoading(true)
    const resProduct = productService.getProduct(cate_id).then((res) => {
      if (res.status == true) {
        setContent(res.results)
      } else {
        setContent([])
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  function getBase64Image(buffer: Buffer, contentType: string) {
    const base64String = Buffer.from(buffer).toString('base64');
    return `data:${contentType};base64,${base64String}`;
  }

  return (
    <>
      <main className={styles.home_page}>
        <div className={styles.title} />

        <div className={styles.menulist}>
          <Row justify='center' style={{ width: '100%' }}>
            <Col xs={24} sm={22} md={20}>
              <Menu items={menuList} mode='horizontal' />
            </Col>

          </Row>
        </div>

        <div style={{ padding: '60px', background: '#fff' }}>

          {content.map((element, i) => (
            <Row gutter={[32, 32]} justify='center' key={i}>
              {element.product_list.length > 0 && (
                <>
                  <Col xs={24} sm={22} md={20}>
                    <Title level={3}> {element.title_th} </Title>
                  </Col>
                  <Col xs={24} sm={22} md={20}>

                    <Row justify='start' align='middle' gutter={[24, 24]} style={{ width: '100%' }}>

                      {element.product_list.map((sub, subi) => {
                        const img = getBase64Image(sub.file_blob, sub.file_type)
                        return (
                          <>
                            <Col lg={8} md={12} sm={16} xs={20} key={subi}>
                              <Card
                                actions={[
                                  <HeartOutlined key="edit" />,
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
                    </Row>
                  </Col>
                  <Divider />
                </>
              )}
            </Row>
          ))}
        </div>
      </main>
    </>
  )
}
