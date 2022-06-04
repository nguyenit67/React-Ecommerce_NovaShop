import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import LockOutlined from '@material-ui/icons/LockOutlined';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import { useAuthFormStyles } from 'components/styles';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm({ onSubmit }) {
  const classes = useAuthFormStyles();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .trim()
      .required('Please enter your full name')
      .test('has-2-words-or-more', 'Please enter at least two words', (value) => {
        console.log('fullName', value);
        return value.split(/\s+/).length >= 2;
      }),
    email: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters'),
    retypePassword: yup
      .string()
      .required('Please retype your password')
      .oneOf([yup.ref('password')], 'Password does not match'),
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    await onSubmit?.(values);
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <Typography className={classes.title} component="h3" variant="h5">
        Đăng Ký
      </Typography>

      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <InputField name="fullName" label="Họ tên" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Mật khẩu" form={form} />
        <PasswordField name="retypePassword" label="Nhập lại mật khẩu" form={form} />

        <Button
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          Tạo tài khoản
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
