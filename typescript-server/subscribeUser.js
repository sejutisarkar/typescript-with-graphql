import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { userFragment } from "../../graphql/fragments/userFragments";

const createSubscriptionMutation = gql`
  mutation CreateSubscriptionMutation($source: String!, $cclast4:String!){
    createSubscription(source: $source, cclast4L :$cclast4){
      ...UserInfo
    }
  }
  ${userFragment}
`;
export  class SubscribeUser extends React.Component {

  // ...

  render() {
    return (
      <Mutation mutation={createSubscriptionMutation}>
      {(mutate) => (
        <StripeCheckout
          name="oojob"
          token={async token => {
            console.log(token);
            const response = await mutate({
              variables: {source: token.id, cclast4: token.card.last4}
            });
            console.log(response);
          }}
          stripeKey="pk_test_SUdk0u7C4HgYJvan3Y9xSQZv"
          amount={30000}
        />
      )}
      </Mutation>
    );
  }
}
