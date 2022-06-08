import { ReactNode, createContext, useState } from 'react';
import { notification } from 'antd';

import IPagination from 'constants/Pagination';
import apiCaller from 'utils/apiCaller';

const endpoint = '/report';
const tokenItemName = process.env.REACT_APP_TOKEN_ITEM_NAME ?? 'access_token';

type StateType = {
  state: {
    data: IReport[];
    page: number;
    total: number;
  };
  get: Function;
  create: Function;
  update: Function;
};

const initialState: StateType = {
  state: {
    data: [],
    page: 1,
    total: 0,
  },
  get: () => {},
  create: () => {},
  update: () => {},
};

export interface IReport {
  guid: string;
  first_Name: string;
  last_Name: string;
  email: string;
  phone: string;
  address: string;
}

export const ReportContext = createContext(initialState);

export interface IReportResponse {
  status: boolean;
  message?: string;
  data?: IReport[] | IReport;
  total?: number;
}

interface IQuery extends Partial<IReport>, IPagination {}

export const ReportProvider = (props: { children?: ReactNode }) => {
  const [data, setData] = useState<IReport[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const accessToken = sessionStorage.getItem(tokenItemName);

  const mockDataLength = 3;
  const mockData: IReportResponse = {
    data: [
      {
        guid: '1',
        first_Name: 'First Name 1',
        last_Name: 'Last Name 1',
        email: '1@email.com',
        phone: '+84000001',
        address: '1 Road ABC',
      },
      {
        guid: '2',
        first_Name: 'First Name 2',
        last_Name: 'Last Name 2',
        email: '2@email.com',
        phone: '+84000002',
        address: '2 Road ABC',
      },
      {
        guid: '3',
        first_Name: 'First Name 3',
        last_Name: 'Last Name 3',
        email: '3@email.com',
        phone: '+84000003',
        address: '3 Road ABC',
      },
    ],
    total: mockDataLength,
    status: true,
    message: 'Successfully!',
  };

  const get = async (payload: IQuery): Promise<void> => {
    try {
      // const response = await apiCaller(endpoint, {
      //   method: 'GET',
      //   params: payload,
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });

      // const {data, total, status, message}: IReportResponse = await response.data;
      const { data, total, status, message }: IReportResponse = mockData;

      if (status) {
        if (data && data.constructor === Array) {
          setData(data);
          setTotal(total ?? 0);
          setPage(page ?? 1);
        }
      } else {
        throw new Error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification.error({
        message: 'Get list of Reports',
        description: err.message ?? err,
      });
    }
  };

  const create = async (payload: IReport) => {
    try {
      const response = await apiCaller(endpoint, {
        method: 'POST',
        data: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { status, message } = await response.data;

      if (status) {
        notification.success({
          message: 'Create a report',
          description: message ?? 'Successfully!',
        });
        get({ page });
      } else {
        throw new Error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification.error({
        message: 'Create a report',
        description: err.message ?? err,
      });
    }
  };

  const update = async (guid: string, payload: IReport) => {
    try {
      const response = await apiCaller(`${endpoint}/${guid}`, {
        method: 'PUT',
        data: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { status, message } = await response.data;

      if (status) {
        notification.success({
          message: 'Update a report',
          description: message ?? 'Successfully!',
        });
        get({ page });
      } else {
        throw new Error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification.error({
        message: 'Update a report',
        description: err.message ?? err,
      });
    }
  };

  return (
    <ReportContext.Provider
      value={{
        state: {
          data,
          page,
          total,
        },
        get,
        create,
        update,
      }}
    >
      {props.children}
    </ReportContext.Provider>
  );
};
