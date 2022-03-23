import Swal from "sweetalert2";

export const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const checkStatus = (err) => {

    if (err && err.response && err.response.status && err.response.status === 400) {
        return Swal.fire(
            'Error',
            'Bad Request',
            'error'
        )
    }
    else if (err && err.response && err.response.status && err.response.status === 405) {
        return Swal.fire(
            'Error',
            'This item cannot be deleted',
            'error'
        )
    }
    else {
        return Swal.fire(
            'Error',
            'Something went wrong, Please try again later!',
            'error'
        )
    }
}