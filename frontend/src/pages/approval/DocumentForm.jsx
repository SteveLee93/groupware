import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { createDocument } from '../../store/approvalSlice';

function DocumentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.approval);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'EXPENSE',  // 기본값
    approvers: []
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createDocument(formData)).unwrap();
      navigate('/approval');
    } catch (err) {
      // 에러는 Redux 상태에서 처리됨
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          결재 문서 작성
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>문서 종류</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <MenuItem value="EXPENSE">지출결의서</MenuItem>
              <MenuItem value="VACATION">휴가신청서</MenuItem>
              <MenuItem value="GENERAL">일반품의서</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            required
            label="제목"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="내용"
            name="content"
            value={formData.content}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/approval')}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? '제출 중...' : '제출'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default DocumentForm;
