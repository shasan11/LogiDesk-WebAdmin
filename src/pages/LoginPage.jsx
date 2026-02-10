import { Alert, Button, Form, Input, Typography } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearStatus, login, selectAuth } from '../features/auth/authSlice';
import AuthLayout from '../components/AuthLayout';

const schema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector(selectAuth);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: async (values) => {
      const result = await dispatch(login(values));

      if (login.fulfilled.match(result)) {
        const fallbackPath = '/dashboard';
        const redirectPath = location.state?.from?.pathname || fallbackPath;
        navigate(redirectPath, { replace: true });
      }
    },
  });

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in with your Django Djoser account">
      {error && (
        <Alert
          style={{ marginBottom: 16 }}
          type="error"
          showIcon
          message={error}
          closable
          onClose={() => dispatch(clearStatus())}
        />
      )}
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item
          label="Email"
          validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
          help={formik.touched.email && formik.errors.email}
        >
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="admin@example.com"
            autoComplete="email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
          help={formik.touched.password && formik.errors.password}
        >
          <Input.Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form>
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Text type="secondary">Need help?</Typography.Text>
        <Link to="/forgot-password">Forgot password</Link>
      </div>
    </AuthLayout>
  );
}
