import React, { useState } from 'react';

import { Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { Employee } from '@prisma/client';

import { Paths } from './../../paths';
import Layout from '../../components/layout';
import EmployeeForm from '../../components/employee-form';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/services/employees';

const EditEmployee = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const [error, setError] = useState('');
    const { data, isLoading } = useGetEmployeeQuery(params.id || '');
    const [editEmployee] = useEditEmployeeMutation();

    if (isLoading) {
        return <span>Загрузка</span>;
    }

    const handleEditUser = async (employee: Employee) => {
        try {
            const editedEmployee = {
                ...data,
                ...employee,
            };

            await editEmployee(editedEmployee).unwrap();
            navigate(`${Paths.status}/updated`);
        } catch (err) {
            const maybeError = isErrorWithMessage(err);

            if (maybeError) {
                setError(err.data.message);
            } else {
                setError('Неизвестная ошибка');
            }
        }
    };

    return (
        <Layout>
            <Row align="middle" justify="center">
                <EmployeeForm
                    title="Редактировать сотрудника"
                    btnText="Редактировать"
                    error={error}
                    employee={data}
                    onFinish={handleEditUser}
                />
            </Row>
        </Layout>
    );
};

export default EditEmployee;
