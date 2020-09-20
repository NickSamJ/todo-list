import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { firestore } from '../../firebase';


const BlogSinglePage = ({ match, history }) => {
    const [postInfo, setPostInfo] = useState({})
    const [postLoaded, setPostLoaded] = useState(false)
    const [categories, setCategpories] = useState({})


    const postId = match.params.id

    useEffect(() => {
        const fetchPost = async () => {
            const postRaw = await firestore.collection("posts").where('post_alias', "==", postId).get()
            let postData;
            postRaw.forEach(post => postData = post.data())
            if (postData) {
                const categories = await (await firestore.collection('categories').get()).docs.reduce((summ, cat) => {
                    summ[cat.id] = cat.data().title
                    return summ
                }, {})
                setCategpories(categories)
                document.title = postData.title
                setPostInfo(postData)
                setPostLoaded(true)
            }
            else {
                history.push('/page-not-found')
            }
        }
        fetchPost()

        return () => {

        }
    }, [])

    const postBody = <Container >
        <Row>
            <Col xs={{ offset: 0, span: 12 }}
                md={{ offset: 2, span: 8 }}
                xs={{ offset: 3, span: 6 }}
                style={{ marginTop: '4rem' }}
            >

                <h1>{postInfo.title}</h1>
                {postInfo.createdate
                    ? <i>{new Date(postInfo.createdate.seconds * 1000).toLocaleDateString()} </i>
                    : null}
                <small className="text-muted">Category: {categories[postInfo.category]}</small>

                <hr />
                <div dangerouslySetInnerHTML={{ __html: postInfo.body }}></div>
            </Col>
        </Row>
    </Container>

    return (
        <div>
            {postLoaded
                ? postBody
                : <Loader />
            }
        </div>
    )
};



export default BlogSinglePage;