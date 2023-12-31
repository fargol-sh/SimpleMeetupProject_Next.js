// our-domain.com/new-meetup
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    try {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
              'Content-Type': 'application/json'
            }
        });
      
        const data = await response.json();
      
        console.log(data);
      
        router.push('/');
    } catch(error) {
        console.log(error);
    }
  }

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta 
          name='description'
          content='Add your own meetups and create amazing networking opportunities!'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;