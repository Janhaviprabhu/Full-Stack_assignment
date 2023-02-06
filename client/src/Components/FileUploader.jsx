import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <Input type="file" onChange={handleChange} />
      <Button variant="contained" color="primary">
        Upload
      </Button>
    </div>
  );
}

export default FileUpload;
