import React, {useState, useEffect, useRef  } from "react";
import { Grid, Button, Typography, TextField } from "@material-ui/core";
import isURL from 'validator/es/lib/isURL';
import "../../static/css/App.css"
import Link from '@mui/material/Link';

function App() {

  const [link, setLink] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [copyButton, setCopyButton] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const textRef = useRef(null);
  const return_url = "http://"+apiResponse;

  const validate = (value) => {
    setLink(value)
    if (isURL(value)) {
      setErrorMessage('')
      setError(false)
    } else {
      setErrorMessage('It is not a valid url.')
      setError(true)
    }
  }

  function shortenButtonPressed() {
    if (error==false) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          link: link,
        }),
      };
      fetch("/create", requestOptions)
      .then(response => response.text())
      .then(text => setApiResponse("www.longnt.tk/"+text))
      .then(setCopyButton(true))
      .catch((error) => {
        console.log(error);
      });
    }  
  }

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        shortenButtonPressed();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [link]);

  function copyToClipboard(e) {
    textRef.current.select();
    document.execCommand('copy');
    e.target.focus();
  };
  
  return (
    <div className="App" align="center">
      <Grid container spacing={4} align="center">
        <Grid item xs={12}>
          <Typography variant="h3" compact="h3">
            Longn't
          </Typography>
        </Grid>
        <Grid item xs={12}>
            <TextField
              label="Shorten your link"
              variant="outlined"
              name='link'
              id='link'
              helperText={errorMessage}
              error={error}
              style={{ width: "90%" }}
              value={link}
              onChange={e => validate(e.target.value)}
              ref={textRef} 
              multiline
              maxRows={1}
            />
        </Grid>
        <Grid item xs={12}>
              <Button style={{ width: "20%" }} 
              onClick={shortenButtonPressed} 
              color="primary" 
              id="shorten" 
              variant='contained' 
              size='large'>
                Shorten
              </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} align="center">
        <Grid item xs={9} style={{marginTop: 50}}>
          <Link href={return_url} color="inherit" variant="h6" compact="h6" underline="hover" style={{ width: "70%" }}>
            {apiResponse}
          </Link>
        </Grid>
        <Grid item xs={3} style={{marginTop: 45}}>
          {copyButton && <Button id="copy" size="large" color="primary" variant="outlined" onClick={copyToClipboard} style={{ width: "20%" }}>Copy</Button>}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

  
