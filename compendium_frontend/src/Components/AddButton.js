import { useState } from 'react'
import { Fab, Box, Dialog, DialogTitle, DialogContent, 
  DialogActions, Button, TextField, Select, InputLabel,
  MenuItem, Chip, OutlinedInput } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'


const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

  // todo: get tags in code, way to add tags
  const tags = ['test',
    'test2',
    'test3',
  ];



function AddButton() {
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const addItem = () => {

    setOpen(false);
  }


  return (
    <>
    {/* handle the popup add menu here */}
    {/* <Box sx={{bgcolor: 'primary.main'}} hidden>
      test input maybe?? (how to do popover?)
    </Box> */}
    <Dialog
      fullWidth="lg"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Add Compendium item!</DialogTitle>
      <DialogContent>
      <br/>
        <TextField id="src" label="Source Link" required fullWidth />
        <TextField id="img" label="Image Link" fullWidth sx={{my: 2}}></TextField>
        <TextField id="title" label="Title" fullWidth></TextField>
        <InputLabel id="tags-label">Tags</InputLabel>
        <Select
          labelId="tags-label"
          id="tags-selected"
          multiple
          // TODO: fix tags here
          value={tags}
          MenuProps={MenuProps}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <TextField id="new-tag" label="Add New Tag" sx={{mx:3}}></TextField>
      
      </DialogContent>
      <DialogActions>
        {/* TODO */}
        <Button onClick={addItem}>Add Item</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>

    </Dialog>

    <Box position="absolute" bottom="15px" right="15px" sx={{position: 'fixed'}}>
      <Fab size="large" color="primary" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
    </Box>

    </>    
  );
}

export default AddButton;