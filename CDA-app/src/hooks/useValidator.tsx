import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const useValidator = () => {
  const [t] = useTranslation();

  const schemas: { [key: string]: yup.AnyObjectSchema } = {};

  const validate = (schemaRef: string) => {
    return schemas[schemaRef];
  };

  return { validate };
};

export default useValidator;
