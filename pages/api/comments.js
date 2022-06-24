
import {GraphQLClient, gql} from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function asynchandler(req, res) { 
  
  const key=process.env.GRAPHCMS_TOKEN;

  const graphQLClient=new GraphQLClient( (graphqlAPI),{
    headers:{
      authorization:`Bearer ${key}`
    }
  });
  const query = gql` 
  mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
    createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
  }
`;

try {
  const result=await graphQLClient.request(query,req.body);
  return res.status(200).send(result);  
} catch (error) {
  console.log(error);
  return res.status(500).send(error);
}

 

}
