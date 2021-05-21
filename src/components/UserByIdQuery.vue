<template>
  <ApolloQuery
    :query="require('@/graphql/userById.gql')"
    :variables="{ id }"
  >
    <template slot-scope="{ result: { data, loading, error } }">
             <div v-if="loading">Loading...</div>
             <div v-if="error">Error occured: {{ error }}</div>
             <div v-else> {{ data["userById"] }} </div>
        </template>
  </ApolloQuery>
</template>

<script>

export default {
    props: ['id']
}
</script>
