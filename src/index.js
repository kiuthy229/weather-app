import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Jobs from './Jobs.js';
import Mutation from './Mutation.js';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import FormikForm from './Form';
import { useParams } from 'react-router';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';


const client = new ApolloClient({
  uri: 'https://api.cartql.com/',
  cache: new InMemoryCache(),
});

// client.query({
//     query: gql`
//       query GetJobs {
//         jobs {
//           cities{
//             name
//           }
//         }
//       }
//     `,
//   }).then((result) => console.log(result));

function Page1() {
  return "home"
}

function Page2() {
  return <div>
          <div>products</div>
          <Outlet/>
        </div>
}

function Page3() {
  const [searchParams, setSearchParams] = useSearchParams()
  let countryName = searchParams.country || "Vietnam"
  return <div>
          <div>detail</div>
        </div>
}
function Page4() {
  return <div>
          <div>imgae</div>
        </div>
}

function PageVariable(){
  const paramValues= useParams()
  const pageName = paramValues.pageName
  const pageId = paramValues.pageId

  return <div>
          <h1>currentPage: {pageName}</h1>
          <h1>currentId: {pageId}</h1>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Page1/>}/>
      <Route path="/products" element={<Page2/>}>
        <Route path="detail" element={<Page3/>}/>
        <Route path="image" element={<Page4/>}/>
        <Route path=":pageName/:pageId" element={<PageVariable/>}/>
      </Route>
      
    </Routes>
  </BrowserRouter>
  //   <ApolloProvider client={client}>
  //   <FormikForm/>
  // </ApolloProvider>
);

reportWebVitals();
