import React, { useState, useEffect } from 'react' 
import { Container, Paper, Grow, Grid, AppBar, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'


import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import useStyles from './styles'
import Pagination from '../Pagination/Pagination'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null)
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
  


    const handleKeyPress = (e) => {
      if(e.keyCode === 13) {
        searchPost()
      }
    }

    const handleAdd = (tag) => setTags([...tags, tag])
    
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

    const searchPost = () => {
      if(search.trim() || tags) {
        console.log(search, tags)
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        dispatch(getPostsBySearch({search, tags: tags.join(',')}))

      } else {
        history.push('/')
      }
    }

  return (
    <Grow in>
      <Container maxWidth='xl' >
        <Grid className={classes.gridContainer} container  justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            <AppBar className={classes.appBarSearch} position="static" color="inherit" >
              <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value) } onKeyPress={handleKeyPress} />
              <ChipInput style={{margin: '10px 0'}} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined" />
              <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained" >Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
        </Container>
      </Grow>
  )
}

export default Home