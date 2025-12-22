import {
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTestString, resetTestString, appendTestString } from '../store/slices/testSlice';
import PageContainer from '../components/PageContainer';

const ReduxTestPage = () => {
  const dispatch = useAppDispatch();
  const testString = useAppSelector((state) => state.test.testString);
  const [inputValue, setInputValue] = useState('');

  const handleSetString = () => {
    dispatch(setTestString(inputValue));
    setInputValue('');
  };

  const handleReset = () => {
    dispatch(resetTestString());
  };

  const handleAppend = () => {
    dispatch(appendTestString(' ' + inputValue));
    setInputValue('');
  };

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Redux Toolkit Test
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Testing state management with Redux Toolkit
        </Typography>
      </Box>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Current String from Redux State:
        </Typography>
        <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
          <Typography variant="h6" color="primary">
            "{testString}"
          </Typography>
        </Paper>

        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Enter new string"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type something..."
          />

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" onClick={handleSetString} disabled={!inputValue}>
              Set String
            </Button>

            <Button variant="outlined" onClick={handleAppend} disabled={!inputValue}>
              Append to String
            </Button>

            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Reset to Default
            </Button>
          </Box>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, bgcolor: 'info.light' }}>
        <Typography variant="h6" gutterBottom>
          How it works:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Set String"
              secondary="Replaces the entire string with your input"
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Append to String"
              secondary="Adds your input to the end of the current string"
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Reset"
              secondary='Returns to the default value "Hello from Redux Toolkit!"'
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
          </ListItem>
        </List>
        <Typography variant="body2" sx={{ mt: 2, ml: 2 }}>
          <strong>Redux State:</strong> The string is stored in global Redux state and can be
          accessed from any component in the app.
        </Typography>
      </Paper>
    </PageContainer>
  );
};

export default ReduxTestPage;
