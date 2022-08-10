import React, { useState } from 'react'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField
} from 'formik'
import { useFormik } from 'formik'

const initialValues = {
  name: 'Thy',
  email: '',
  address: ''
}

const onSubmit = (values, submitProps) => {
  console.log('Form data', values)
  console.log('submitProps', submitProps)
  submitProps.setSubmitting(false)
  submitProps.resetForm()
}

const validateAddress = value => {
    let error
    if (!value) {
      error = 'Required'
    }
    return error
  }

const validateEmail = value => {
    let error
    if (!value) {
      error = 'Required'
    }
    return error
}

function FormikForm () {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validate: values => {
        let errors = {}

        if(!values.name) {
            errors.name = 'Required name'
        }

        if(!values.email) {
            errors.address = 'Required email'
        }

        if(!values.address) {
            errors.address = 'Required address'
        }

        return errors
    }
  })
  const [formValues, setFormValues] = useState(null)
  return (
    <Formik
      initialValues={formValues || initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    //   validate={formik.validate}
    //   validationSchema={validationSchema}
    >
        {formik => {
        console.log('Formik props', formik)
        return (
          <Form>
            <div className='form-control'>
              <label htmlFor='name'>Name</label>
              <Field type='text' id='name' name='name' />
            </div>

            <div className='form-control'>
              <label htmlFor='email'>Email</label>
              <Field type='email' id='email' name='email' validate={validateEmail} />
              <ErrorMessage name='email'>
                {error => <div className='error'>{error}</div>}
              </ErrorMessage>
            </div>

            <div className='form-control'>
              <label htmlFor='address'>Address</label>
              <Field type='address' id='address' name='address' validate={validateAddress}/>
              <ErrorMessage name='address'>
                {error => <div className='error'>{error}</div>}
              </ErrorMessage>
            </div>
           
            <button type='submit'>
              Submit
            </button>
          </Form>
        )
    }}
    </Formik>
  )
}

export default FormikForm