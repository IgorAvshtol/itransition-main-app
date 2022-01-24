import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { Formik, Form, FormikHelpers } from 'formik';

import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';
import { SuccessModal } from '../Alert/SuccessModal';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';

import { editPublication } from '../../store/collections/collectionsThunk';
import { AppRootStateType } from '../../store/store';
import { IconContent } from './Item/IconContent';
import { ICurrentUserPublications, IUpdateData } from '../../store/collections/collectionsTypes';

const useStyles = makeStyles({
  container: {
    paddingTop: '60px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  containerResponse: {
    paddingTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainImage: {
    maxWidth: '300px',
  },
  descriptionsBlock: {
    width: '60%',
    maxWidth: '900px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  iconsBlock: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '20px',
    textAlign: 'center'
  }
});

type PublicationType = {
  publication: ICurrentUserPublications;
}
export const Publication = ({ publication }: PublicationType) => {

  const { t } = useTranslation();

  const classes = useStyles();
  const smallQuery = useMediaQuery('(max-width:777px)');

  const [editMode, setEditMode] = useState<boolean>(false);

  const dispatch = useDispatch();

  // @ts-ignore
  const sections = useSelector<AppRootStateType, string[]>(state => state.collection.sections);

  const validationSchema = yup.object().shape({
    author: yup.string().required(t('validation.field')),
    description: yup.string().required(t('validation.field')),
    pages: yup.number().typeError(t('validation.pages_field')).required(t('validation.field')),
  });

  const onEditOnButtonClick = (id: string) => {
    setEditMode(true)
  };

  const onEditOffButtonClick = (id: string) => {
    setEditMode(false)
  };

  return (
      <div>
        <Formik
            initialValues={{
              author: publication.authors,
              description: publication.description,
              pages: publication.pages,
              section: publication.section
            }}
            validationSchema={validationSchema}
            onSubmit={(
                values: IUpdateData,
                { setSubmitting }: FormikHelpers<IUpdateData>
            ) => {
              dispatch(editPublication(publication.id, values));
            }}
        >
          {({
              values, errors, touched, handleChange,
              handleBlur
            }) => (
              <Form>
                <Box className={smallQuery ? classes.containerResponse : classes.container}>
                  <img src={publication.imageURL} className={classes.mainImage} alt="book-cover"/>
                  <Box className={classes.descriptionsBlock}>
                    <Box className={classes.iconsBlock}>
                      <IconContent
                          book={publication}
                          edit={editMode}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          values={values}
                          touched={touched}
                          errors={errors}
                          sections={sections}
                      />
                    </Box>
                    <Box className={classes.description}>
                      {
                        editMode
                            ? <div>
                              <TextField
                                  style={{ marginTop: 10 }}
                                  name="description"
                                  label={t('form.description')}
                                  multiline
                                  fullWidth
                                  rows={8}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.description}
                              />
                              {touched.description && errors.description && <p>{errors.description}</p>}
                            </div>
                            : <Typography gutterBottom component="div">
                              {publication.description}
                            </Typography>
                      }
                      <div>
                        {
                          editMode
                              ? <EditOffIcon sx={{ paddingTop: '10px' }} fontSize={'large'}
                                             onClick={() => onEditOffButtonClick(publication.id)}/>
                              : <EditIcon sx={{ paddingTop: '10px' }} fontSize={'large'}
                                          onClick={() => onEditOnButtonClick(publication.id)}/>
                        }
                      </div>
                      <div style={{ marginTop: 10 }}>
                        {
                          editMode
                              ? <Button type={'submit'} variant="contained">
                                {t('publications.apply_changes')}
                              </Button>
                              : null
                        }
                      </div>
                    </Box>
                  </Box>
                </Box>
              </Form>
          )
          }
        </Formik>
        <SuccessModal/>
      </div>
  );
};