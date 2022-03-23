import axios from 'axios';
import Swal from 'sweetalert2';
import * as urls from './urls';
const axiosApi = axios.create({});
const SERVER_URL = 'http://localhost:4000/api';

axiosApi.defaults.baseURL = `${SERVER_URL}`;
axiosApi.defaults.timeout = 120000;
axiosApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token)
            config.headers['Authorization'] = `bearer ${token}`
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosApi.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        if (err && err.response && err.response.status && err.response.status === 403)
            localStorage.removeItem('token');
        // else if(err && err.response && err.response.status && err.response.status === 400) {
        //     Swal.fire(
        //         'Error',
        //         'Bad Request',
        //         'error'
        //     )
        // }
        // else if(err && err.response && err.response.status && err.response.status === 405) {
        //     Swal.fire(
        //         'Error',
        //         'This item cannot be deleted',
        //         'error'
        //     )
        // }
        // else {
            throw err;
        // }
    }
);

export const loginApi = async (body, cb) => {
    axiosApi.post(urls.LOGIN, body)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const addEmployeeApi = async (body, cb) => {
    axiosApi.post(urls.EMPLOYEE, body)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const getEmployeeApi = async (params, cb) => {
    axiosApi.get(urls.EMPLOYEE, {params})
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const updateEmployeeApi = async (_id, body, cb) => {
    axiosApi.put(`${urls.EMPLOYEE}/${_id}`, body)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const deleteEmployeeApi = async (_id, cb) => {
    axiosApi.delete(`${urls.EMPLOYEE}/${_id}`)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const getDashboardCountApi = async (cb) => {
    axiosApi.get(urls.DASHBOARD)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const getDepartmentApi = async (params, cb) => {
    axiosApi.get(urls.DEPARTMENT, { params })
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const deleteDepartmentApi = async (_id, cb) => {
    axiosApi.delete(`${urls.DEPARTMENT}/${_id}`)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const addDepartmentApi = async (body, cb) => {
    axiosApi.post(urls.DEPARTMENT, body)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const updateDepartmentApi = async (_id, body, cb) => {
    axiosApi.put(`${urls.DEPARTMENT}/${_id}`, body)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const addJobTitleApi = async (body, cb) => {
    axiosApi.post(urls.JOBTITLE, body)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const updateJobTitleApi = async (_id, body, cb) => {
    axiosApi.put(`${urls.JOBTITLE}/${_id}`, body)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const getJobTitleApi = async (params, cb) => {
    axiosApi.get(urls.JOBTITLE, { params })
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const deleteJobTitleApi = async (_id, cb) => {
    axiosApi.delete(`${urls.JOBTITLE}/${_id}`)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const getDepartmentListApi = async(cb) => {
    axiosApi.get(urls.DEPARTMENT_LIST)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const getJobTitleByDepartmentIdApi = async(_id, cb) => {
    axiosApi.get(`${urls.JOBTITLE}/department-id?departmentId=${_id}`)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const getAttendanceReportApi = async(cb) => {
    axiosApi.get(`${urls.ATTENDANCE_REPORT}`)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const checkIsCheckInApi = async(params, cb) => {
    axiosApi.get(`${urls.EMPLOYEE_ROUTES}/check-in-status`, { params })
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const checkInApi = async(body, cb) => {
    axiosApi.post(`${urls.EMPLOYEE_ROUTES}/check-in`, body)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const checkoutApi = async(_id, cb) => {
    axiosApi.put(`${urls.EMPLOYEE_ROUTES}/check-out/${_id}`)
    .then(res => cb(res))
    .catch(err => cb(err));
}

export const leaveApi = async(body, cb) => {
    axiosApi.post(`${urls.EMPLOYEE_ROUTES}/leave`, body)
    .then(res => cb(res))
    .catch(err => cb(err));
}

