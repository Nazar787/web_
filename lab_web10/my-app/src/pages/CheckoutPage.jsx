import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage'; 
import styles from './CheckoutPage.module.css';

function CheckoutPage() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[a-zA-Zа-яА-ЯґҐєЄіІїЇ]+$/, "Only letters allowed")
      .max(15, 'Must be 15 characters or less') 
      .required('First name is required'),      

    lastName: Yup.string()
      .matches(/^[a-zA-Zа-яА-ЯґҐєЄіІїЇ]+$/, "Only letters allowed")
      .max(20, 'Must be 20 characters or less')
      .required('Last name is required'),

    email: Yup.string()
      .email('Invalid email address') 
      .required('Email is required'),

    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be digits only") 
      .min(10, 'Phone must be at least 10 digits')
      .required('Phone is required'),

    address: Yup.string()
      .min(10, 'Address is too short')
      .required('Address is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Order data:', values);
      navigate('/success'); 
    },
  });

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.title}>Checkout</h1>
      
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            value={formik.values.firstName}
            className={formik.touched.firstName && formik.errors.firstName ? styles.inputError : ''}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <ErrorMessage message={formik.errors.firstName} />
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className={formik.touched.lastName && formik.errors.lastName ? styles.inputError : ''}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <ErrorMessage message={formik.errors.lastName} />
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? styles.inputError : ''}
          />
          {formik.touched.email && formik.errors.email ? (
             <ErrorMessage message={formik.errors.email} />
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={formik.touched.phone && formik.errors.phone ? styles.inputError : ''}
          />
          {formik.touched.phone && formik.errors.phone ? (
             <ErrorMessage message={formik.errors.phone} />
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className={formik.touched.address && formik.errors.address ? styles.inputError : ''}
          />
          {formik.touched.address && formik.errors.address ? (
             <ErrorMessage message={formik.errors.address} />
          ) : null}
        </div>

        {formik.submitCount > 0 && !formik.isValid && (
        <div className={styles.globalError}>
          <p>Oh snap! Change a few things up and try submitting again.</p>
          <span className={styles.closeIcon}>×</span> 
        </div>
        )}

        <div className={styles.buttonGroup}>
          <Button type="button" onClick={() => navigate('/cart')} className={styles.backBtn}>
             Go Back
          </Button>
          
          <Button type="submit" className={styles.submitBtn}>
             Continue
          </Button>
        </div>

      </form>
    </div>
  );
}

export default CheckoutPage;