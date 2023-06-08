import React from 'react';

import { Card, Form, Space } from 'antd';

import { Employee } from '@prisma/client';

import CustomInput from '../custom-input';
import ErrorMessage from '../error-message';
import CustomButton from './../custom-button/index';

type Props<T> = {
    onFinish: (value: T) => void;
    btnText: string;
    title: string;
    error?: string;
    employee?: T;
};

const EmployeeForm = ({ onFinish, btnText, title, error, employee }: Props<Employee>) => {
    return (
        <Card title={title} style={{ width: '30rem' }}>
            <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
                <CustomInput type="text" name="firstName" placeholder="Имя" />
                <CustomInput name="lastName" placeholder="Фамилия" />
                <CustomInput type="number" name="age" placeholder="Возраст" />
                <CustomInput name="address" placeholder="Адрес" />
                <Space direction="vertical" size="large">
                    <ErrorMessage message={error} />
                    <CustomButton htmlType="submit">{btnText}</CustomButton>
                </Space>
            </Form>
        </Card>
    );
};

export default EmployeeForm;
