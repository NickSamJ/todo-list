import React, {useState} from 'react';
import { firestore } from '../../firebase';
import { useEffect } from 'react';
import {Row, Col, Card, CardColumns, Container} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'
import Loader from '../../components/Loader';
import BlogSinglePage from './BlogSinglePage';

const Blog = ({history, blogAlias}) => {
    const [postsLoaded, setPostsLoaded] = useState(false)
    const [posts, setPosts] = useState([])
    const [categories, setCategpories] = useState({})

    useEffect(() => {
        document.title = 'Blog'
        const fetchPosts= async () => {
            const categories = await (await firestore.collection('categories').get()).docs.reduce((summ, cat) => {
                summ[cat.id] = cat.data().title
                return summ
            }, {})
            setCategpories(categories)
            const posts = await firestore.collection('posts').get()

            setPosts(posts.docs.map(post => {
                return { ...post.data(), id: post.id }
            }))
            setPostsLoaded(true)
        }

        fetchPosts()
    }, [])

    const postsList = <>
       { posts.map((post) => {
           return   <Card
                        // bg={variant.toLowerCase()}
                        key={post.title}
                        >

                        {/*Here should be section with the image like  this:
                            <Card.Img variant="top" src="holder.js/100px160" />*/ }

                        <Card.Body>
                            <Card.Title><Link to={`/${blogAlias}/${post.post_alias}`}>{post.title}</Link> </Card.Title>
                            <div className="card-text">
                                <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                            </div>
                            <Card.Text>
                                <small className="text-muted">Category: {categories[post.category]}</small>
                            </Card.Text>
                        </Card.Body>
                        </Card>
       })}
    </>
    return (
        <Container style={{paddingTop: '4rem'}}>

            <h1>The blog page</h1>
            
            { postsLoaded 
                ? <CardColumns> {postsList}</CardColumns>
                : <Loader/>}

        </Container>
    )
};

export default withRouter(Blog);