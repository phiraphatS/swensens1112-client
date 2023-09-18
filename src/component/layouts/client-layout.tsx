import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '@/_files/swensens1112.png'
import LogoFoot from '@/_files/swensens1112red.png'
import QrCode from '@/_files/qrcode.png'
import Contracts from '@/_files/contracts.png'
import styles from '@/styles/Layout.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { userService } from '@/_services/user.service'
import { CreditCardOutlined, FileTextOutlined, FormOutlined, HeartOutlined, InboxOutlined, MenuOutlined, ShoppingOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Drawer, Menu, Typography } from 'antd'
import { useRouter } from 'next/router'
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems'

const { Text } = Typography
const drawerItem: ItemType<MenuItemType>[] = [
  {
    label: 'ข้อความ',
    key: 'message',
    icon: <InboxOutlined />
  },
  {
    label: 'ออร์เดอร์',
    key: 'order',
    icon: <FileTextOutlined />
  },
  {
    label: 'สิทธิพิเศษ',
    key: 'promotion',
    icon: <StarOutlined />
  },
  {
    label: 'บัตรสเวนเซ่นส์การ์ด',
    key: 'sw_card',
    icon: <CreditCardOutlined />
  },
  {
    label: 'ข้อมูลของฉัน',
    key: 'my_information',
    icon: <UserOutlined />
  },
  
]

const { Title } = Typography
export default function ClientLayoutComponent({ children }: { children: React.ReactNode; }) {
  const [loggedIn, setLogedIn] = useState<boolean>(false)
  const [userFullName, setUserFullName] = useState('')
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const userValue = userService.currentUserValue;
    if (userValue) {
      setLogedIn(true)
      setUserFullName(`${userValue.first_name} ${userValue.last_name}`)
    }
  }, [])

  const logOut = () => {
    userService.logout()
    window.location.href = '/'
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        closable={false}
        footer={
          <Menu items={[{
            label: (
              <Text onClick={() => logOut()}> ออกจากระบบ </Text>
            ),
            key: 'logout'
          }]} mode='inline' style={{ color: '#777' }} />
        }
      >
        <div style={{ padding: '24px' }}>
          <Title level={3} style={{ fontWeight: '500', marginBottom: '0px' }}>
            ยินดีต้อนรับ ☺ 🍨️
          </Title>

          <span style={{ color: '#e21c23', fontSize: '20px' }}>
            {userFullName}
          </span>
        </div>
        <Menu items={
        [...drawerItem,
        {
          label: <Text onClick={() => router.push('/admin')}>เข้าสู่หน้า Admin</Text>,
          key: 'admin',
          icon: <FormOutlined />
        },
        ]} mode='inline' style={{ color: '#777' }} />
      </Drawer>

      <div className={styles.fixed_to_top}>
        <div className={styles.navigation}>
          <Image src={Logo} alt='logo' style={{ cursor: 'pointer' }} />
          <div className={styles.action_navigation}>
            <div className={styles.address}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>&nbsp; กรุณาเลือกที่อยู่จัดส่ง</span>
            </div>

            {loggedIn && (<>
              <button className={styles.qrcode_button}>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image src={QrCode} alt='qrcode' style={{ cursor: 'pointer' }} width={30} height={30} />
                  สแกน
                </span>
              </button>

              <div style={{ display: 'inherit', flexDirection: 'inherit', height: '100%' }}>
                <div className={styles.menu_icon}>
                  <ShoppingOutlined style={{ fontSize: '25px' }} />
                </div>
                <div className={styles.menu_icon}>
                  <HeartOutlined style={{ fontSize: '25px' }} />
                </div>
                <div className={styles.menu_icon}>
                  <InboxOutlined style={{ fontSize: '25px' }} />
                </div>

                <div className={styles.menu_icon} style={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
                  <MenuOutlined style={{ fontSize: '25px' }} />
                </div>
                {/* <div className={styles.menu_icon}>
                  <Button type='text' onClick={() => logOut()}> Logout </Button>
                </div> */}
              </div>
            </>)}
            {!loggedIn && (<>

              <button className={styles.register_button}
                onClick={() => router.push('/auth/register')}
              >สมัครสมาชิก</button>
              <button className={styles.login_button}
                onClick={() => router.push('/auth/login')}
              >เข้าสู่ระบบ</button>

              <div className={styles.language}>
                <span>TH</span>
              </div>
            </>)}

          </div>
        </div>
      </div>
      <div style={{ height: '72px', width: '100%' }} />

      {children}
      <footer className={styles.footer}>
        <div className={styles.foot_first_row}>
          <Image src={LogoFoot} alt='logo' />
          <div className={styles.action_navigation}>
            <a href="#">ไอศกรีมของเรา</a>
            <a href="#">สิทธิพิเศษ</a>
            <a href="#">รีวอร์ด</a>
            <a href="#">คูปองของฉัน</a>
            <a href="#">บัตรของขวัญ</a>
            <a href="#">บัตรสเวนเซ่นส์การ์ด</a>
            <a href="#">ข้อมูลของฉัน</a>
          </div>
        </div>
        <div className={styles.foot_second_row}>
          <Image src={Contracts} alt='contracts..' style={{ pointerEvents: 'none' }} />
          <div className={styles.action_navigation}>
            <a href="#">คำถามที่พบบ่อย</a>
            <a href="#">ข้อกำหนดการใช้งาน</a>
            <a href="#">นโยบายความเป็นส่วนตัว</a>
          </div>
        </div>
      </footer>
    </>
  )


}
