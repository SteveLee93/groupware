import { Grid, Paper, Typography, Box } from '@mui/material';

function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        대시보드
      </Typography>

      <Grid container spacing={3}>
        {/* 결재 대기 문서 */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography variant="h6" gutterBottom>
              결재 대기 문서
            </Typography>
            {/* 결재 대기 문서 목록 컴포넌트 */}
          </Paper>
        </Grid>

        {/* 오늘의 일정 */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography variant="h6" gutterBottom>
              오늘의 일정
            </Typography>
            {/* 일정 목록 컴포넌트 */}
          </Paper>
        </Grid>

        {/* 공지사항 */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography variant="h6" gutterBottom>
              공지사항
            </Typography>
            {/* 공지사항 목록 컴포넌트 */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
