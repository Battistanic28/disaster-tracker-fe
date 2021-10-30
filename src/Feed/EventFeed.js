import { React } from "react";
import { useEffect, useState, useContext } from "react";
import {useParams, useHistory} from "react-router-dom";
import NewsFeed from "../API/NewsFeed";
import UserPost from "./UserPost";
import PostForm from "./PostForm";
import Loader from "../Loader";
import UserContext from "../Auth/UserContext";
import "../Styles/EventFeed.css";


function EventFeed() {

    const {token} = useContext(UserContext);
    const {eventId} = useParams();
    const [newPost, setNewPost] = useState([])
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    function handleClick() {
        history.push(`/map`)
    }

    useEffect(() => {
        const getEvents = async () => {
          setLoading(true)
          const posts = await NewsFeed.getPostsByEventId(eventId);
          setPosts(posts)
          setLoading(false)
        }
        getEvents()
      }, [newPost, eventId])

      if (loading) {
          return (<Loader />)
      }

    return(
        <div className="event-feed">
            <h3>{eventId}: Community Updates</h3>
            {token && <PostForm setNewPost={setNewPost} eventId={eventId} />}
            {posts.length > 0 ? posts.map(post => (
                <UserPost post={post}></UserPost>
            )) : <p className="no-comments">Be the first to commment.</p>}
                <div className="btn-wrapper">
                    <a className="return-button" href="/map">Back to Map</a>    
                </div>
        </div>
    )

}

export default EventFeed;
