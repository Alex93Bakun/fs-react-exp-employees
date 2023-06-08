import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Row, Space, Typography } from 'antd';

import { User } from '@prisma/client';

import { Paths } from '../../paths';
import Layout from '../../components/layout';
import CustomInput from '../../components/custom-input';
import CustomButton from '../../components/custom-button';
import ErrorMessage from '../../components/error-message';
import { selectUser } from '../../features/auth/authSlice';
import PasswordInput from '../../components/password-input';
import { useRegisterMutation } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

type RegisterData = Omit<User, 'id'> & { confirmPassword: string };

const Register: React.FC = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [error, setError] = useState('');
    const [registerUser] = useRegisterMutation();

    const register = async (data: RegisterData) => {
        try {
            await registerUser(data).unwrap();

            navigate('/');
        } catch (err) {
            const mayBeError = isErrorWithMessage(err);

            if (mayBeError) {
                setError(err.data.message);
            } else {
                setError('Неизвестная ошибка');
            }
        }
    };

    return (
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Зарегистрируйтесь" style={{ width: '30rem' }}>
                    <Form onFinish={register}>
                        <CustomInput name="name" placeholder="Имя" />
                        <CustomInput type="email" name="email" placeholder="Email" />
                        <PasswordInput name="password" placeholder="Пароль" />
                        <PasswordInput name="confirmPassword" placeholder="Повторите пароль" />
                        <CustomButton type="primary" htmlType="submit">
                            Зарегистрироваться
                        </CustomButton>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            Уже есть аккаунт? <Link to={Paths.login}>Войдите</Link>
                        </Typography.Text>
                        <ErrorMessage message={error} />
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};

export default Register;
