import {Col, Row} from 'antd';
import * as React from 'react';
import {Pie} from '../Chart';
import './OrganizationDetails.css';

interface OrganizationDetailsProps {
  data: {
    percent?: number;
  };
}

const OrganizationDetails = (props: OrganizationDetailsProps) => {
  const {data} = props;

  const percent = data.percent || 0;

  return (
    <Row gutter={8} style={{width: 138, margin: '8px 0'}}>
      <Col span={12} style={{paddingTop: 36}}>
        <Pie animate={false} color={'#8fc3ff'} inner={0.55} tooltip={false} percent={percent} height={128} />
      </Col>
    </Row>
  );
};

export default OrganizationDetails;
