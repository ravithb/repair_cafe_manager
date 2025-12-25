'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { Autocomplete, TextField, CircularProgress, Box, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { searchCustomers } from '@/actions/customers';
import debounce from 'lodash/debounce'; // Recommended: npm install lodash
import { Customer } from '@/app/types';

export default function CustomerSearchTypeahead({ onSelect, label, placeholder }: { onSelect: (c: Customer | null) => void , label:string, placeholder?:string }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Customer[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  // Debounce the server call to 300ms to prevent database flickering
  const fetchResults = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.length < 3) {
          setOptions([]);
          setLoading(false);
          return;
        }
        const results = await searchCustomers(query);
        setOptions(results);
        setLoading(false);
      }, 300),
    []
  );

  useEffect(() => {
    if (inputValue === '') {
      setOptions([]);
      return;
    }
    setLoading(true);
    fetchResults(inputValue);
  }, [inputValue, fetchResults]);

  return (
    <Autocomplete
      id="customer-search"
      size="small"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
      options={options}
      loading={loading}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, newValue) => onSelect(newValue)}
      // Standard MUI rendering for the search results
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} key={"ph-"+option.id}>
            <PhoneIcon fontSize="small" color="action" />
            <Typography variant="body1" fontWeight="bold" fontSize="small" >
              {option.phone}
            </Typography>
          </Box>
          <span className="flex flex-col" key={"sp-"+option.id}>
            <Box key={"nm-"+option.id}>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 4 }}>
              {option.title} {option.firstname} {option.lastname}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 4 }}>
              {option.email}
            </Typography>
            </Box>
          </span>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          placeholder={placeholder}
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}