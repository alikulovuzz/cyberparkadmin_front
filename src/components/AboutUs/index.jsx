import React from 'react'
import './contact.css'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function AboutUs() {
    return (<>
        <div className="main-panel">
            <div className="content-wrapper">
                <div claclassNamess="row">
                    <div className="col-lg-12 grid-margin">
                        <section className="content-header">
                            <h3>
                                Aloqa ma'lumotlari
                            </h3>
                        </section>
                        <div className="col-lg-12 grid-margin">
                            <section className="content">
                                <div claclassNames="row">
                                    <div className="col-md-12">
                                        <div className="box box-info">
                                            <div className="box-body">
                                                <div className="contact-map">
                                                    <iframe width="100%" height="400" frameborder="0" scrolling="no"
                                                        marginheight="0" marginwidth="0"
                                                        src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=%D0%B3.%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82,%20%D0%9C%D0%B8%D1%80%D0%B0%D0%B1%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B9%20%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%B0,%20%D1%83%D0%BB.%D0%A2%D0%B0%D1%80%D0%B0%D1%81%D0%B0%20%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE%2020+(My%20Business%20Name)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                                                        <a href="https://www.maps.ie/distance-area-calculator.html">area
                                                            maps</a></iframe>
                                                </div>

                                                <div clasclassNames="contact-block">
                                                    <h4>Biz bilan qanday bog'lanish mumkin?</h4>
                                                    <div className="contact-block-inner">
                                                        <a
                                                            href="https://www.google.com/maps/place/20+Taras+Shevchenko+Street,+Tashkent+100060,+Uzbekistan/@41.301838,69.273552,16z/data=!4m6!3m5!1s0x38ae8ad990a8ad9d:0x92bfd61374a0d9e6!8m2!3d41.3018379!4d69.2735521!16s%2Fg%2F11k6bmzcrz?hl=en">
                                                            <div className="custom-contact">
                                                                <div className="custom-circle">
                                                                    <div className="custom-circle-mini">
                                                                        < AddLocationAltIcon/>
                                                                    </div>
                                                                </div>
                                                                <div className="contact-info-title">
                                                                    <h5>Manzil</h5>
                                                                    <p>Toshkent shahri, Mirobod tumani,
                                                                        Taras Shevchenko 20</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a href="tel: +998990288988">
                                                            <div className="custom-contact">
                                                                <div className="custom-circle">
                                                                    <div className="custom-circle-mini">
                                                                        <PhoneInTalkIcon/>
                                                                    </div>
                                                                </div>
                                                                <div className="contact-info-title">
                                                                    <h5>Telefon raqam</h5>
                                                                    <p>+998 95 506 00 99</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a href="info@cyberscience.uz">
                                                            <div className="custom-contact">
                                                                <div className="custom-circle">
                                                                    <div className="custom-circle-mini">
                                                                        <AlternateEmailIcon/>
                                                                    </div> 
                                                                </div>
                                                                <div className="contact-info-title">
                                                                    <h5>Elektron pochta</h5>
                                                                    <p>info@cyberpark.uz</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="contact-block">
                                                    <h4>Biz ijtimoiy tarmoqlarda</h4>
                                                    <div className="social-links-contact">
                                                        <a href="https://t.me/cyberparkuz">
                                                            <div className="custom-contact">
                                                                <div className="custom-circle">
                                                                    <div className="custom-circle-mini">
                                                                        <TelegramIcon/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a href="https://www.instagram.com/cyberpark.uz/">
                                                            <div className="custom-contact">
                                                                    <div className="custom-circle">
                                                                    <div className="custom-circle-mini">
                                                                       <InstagramIcon/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a href="https://www.facebook.com/cyberpark.uz">
                                                            <div className="custom-contact">
                                                                <div className="custom-circle">
                                                                    <div className="custom-circle-mini">
                                                                        <FacebookIcon/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a href="https://www.youtube.com/@cyberparkit">
                                                            <div className="custom-contact">
                                                                <div className="custom-circle">
                                                                    <div className="custom-circle-mini">
                                                                       <YouTubeIcon/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>)
}