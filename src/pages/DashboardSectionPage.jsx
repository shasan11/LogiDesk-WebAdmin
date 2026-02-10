import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function DashboardSectionPage({ title, description }) {
  return (
    <div>
      <Title level={3}>{title}</Title>
      <Paragraph style={{ marginBottom: 0 }}>
        {description || `Manage the ${title} module from this page.`}
      </Paragraph>
    </div>
  );
}
