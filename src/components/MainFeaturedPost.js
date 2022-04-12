import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
  } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    myClassName: {
      color: "#EFD26E",
      position: "relative",
      "&:hover": {
        color: "green",
        fontSize: 'large'
      }
    }
  }));

function MainFeaturedPost({post, mainPageIndex, setMainPageIndex, maxIndex}) {
  const classes = useStyles();

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Stack direction="row" spacing={2}>
                  <ArrowCircleLeftIcon onClick={() => setMainPageIndex(Math.max(mainPageIndex - 1, 0))} className={classes.myClassName}/>

                  <ArrowCircleRightIcon onClick={() => setMainPageIndex(Math.min(mainPageIndex + 1, maxIndex))} className={classes.myClassName}/>
            </Stack>
          </Box>
          
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;