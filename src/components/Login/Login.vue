<template>
  <div>
      <b-container>
          <b-row class="justify-content-md-center mt-4">
              <b-col col md="8">
                  <b-card header="Login"
                  header-bg-variant="primary"
                  header-text-variant="white"
                  >
                  <b-card-text>
                        <b-form @submit="onSubmit">
                            <b-form-group
                            description="Enter username"
                            label="Username"
                            >
                            <b-form-input v-model="username" required></b-form-input>
                            </b-form-group>
                            <b-form-group
                            description="Enter password"
                            label="Password"
                            >
                            <b-form-input type="password" v-model="password" required></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-button type="submit" variant="outline-primary" :disabled="acceptableSubmission"> Login </b-button>
                            </b-form-group>
                        </b-form>
                    </b-card-text>
                  </b-card>
              </b-col>
          </b-row>
      </b-container>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'
import { watch } from '@vue/composition-api'
import gql from 'graphql-tag'

export default{
    
    data() {
        return {
            username: "",
            password: "",
            isLoggedIn: false
        }
    },
    methods: {
        async onSubmit(event) {
            event.preventDefault();
            
            const logInQuery = gql`
                query logIn($username: String!, $password: String!) {
                        logIn(username: $username, password: $password) {
                            isLoggedIn,
                            token
                        }
                    }
                `;
            
            let res = await this.$apollo.query({
                query: logInQuery,
                variables: {
                    username: this.username,
                    password: this.password
                }
            })
            if(!res.data.logIn) {
                alert("Server error")
            }
            if(!res.data.logIn.isLoggedIn) {
                alert("Wrong credentials")
            }
            if(res.data.logIn.isLoggedIn) {
                this.isLoggedIn = true;
                localStorage.setItem("token", res.data.logIn.token);
                this.$router.push({
                    name: "main"
                })
            }

        }
    },
    computed: {
        acceptableSubmission() {
            return this.username.length > 0 && this.password.length > 0 ? false : true;
        }
    }
}
</script>

<style scoped>

</style>
