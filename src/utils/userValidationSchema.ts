import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    userName: Yup.string().required('Username is required'),
    email: Yup.string().email('Email must be a valid email').required('Email is required'),
    city: Yup.string().required('City is required')
  });