import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const FileUplaod = () => {
  const classes = useStyles();
  const [videos, setVideos] = useState([]);
  const [jsonObjects, setJsonObjects] = useState([]);
  const [files, setFiles] = useState([]);
const [uploadedFiles, setUploadedFiles] = useState([]);
  
  const handleFileUpload = (event, setFile) => {
    setFile(event.target.files);
  };
const onSubmit = async (e) => {
  e.preventDefault()
  for (const file of files) {
    const uploadedFile = await uploadedFile(file);
    setUploadedFiles([...uploadedFiles, uploadedFile]);
  }
};

  return (
    <Grid container direction="column" alignItems="center">
      <Typography variant="h5">Upload Screen</Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <input
          accept="video/*"
          style={{ display: 'none' }}
          id="contained-button-file-video"
          multiple
          type="file"
          onChange={(event) => handleFileUpload(event, setVideos)}
        />
        <label htmlFor="contained-button-file-video">
          <Button onClick={onSubmit} variant="contained" color="primary" component="span">
            Upload Videos
          </Button>
        </label>
        <br />
        <input
          accept=".json"
          style={{ display: 'none' }}
          id="contained-button-file-json"
          multiple
          type="file"
          onChange={(event) => handleFileUpload(event, setJsonObjects)}
        />
        <label htmlFor="contained-button-file-json">
          <Button onClick={onSubmit} variant="contained" color="primary" component="span">
            Upload JSON Objects
          </Button>
        </label>
      </form>
    </Grid>
  );
};

export default FileUplaod;
