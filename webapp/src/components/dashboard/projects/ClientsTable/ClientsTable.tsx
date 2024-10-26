import {Table, TableProps, Typography} from 'antd';
import {Clients} from '../../../../types';
import {UserAvatar} from '../../../index';

const COLUMNS = [
  {
    title: 'Client Name',
    dataIndex: 'client_name',
    key: 'c_name',
    render: (_: any, { first_name, last_name }: Clients) => (
      <UserAvatar fullName={`${first_name} ${last_name}`} />
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'total_price',
    key: 'client_amount',
    render: (_: any) => <Typography.Text>${_}</Typography.Text>,
  },
];

type Props = {
  data: Clients[];
} & TableProps<any>;

export const ClientsTable = ({ data, ...others }: Props) => (
  <Table
    dataSource={data}
    columns={COLUMNS}
    key="client_table"
    size="middle"
    className="overflow-scroll"
    {...others}
  />
);
