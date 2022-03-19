import { FormControl, Typography } from '@mui/material';

const InputWrapper = ({ error, children }) => {
    return (
        <FormControl variant="standard" sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            {children}
            {error && <Typography sx={{ fontSize: '12px', marginBottom: 0, marginTop: 1, color: "#e55353" }} className='error'>{error}</Typography>}
        </FormControl>
    );
};

export default InputWrapper;