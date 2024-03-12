import * as yup from 'yup';

// export const NameValidtion = yup.object().shape({

// })
export const NameValidtion = yup.object().shape({
  name: yup
    .string()
    .matches(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/, 'Full Name is Required')
    .required(),
});

export const EmailandPhoneSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  phone: yup
    .string()
    .required('Phone Number is required'),
});

export const LoginSchema = yup.object().shape({
  phone: yup
    .string()
    // .min(10, 'Phone must be at  10 characters`')
    // .max(11, 'Phone must be at  11 characters`')
    .required('Phone Number is required'),
  password: yup.string().required('Please enter your password.'),
});

export const PasswordSchema = yup.object({
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Your password is too short.'),
  confirmPassword: yup
    .string()
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
});

export const OtpSchema = yup.object({
  password: yup
    .string()
    .length(6, 'This field has to be exactly 6 characters!'),
});

export const ItemSchema = yup.object({
  name: yup.string().required('Please enter your password.'),
  description: yup.string().required('Please retype your password.'),
  state: yup.string().required('Please retype your password.'),
  address: yup.string().required('Please retype your password.'),
  area: yup.string().required('Please retype your password.'),
  condition: yup.string().required('Please retype your password.'),
});

export const ForgotPasswordValidation = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
});
