import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress, Chip } from "@material-ui/core";
import cblogo from "./cblogo.PNG";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Leaf from '@material-ui/icons/Spa';
import Healing from '@material-ui/icons/Healing';
import Nature from '@material-ui/icons/Nature';
import axios from "axios"; 

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "12px",
    padding: "12px 24px",
    color: "white",
    fontSize: "16px",
    fontWeight: 600,
    backgroundColor: '#e74c3c',
    '&:hover': {
      backgroundColor: '#c0392b',
    },
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    width: "-webkit-fill-available",
    borderRadius: "12px",
    padding: "12px 24px",
    color: "white",
    fontSize: "16px",
    fontWeight: 600,
    backgroundColor: '#27ae60',
    '&:hover': {
      backgroundColor: '#219653',
    },
    marginTop: theme.spacing(2),
  },
  root: {
    maxWidth: 500,
    flexGrow: 1,
  },
  media: {
    height: 300,
    backgroundSize: 'contain',
  },
  paper: {
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: 500,
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  },
  gridContainer: {
    justifyContent: "center",
    padding: "2em 1em",
  },
  mainContainer: {
    backgroundColor: '#f9f9f9',
    minHeight: "100vh",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 500,
    backgroundColor: 'white',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #e0e0e0',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  input: {
    display: 'none',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '16px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#2c3e50 !important',
    fontWeight: '600',
    padding: '8px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#7f8c8d !important',
    fontWeight: '500',
    padding: '8px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  buttonGrid: {
    maxWidth: "500px",
    width: "100%",
  },
  detail: {
    backgroundColor: '#f8f9fa',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  appbar: {
    background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    color: 'white'
  },
  loader: {
    color: '#27ae60 !important',
  },
  dropzone: {
    backgroundColor: '#f8f9fa !important',
    border: '2px dashed #bdc3c7 !important',
    borderRadius: '16px !important',
    minHeight: '200px !important',
    padding: '20px !important',
  },
  dropzoneText: {
    color: '#7f8c8d !important',
    fontSize: '16px !important',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  icon: {
    fontSize: '48px',
    color: '#27ae60',
  },
  title: {
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    color: '#7f8c8d',
    marginBottom: theme.spacing(3),
  },
  resultChip: {
    margin: theme.spacing(0.5),
    fontWeight: 600,
    backgroundColor: '#e8f5e9',
    color: '#27ae60',
  },
  confidenceMeter: {
    width: '100%',
    height: '8px',
    backgroundColor: '#ecf0f1',
    borderRadius: '4px',
    marginTop: theme.spacing(1),
    overflow: 'hidden',
  },
  confidenceBar: {
    height: '100%',
    backgroundColor: '#27ae60',
    borderRadius: '4px',
  },
}));

export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Nature style={{ marginRight: 16 }} />
          <Typography variant="h6" className={classes.title}>
            Potato Disease Detector
          </Typography>
          <div className={classes.grow} />
          {/* <Avatar src={cblogo}></Avatar> */}
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} md={8} lg={6}>
            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
              {image && (
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="img"
                    title="Potato Leaf Image"
                  />
                </CardActionArea>
              )}
              {!image && (
                <CardContent style={{ padding: 0 }}>
                  <div style={{ padding: 32, textAlign: 'center' }}>
                    <div className={classes.iconContainer}>
                      <Leaf className={classes.icon} />
                    </div>
                    <Typography variant="h5" className={classes.title}>
                      Potato Disease Classification
                    </Typography>
                    <Typography variant="body1" className={classes.subtitle}>
                      Upload an image of a potato leaf to detect diseases
                    </Typography>
                    <DropzoneArea
                      acceptedFiles={['image/*']}
                      dropzoneText={"Drag & drop a leaf image here or click to browse"}
                      onChange={onSelectFile}
                      filesLimit={1}
                      showPreviewsInDropzone={false}
                      showAlerts={false}
                      classes={{
                        root: classes.dropzone,
                        text: classes.dropzoneText
                      }}
                      Icon={CloudUpload}
                    />
                  </div>
                </CardContent>
              )}
              {data && (
                <CardContent className={classes.detail}>
                  <Typography variant="h6" gutterBottom style={{ fontWeight: 600 }}>
                    Analysis Results
                  </Typography>
                  <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} size="small">
                      <TableBody className={classes.tableBody}>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell1}>Condition:</TableCell>
                          <TableCell className={classes.tableCell}>
                            <Chip 
                              label={data.class} 
                              className={classes.resultChip} 
                              icon={data.class.includes('healthy') ? <Nature /> : <Healing />}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell1}>Confidence:</TableCell>
                          <TableCell className={classes.tableCell}>
                            {confidence}%
                            <div className={classes.confidenceMeter}>
                              <div 
                                className={classes.confidenceBar} 
                                style={{ width: `${confidence}%` }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button 
                    variant="contained" 
                    className={classes.clearButton} 
                    size="large" 
                    onClick={clearData} 
                    startIcon={<Clear />}
                    fullWidth
                  >
                    Analyze Another Leaf
                  </Button>
                </CardContent>
              )}
              {isLoading && (
                <CardContent className={classes.detail}>
                  <CircularProgress className={classes.loader} size={60} thickness={5} />
                  <Typography variant="h6" style={{ marginTop: 16, fontWeight: 600 }}>
                    Analyzing Leaf Image...
                  </Typography>
                  <Typography variant="body2" style={{ color: '#7f8c8d', marginTop: 8 }}>
                    Detecting potential diseases
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};