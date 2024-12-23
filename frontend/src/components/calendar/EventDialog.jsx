import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function EventDialog({ open, onClose, event, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: new Date(),
    end: new Date(),
    type: 'MEETING',
    location: ''
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    }
  }, [event]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {event ? '일정 수정' : '새 일정 추가'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="제목"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="설명"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="시작 시간"
              value={formData.start}
              onChange={(newValue) => setFormData({ ...formData, start: newValue })}
            />
            <DateTimePicker
              label="종료 시간"
              value={formData.end}
              onChange={(newValue) => setFormData({ ...formData, end: newValue })}
            />
          </LocalizationProvider>

          <FormControl fullWidth>
            <InputLabel>일정 유형</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <MenuItem value="MEETING">회의</MenuItem>
              <MenuItem value="TASK">업무</MenuItem>
              <MenuItem value="EVENT">행사</MenuItem>
              <MenuItem value="OTHER">기타</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="장소"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit} variant="contained">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventDialog;
