import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
    const navigate=useNavigate()
    const initialValues = {
        name: '',
        email: '',
        mobile: '',
        employment_type: '',
        heavy_machinery: false,
        experience: '',
        gender: '',
        attendance_present: true,
        resting_bool: false,
        resting_until: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters long')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        mobile: Yup.string()
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
            .required('Mobile number is required'),
        employment_type: Yup.string()
            .oneOf(['FULL_TIME', 'PART_TIME', 'CONTRACT'], 'Invalid employment type')
            .required('Employment type is required'),
        heavy_machinery: Yup.boolean().required('This field is required'),
        experience: Yup.number()
            .min(0, 'Experience cannot be negative')
            .required('Experience is required'),
        gender: Yup.string()
            .oneOf(['MALE', 'FEMALE', 'OTHER'], 'Invalid gender')
            .required('Gender is required'),
        resting_until: Yup.date()
            .nullable()
            .when('resting_bool', {
                is: true,
                then: Yup.date().required('Resting until date is required when resting'),
            }),
    });

    const onSubmit = (values) => {
        alert("Submitted")
        navigate("/admin")
    };

    return (
        <div className="mb-10 max-md:mt-5 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Employee Form</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <Field type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <Field type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                        <Field type="text" id="mobile" name="mobile" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700">Employment Type</label>
                        <Field as="select" id="employment_type" name="employment_type" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="">Select Employment Type</option>
                            <option value="FULL_TIME">Manager</option>
                            <option value="PART_TIME">Supervisor</option>
                            <option value="CONTRACT">Driver</option>
                            <option value="CONTRACT">Crew</option>
                            <option value="CONTRACT">Security</option>
                        </Field>
                        <ErrorMessage name="employment_type" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="form-group">
                        <div className="flex items-center">
                            <Field type="checkbox" id="heavy_machinery" name="heavy_machinery" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                            <label htmlFor="heavy_machinery" className="ml-2 block text-sm font-medium text-gray-700">Operates Heavy Machinery</label>
                        </div>
                        <ErrorMessage name="heavy_machinery" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience (Years)</label>
                        <Field type="number" id="experience" name="experience" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <ErrorMessage name="experience" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                        <Field as="select" id="gender" name="gender" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </Field>
                        <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                  

                    <button type="submit" className="w-full py-2 px-4 bg-[#5522d0] text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};

export default EmployeeForm;
