// import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';


// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://en.wikipedia.org/wiki/Munich#/media/File:Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 5, 12345 Some city',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://en.wikipedia.org/wiki/Munich#/media/File:Schloss_Nymphenburg_M%C3%BCnich.jpg',
//         address: 'Some address 10, 12345 Some city',
//         description: 'This is a second meetup!'
//     }
// ];

function HomePage(props) {
    // With getStaticProps, we no longer need states or useEffect!
    // const [loadedMeetups, setLoadedMeetups] = useState([]);

    // useEffect(() => {
    //     // send a http request and fetch data
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, [])

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content='Browse a huge list of hightly active React meetups!'/>
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}



// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     // fetch data from an API(or file system, or a database...)
    
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }

// Static Site Generation
export async function getStaticProps() {
    // fetch data from an API(or a database, or a filesystem...)
    
    // This would be a redundant thing to do:
    // fetch('/api/meetups');
    // becuase this function already runs during building process or server side
    // so the better alternative is to directly fetch the meetups
    // instead of sending the request:
    const client = await MongoClient.connect('mongodb+srv://fargol_sh:13799731_Fargol_Sh_Sec_.@cluster0.1xokuey.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();
      
    const meetupsCollections = db.collection('meetups');
    const meetups = await meetupsCollections.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        // props: {
        //     meetups: DUMMY_MEETUPS,
        // },
        revalidate: 1
    };
}

export default HomePage;