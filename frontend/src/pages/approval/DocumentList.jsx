import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { fetchPendingDocuments } from '../../store/approvalSlice';

function DocumentList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pendingDocuments, loading } = useSelector((state) => state.approval);

  useEffect(() => {
    dispatch(fetchPendingDocuments());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'APPROVED': return 'success';
      case 'REJECTED': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">결재 문서 목록</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/approval/new')}
        >
          새 문서 작성
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>문서번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>종류</TableCell>
              <TableCell>작성자</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>액션</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.id}</TableCell>
                <TableCell>{doc.title}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.author}</TableCell>
                <TableCell>{new Date(doc.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={doc.status}
                    color={getStatusColor(doc.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => navigate(`/approval/${doc.id}`)}
                  >
                    상세보기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DocumentList;
