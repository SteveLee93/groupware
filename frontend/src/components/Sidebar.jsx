import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CalendarMonth as CalendarIcon,
  Description as DocumentIcon,
  Approval as ApprovalIcon,
  Mail as MailIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: '대시보드', icon: <DashboardIcon />, path: '/' },
  { text: '전자결재', icon: <ApprovalIcon />, path: '/approval' },
  { text: '일정관리', icon: <CalendarIcon />, path: '/calendar' },
  { text: '메일', icon: <MailIcon />, path: '/mail' },
  { text: '문서관리', icon: <DocumentIcon />, path: '/documents' },
  { text: '조직도', icon: <GroupIcon />, path: '/organization' },
];

function Sidebar() {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          mt: 8,
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}

export default Sidebar;
