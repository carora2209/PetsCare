import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="row about-us" style={{ minHeight: "80vh" }}>
        <div className="col-md-6 about-image">
          <img
            src="/images/about.jpeg"
            alt="about us"
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="about-us-heading text-center">About PetsCare</h2>
          <ul className="about-us-list">
            <li className="about-us-item">
              <p className="about-us-text">
                Welcome to PetsCare, your <span className="highlight">one-stop shop</span> for all your pet needs. We are passionate about providing high-quality products and services to ensure the well-being of your beloved pets.
              </p>
            </li>
            <li className="about-us-item">
              <p className="about-us-text">
                At PetsCare, we understand the unique bond between pets and their owners. That's why we strive to offer a wide range of products including food, toys, accessories, and more, to cater to the diverse needs of different pets.
              </p>
            </li>
            <li className="about-us-item">
              <p className="about-us-text">
                Our dedicated team of pet enthusiasts is always here to assist you in finding the perfect products for your furry friends. We prioritize quality, affordability, and customer satisfaction, making PetsCare the ideal destination for all pet lovers.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default About;
