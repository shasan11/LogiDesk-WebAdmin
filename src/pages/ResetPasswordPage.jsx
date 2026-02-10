import { Alert, Button, Form, Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearStatus,
  confirmPasswordReset,
  selectAuth,
} from '../features/auth/authSlice';
import AuthLayout from '../components/AuthLayout';

const schema = Yup.object({
  uid: Yup.string().required('uid is required'),
  token: Yup.string().required('token is required'),
  new_password: Yup.string().min(8, 'Minimum 8 characters').required('New password is required'),
  re_new_password: Yup.string()
    .oneOf([Yup.ref('new_password')], 'Passwords must match')
    .required('Confirm your new password'),
});

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading, error, infoMessage } = useSelector(selectAuth);

  const formik = useFormik({
    initialValues: {
      uid: searchParams.get('uid') || '',
      token: searchParams.get('token') || '',
      new_password: '',
      re_new_password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const result = await dispatch(confirmPasswordReset(values));

      if (confirmPasswordReset.fulfilled.match(result)) {
        setTimeout(() => navigate('/login', { replace: true }), 1000);
      }
    },
  });

  return (
    <AuthLayout title="Reset password" subtitle="Set your new password securely">
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
          label="UID"
          validateStatus={formik.touched.uid && formik.errors.uid ? 'error' : ''}
          help={formik.touched.uid && formik.errors.uid}
        >
          <Input name="uid" value={formik.values.uid} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </Form.Item>
        <Form.Item
          label="Token"
          validateStatus={formik.touched.token && formik.errors.token ? 'error' : ''}
          help={formik.touched.token && formik.errors.token}
        >
          <Input
            name="token"
            value={formik.values.token}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="New Password"
          validateStatus={formik.touched.new_password && formik.errors.new_password ? 'error' : ''}
          help={formik.touched.new_password && formik.errors.new_password}
        >
          <Input.Password
            name="new_password"
            value={formik.values.new_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          validateStatus={formik.touched.re_new_password && formik.errors.re_new_password ? 'error' : ''}
          help={formik.touched.re_new_password && formik.errors.re_new_password}
        >
          <Input.Password
            name="re_new_password"
            value={formik.values.re_new_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          Reset password
        </Button>
      </Form>
      <div style={{ marginTop: 16 }}>
        <Link to="/login" onClick={() => dispatch(clearStatus())}>
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
}
