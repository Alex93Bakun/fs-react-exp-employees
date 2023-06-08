import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { Row } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Employee } from '@prisma/client';

import { Paths } from '../../paths';
import Layout from '../../components/layout';
import EmployeeForm from '../../components/employee-form';
import { selectUser } from '../../features/auth/authSlice';
import { useAddEmployeeMutation } from '../../app/services/employees';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

const AddEmployee = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [error, setError] = useState('');
    const [addEmployee] = useAddEmployeeMutation();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleAddEmployee = async (data: Employee) => {
        try {
            await addEmployee(data).unwrap();

            navigate(`${Paths.status}/created`);
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
                    onFinish={handleAddEmployee}
                    title="Добавить сутрудника"
                    btnText="Добавить"
                    error={error}
                />
            </Row>
        </Layout>
    );
};

export default AddEmployee;
