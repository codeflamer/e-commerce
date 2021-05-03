import React from 'react';
import {TextField,Grid} from '@material-ui/core';
import {Controller ,useFormContext} from 'react-hook-form';

const CustomTextField = ({name,required,label}) => {
    const {control} = useFormContext;
    return (
       <Grid item xs={12} sm={6}>
              <Controller
                name={name}
                control={control}
                fullWidth           
                render={({field}) => <TextField {...field} label={label} required fullWidth/>}
                />
       </Grid>
    )
}

export default CustomTextField
