import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './App.css';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

class App extends Component {

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onFinished = this.onFinished.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      isLoading: false,
      formData: "",
      result: "",
      status: 'ready',
      possible_ans: ['2 weeks', '3 days', 'kuay nai']
    };

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
        maxWidth: 752,
      },
      demo: {
        backgroundColor: theme.palette.background.paper,
      },
      title: {
        margin: theme.spacing(4, 0, 2),
      },
    }));
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    this.setState({
      formData: value
    });
  }

  handlePredictClick = (event) => {
    if (this.state.formData.length == 0) {
      alert('Please fill the search field')
    } else {
      const formData = this.state.formData;
      this.setState({ isLoading: true });
      this.onSearch();
      fetch('http://127.0.0.1:5000/prediction/',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(response => {
          this.onFinished()
          this.setState({
            result: response.result,
            isLoading: false
          });
        });
    }
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  onSearch() {
    this.setState({ status: "loading" })
  }

  onFinished() {
    this.setState({ status: "finished" })
  }

  onRefresh() {
    this.setState({
      isLoading: false,
      formData: "",
      result: "",
      status: 'ready',
      possible_ans: ['2 weeks', '3 days', 'kuay nai']
    })
  }

  renderList() {
    return (
      this.state.possible_ans.map((notes) => {
        return (
          <ListItem>
            <ListItemText
              primary={notes}
            />
          </ListItem>
        )
      })
    )
    // <List dense={dense}>
    //           {generate(
    //             <ListItem>
    //               <ListItemText
    //                 primary="Single-line item"
    //                 secondary={secondary ? 'Secondary text' : null}
    //               />
    //             </ListItem>,
    //           )}
    //         </List>

  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    if (this.state.status == "ready") {
      return (
        <div>
          <AppBar position='static' style={{ backgroundColor: '#374f63' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'center', height: '85px' }}>
              <Typography variant="h2"  >
                <Box fontWeight="fontWeightBold">
                  Covid-19 Q&A
              </Box>
              </Typography>
            </Toolbar>
          </AppBar>
          <Box style={{ backgroundColor: '#b1c6d9', display: 'flex', flexDirection: 'column' }} className='container'>
            <Typography variant="h4" style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
              <Box fontWeight="fontWeightBold">
                What are you looking for?
              </Box>
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
              <TextField
                variant='outlined'
                style={{ width: '500px', background: 'white' }}
                // inputProps={{ background: 'white' }}
                value={formData}
                onChange={this.handleChange}
                placeholder="Ask here"
              />
              <Button
                style={{ backgroundColor: '#4c92ca', color: '#b1c6d9' }}
                variant="contained"
                disabled={isLoading}
                onClick={!isLoading ? this.handlePredictClick : null}>
                <SearchIcon fontSize='large' />
              </Button>
            </div>
          </Box>
        </div>
      );
    } else if (this.state.status == 'loading') {
      return (
        <div>
          <AppBar position='static' style={{ backgroundColor: '#374f63' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'center', height: '85px' }}>
              <Typography variant="h2"  >
                <Box fontWeight="fontWeightBold">
                  Covid-19 Q&A
            </Box>
              </Typography>
            </Toolbar>
          </AppBar>
          <Box style={{ backgroundColor: '#b1c6d9', display: 'flex', flexDirection: 'column' }} className='container'>
            <Typography variant="h4" style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
              <Box fontWeight="fontWeightBold">
                {this.state.formData}
              </Box>
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
              <CircularProgress onClick={this.onFinished} />
            </div>
            <Typography variant="h6" style={{ marginTop: '100px', display: 'flex', justifyContent: 'center', color: '#262626' }}>
              Please wait ...
            </Typography>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center', color: '#262626' }}>
              Your question are being processed.
            </Typography>
          </Box>
        </div>
      )
    } else {
      return (
        <div>
          <AppBar position='static' style={{ backgroundColor: '#374f63' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'center', height: '85px' }}>
              <Typography variant="h2"  >
                <Box fontWeight="fontWeightBold">
                  Covid-19 Q&A
            </Box>
              </Typography>
            </Toolbar>
          </AppBar>
          <Box style={{ backgroundColor: '#b1c6d9', display: 'flex', flexDirection: 'column' }} className='container'>
            <Typography variant="h4" style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
              <Box fontWeight="fontWeightBold">
                {this.state.formData}
              </Box>
            </Typography>
            <Typography variant="h5" style={{ marginTop: '30px', marginLeft: '300px', display: 'flex', justifyContent: 'left' }}>
              <Box fontWeight="fontWeightBold">
                possible answers:
              </Box>
            </Typography>
            <div style={{ marginTop: '20px', marginRight: '300px', marginLeft: '300px', display: 'flex', justifyContent: 'center', backgroundColor: '#4c92ca', color: 'white' }}>
              <List>{this.renderList()}</List>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <Button style={{ backgroundColor: '#374f63', color: 'white' }}
                variant="contained" onClick={this.onRefresh}>
                Ask again?
              </Button>
            </div>
          </Box>
        </div >
      )
    }
  }
}

export default App;