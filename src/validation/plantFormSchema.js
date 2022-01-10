import * as yup from 'yup';

//describe the perfect formValues object to yup
const classFormSchema = yup.object().shape({
    nickname: yup.string().required('Please give your Plant a name :)'),    
    species: yup.string().required('please state your plant species').min(2, 'the species of yout plant must be at least 2 characters long'),
    water_frequency: yup.string().required('your plants need to be watered eventually!'),
})

export default classFormSchema;   
