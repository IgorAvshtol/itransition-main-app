import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

export const AAA = () => {

  const validationSchema = yup.object().shape({
    name: yup.number().typeError('Должно быть строкой').required('Обязательно')
  });

  return (
      <div>
        <h1>Signup</h1>
        <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
        >
          <Form>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="name" placeholder="John" />

            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Doe" />

            <label htmlFor="email">Email</label>
            <Field
                id="email"
                name="email"
                placeholder="john@acme.com"
                type="email"
            />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
  );
};
