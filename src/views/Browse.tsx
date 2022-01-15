import { Grid } from "../components/Structure";
import VideoCard from "../components/VideoCard";
import img1 from "../assets/imgs/(1).jpg";
import img2 from "../assets/imgs/(2).jpg";
import img3 from "../assets/imgs/(3).jpg";
import img4 from "../assets/imgs/(4).jpg";
import img5 from "../assets/imgs/(5).jpg";
import img6 from "../assets/imgs/(6).jpg";
import img7 from "../assets/imgs/(7).jpg";


const thumbs = [
img1,
img2,
img3,
img4,
img5,
img6,
img7,
]

const Browse = () => {
    return (
        <Grid maxColumns={6} itemMaxWidth="350px" gap="0.6rem">
            {thumbs.map(i => (
                <VideoCard
                    video={{thumbSrc: i, title: "Video Title", views: "1.2M", channel: "Channel Name", durationSecs: 101, isLive: false}}
                    cardFlow="column"
                />
                )
            )}
        </Grid>
    );
}

export default Browse;