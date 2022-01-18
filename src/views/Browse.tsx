import { Grid } from '../components/Structure'
import VideoCard from '../components/VideoCard'
import img1 from '../assets/imgs/(1).jpg'
import img2 from '../assets/imgs/(2).jpg'
import img3 from '../assets/imgs/(3).jpg'
import img4 from '../assets/imgs/(4).jpg'
import img5 from '../assets/imgs/(5).jpg'
import img6 from '../assets/imgs/(6).jpg'
import img7 from '../assets/imgs/(7).jpg'
import img8 from '../assets/imgs/(8).jpg'

const thumbs = [img1, img2, img3, img4, img5, img6, img7, img8]
// const thumbs = [img7, img7, img7, img7, img7, img7, img7]
// const thumbs = [img8, img8, img8, img8, img8, img8, img8]

const randomName = (): string => {
    const names = [
        '10 hour meme song loop',
        'Amogus night 3am SUS challenge. OMG!!! Pranking ghost in the after life. Family vlogs video insert text 1 inster line five.',
    ]
    return names[Math.floor(Math.random() * names.length)]
}

const Browse = ({cardFlow = 'row'}: any) => {
    return (
        <Grid maxColumns={10} itemBaseWidth='350px' gap='0.2rem'>
            {thumbs.map((i,j) => (
                <VideoCard
                    key={j}
                    video={{
                        thumbSrc: i,
                        title: randomName(),
                        views: '1.2M',
                        channel: randomName(),
                        durationSecs: 101,
                        isLive: false,
                    }}
                    cardFlow={cardFlow}
                />
            ))}
        </Grid>
    )
}

export default Browse
