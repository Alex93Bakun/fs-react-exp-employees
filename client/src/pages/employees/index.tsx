import React, { useEffect } from 'react';

import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Employee } from '@prisma/client';
import type { ColumnsType } from 'antd/es/table';
import { PlusCircleOutlined } from '@ant-design/icons';

import { Paths } from '../../paths';
import Layout from '../../components/layout';
import CustomButton from '../../components/custom-button';
import { useGetAllEmployeesQuery } from '../../app/services/employees';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';

const columns: ColumnsType<Employee> = [
    {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Адрес',
        dataIndex: 'address',
        key: 'address',
    },
];

const Employees = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const { data, isLoading } = useGetAllEmployeesQuery();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user]);

    const goToAddUser = () => navigate(Paths.employeeAdd);

    return (
        <Layout>
            <CustomButton type="primary" onClick={goToAddUser} icon={<PlusCircleOutlined />}>
                Добавить
            </CustomButton>
            <Table
                loading={isLoading}
                dataSource={data}
                pagination={false}
                columns={columns}
                rowKey={(record) => record.id}
                onRow={(record) => {
                    return {
                        onClick: () => navigate(`${Paths.employee}/${record.id}`),
                    };
                }}
            />
        </Layout>
    );
};

export default Employees;
