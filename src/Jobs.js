
import { useQuery, gql } from '@apollo/client';
import './Jobs.css';

const GET_JOBS = gql`
  query GetJobs {
    jobs {
      id
      title
      cities{
        name
      }
      tags{
        name
      }
      remotes{
        name
      }
      locationNames
      company{
        name
      }
    }
  }
`;

const Jobs= () => {
   const { loading, error, data } = useQuery(GET_JOBS);
   if (loading) return <p>Loading...</p>;

   data.jobs.map((res)=>console.log(res.company.name))
 
   return (<div>
    {
      data.jobs.map((job)=>
      <div className='job-preview' key={job.id}>
        <div className='inner title'>{job.title}</div>
        <div className='inner city'>{job.cities.map((city)=><div>{city.name}</div>)}</div>
        <div className='inner tags'>{job.tags.map((tag)=><button>{tag.name}</button>)}</div>
        <div className='inner remote'>{job.remotes.map((remote)=><div>{remote.name}</div>)}</div>
        {/* <div className='inner location'>{job.locationNames}</div> */}
        <div className='inner company'>{job.company.name}</div>
      </div>)
    }
   </div>)
}
export default Jobs;