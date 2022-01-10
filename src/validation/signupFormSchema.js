import * as yup from 'yup';

//describe the perfect formValues object to yup
const signupFormSchema = yup.object().shape({
    username: yup.string().required('enter a username'),    
    password: yup.string().required().min(2, 'password must be at least 4 characters'),
    phone_number: yup.string().required('pls enter phone #'),
})

export default signupFormSchema;   

