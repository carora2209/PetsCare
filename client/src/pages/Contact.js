import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contact.jpg"
            alt="contact"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6" >
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            At Petcare, we value your satisfaction and aim to provide exceptional customer service. Whether you have questions about our products, require guidance on pet care, or need assistance with an order, our dedicated team is here to assist you.
          </p>
          <p className="mt-3">
            <BiMailSend /> : support@petscare.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 99999999
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
