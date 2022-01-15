import * as React from 'react';
import * as yup from 'yup';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { Box, Button, Container, Input, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setCollection } from '../../store/collections/collectionsThunk';
import { Success } from '../Alert/Success';
import { actions } from '../../store/alert/alertActions';

interface Values {
  author: string;
  description: string;
  file: any;
  pages: string;
  section: string;
}

export const ItemForm = () => {

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    author: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
    description: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    pages: yup.number().typeError('Должно быть строкой').required('Обязательно'),
  });

  const selections = [
    'История',
    'Биография',
    'Фантастика',
    'Комедия',
    'Научное',
    'История',
    'Эксклюзив'
  ];

  const hhh = () =>{
    dispatch(actions.setSuccess(true))
  }

  return (
      <div>
        <h1>Signup</h1>
        <Formik
            initialValues={{
              author: '',
              description: '',
              file: '',
              pages: '',
              section: ''
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
              dispatch(setCollection(values))
            }}
        >
          {({
              values, errors, touched, handleChange,
              handleBlur, setFieldValue
            }) => (
              <Form>
                <Container fixed
                           style={{ height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box sx={{
                    padding: '30px',
                    backgroundColor: '#f3e9e9',
                    borderRadius: 10,
                    textAlign: 'center'
                  }}>
                    <div>
                      <TextField
                          style={{ marginTop: 10 }}
                          name="author"
                          label={t('form.authors')}
                          variant="filled"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.author}
                      />
                      {touched.author && errors.author && <p>{errors.author}</p>}
                    </div>
                    <div>
                      <TextField
                          style={{ marginTop: 10 }}
                          name="description"
                          label={t('form.description')}
                          multiline
                          rows={4}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                      />
                      {touched.description && errors.description && <p>{errors.description}</p>}
                    </div>
                    <div>
                      <TextField
                          style={{ marginTop: 10 }}
                          type={'file'}
                          name="image"
                          // label={t('form.image')}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            if (event.target.files !== null) {
                              const file = event.target.files[0];
                              setFieldValue('file', file);
                            }
                          }}
                          value={undefined}
                      />
                    </div>
                    <div>
                      <TextField
                          style={{ marginTop: 10 }}
                          name="pages"
                          label={t('form.pages')}
                          variant="filled"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pages}
                      />
                      {touched.pages && errors.pages && <p>{errors.pages}</p>}
                    </div>
                    <Select style={{ marginTop: 10 }} name="section" value={values.section}
                            onChange={handleChange}
                    >
                      {
                        selections.map(select => {
                          return (
                              <MenuItem value={select}>{select}</MenuItem>
                          );
                        })
                      }
                    </Select>
                    <div style={{ marginTop: 10 }}>
                      <Button type={'submit'} variant="contained">
                        BUTTON
                      </Button>
                    </div>
                  </Box>

                </Container>
              </Form>
          )

          }

        </Formik>
        <button onClick={hhh}>aaxaxa</button>
        <Success/>
      </div>
  );
};