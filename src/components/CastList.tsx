import React, {useMemo, useState} from 'react';
import {Avatar, Typography, Row, Col, Tabs} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import type  {CreditsResponse, CastMember, CrewMember} from '@/hooks/useMovies';

const {Text} = Typography;

export interface CastListProps {
  credit: CreditsResponse;
}

const CastList: React.FC<CastListProps> = ({credit}) => {
  const [activeTab, setActiveTab] = useState(
    credit?.cast[0]?.known_for_department || '',
  );

  const groupedCast = useMemo(() => {
    return [...credit.cast, ...credit.crew].reduce((acc: Record<string, (CastMember | CrewMember)[]>, member: CastMember | CrewMember) => {
      const department = member.known_for_department;
      if (!acc[department]) {
        acc[department] = [];
      }

      acc[department].push(member);

      return acc;
    }, {});
  }, [credit]);

  const tabsItems = useMemo(() => (
    Object.keys(groupedCast).map(department => ({
      key: department,
      label: department,
      children: (
        <Row gutter={[20, 10]}>
          {
            groupedCast[department].map((item: CastMember | CrewMember) => (
              <Col>
                {
                  item.profile_path ? (
                    <Avatar
                      src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                      alt={item.name}
                      size="default"
                    />
                  ) : (
                    <Avatar
                      icon={<UserOutlined />}
                      size="default"
                    >
                      {item.name.charAt(0).toUpperCase()}
                    </Avatar>
                  )
                }
                <Text strong style={{paddingLeft: 10}}>{item.name}</Text>
              </Col>
            ))
          }
        </Row>
      ),
    }))
  ), [groupedCast]);

  return (
    <Tabs
      activeKey={activeTab}
      items={tabsItems}
      onTabClick={setActiveTab}
    />
  );
};

export default CastList;
