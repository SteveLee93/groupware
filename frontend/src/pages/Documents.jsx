import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Folder,
  Description,
  CreateNewFolder,
  Upload,
  Delete
} from '@mui/icons-material';
import { fetchDocuments, createFolder, uploadDocument } from '../store/documentsSlice';

function Documents() {
  const dispatch = useDispatch();
  const { documents, folders, currentFolder, loading } = useSelector((state) => state.documents);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    dispatch(fetchDocuments(currentFolder?.id));
  }, [dispatch, currentFolder]);

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      await dispatch(createFolder({
        name: newFolderName,
        parentId: currentFolder?.id
      }));
      setNewFolderName('');
      setIsNewFolderDialogOpen(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      dispatch(uploadDocument({
        folderId: currentFolder?.id,
        formData
      }));
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">
          {currentFolder ? currentFolder.name : '문서 관리'}
        </Typography>
        <Box>
          <Button
            startIcon={<CreateNewFolder />}
            onClick={() => setIsNewFolderDialogOpen(true)}
            sx={{ mr: 1 }}
          >
            새 폴더
          </Button>
          <Button
            component="label"
            startIcon={<Upload />}
          >
            파일 업로드
            <input
              type="file"
              hidden
              onChange={handleFileUpload}
            />
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <List>
              {folders.map((folder) => (
                <ListItem
                  key={folder.id}
                  button
                  onClick={() => dispatch(setCurrentFolder(folder))}
                >
                  <ListItemIcon>
                    <Folder />
                  </ListItemIcon>
                  <ListItemText primary={folder.name} />
                </ListItem>
              ))}
              {documents.map((doc) => (
                <ListItem
                  key={doc.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.name}
                    secondary={`${doc.size} • ${new Date(doc.createdAt).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={isNewFolderDialogOpen}
        onClose={() => setIsNewFolderDialogOpen(false)}
      >
        <DialogTitle>새 폴더 만들기</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="폴더 이름"
            fullWidth
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNewFolderDialogOpen(false)}>취소</Button>
          <Button onClick={handleCreateFolder}>만들기</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Documents;
