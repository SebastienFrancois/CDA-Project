import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const useValidator = () => {
  const [t] = useTranslation();

  const schemas: { [key: string]: yup.AnyObjectSchema } = {
    login: yup.object().shape({
      username: yup.string().email(t('error:valid_email')).required(t('error:required_email')),
      password: yup.string().required(t('error:required_password')),
    }),
    add_bike: yup.object().shape({
      name: yup.string().max(30).required(),
      tracker: yup.string().min(5).required(),
      bicycode: yup.string().min(8).max(14).required(),
      brand: yup.string(),
      model: yup.string(),
      color: yup.string(),
      purchased_date: yup.date(),
      price: yup.number().min(7000).required(),
      price_accessory: yup.number(),
      name_accessory: yup.string().max(30),
      picture: yup
        .mixed()
        .required("Le vélo doit être accompagner d'une photo")
        .test('file', "Le vélo doit être accompagner d'une photo", (value) => {
          return value && value[0];
        }),
    }),
  };

  const validate = (schemaRef: string) => {
    return schemas[schemaRef];
  };

  return { validate };
};

export default useValidator;
