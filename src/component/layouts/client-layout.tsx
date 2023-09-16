import React from 'react'
import Image from 'next/image'
import Logo from '@/_files/swensens1112.png'
import LogoFoot from '@/_files/swensens1112red.png'
import Contracts from '@/_files/contracts.png'
import styles from '@/styles/Layout.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function ClientLayoutComponent({ children }: { children: React.ReactNode; }) {
  
  return ( 
  <>
    <div className={styles.fixed_to_top}>
      <div className={styles.navigation}>
        <Image src={Logo} alt='logo' style={{ cursor: 'pointer'}}/>

        <div className={styles.action_navigation}>
          <div className={styles.address}>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>&nbsp; กรุณาเลือกที่อยู่จัดส่ง</span>
          </div>
          
          <button className={styles.register_button}>สมัครสมาชิก</button>
          <button className={styles.login_button}>เข้าสู่ระบบ</button>

          <div className={styles.language}>
            <span>TH</span>
          </div>
        </div>
      </div>
    </div>
    <div style={{ height: '72px', width: '100%'}}/>

      { children }
    <footer className={styles.footer}>
      <div className={styles.foot_first_row}>
        <Image src={LogoFoot} alt='logo'/>
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
        <Image src={Contracts} alt='contracts..' style={{ pointerEvents: 'none' }}/>
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
