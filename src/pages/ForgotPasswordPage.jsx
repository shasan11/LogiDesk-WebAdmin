import { Alert, Button, Form, Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearStatus,
  requestPasswordReset,
  selectAuth,
} from '../features/auth/authSlice';
import AuthLayout from '../components/AuthLayout';

const schema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
});

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { loading, error, infoMessage } = useSelector(selectAuth);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: schema,
    onSubmit: async (values) => {
      await dispatch(requestPasswordReset(values));
    },
  });

  return (
    <AuthLayout title="Forgot password" subtitle="Request a password reset email">
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
      {infoMessage && <Alert style={{ marginBottom: 16 }} type="success" showIcon message={infoMessage} />}
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
        <Button block type="primary" htmlType="submit" loading={loading}>
          Send reset link
        </Button>
      </Form>
      <div style={{ marginTop: 16 }}>
        <Link to="/login">Back to login</Link>
      </div>
    </AuthLayout>
  );
}
