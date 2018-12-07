<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

    * Sessions are leveraged to persist data across requests. The Hyper Text Tranfer Protocal does not contain any state by out the box - it's stateless. Sessions provide us the ability to affix state to HTTP. This is accomplished by leveraging a session ID and tieing it to the cookie info of an individual user. 
   
2. What does bcrypt do to help us store passwords in a secure manner.

    * Bcrypt is a library that enables us to store a password securely. In short, Bcrypt hashes a user's password as well as validates the newly hashed password.
    
3. What does bcrypt do to slow down attackers?

    * Bcrypt leverages an algorithim that hashes a random or dev-defined salt string, hashes the variable a server defined number of rounds. To crack this, thanks to the brcrypt rounds, will take a very long time. Thus, making gaining unauthorized access, exceeding timely and unattactive. 
   
4. What are the three parts of the JSON Web Token?

    * 1. The Header: Consists of token type
    * 2. The Payload: The payload will carry the bulk of our JWT, also called the JWT Claims. This is where we will put the information that we want to transmit and other information about our token. There are multiple claims that we can provide. This includes registered claim names, public claim names, and private claim names.

        https://scotch.io/tutorials/the-anatomy-of-a-json-web-token
    * 3. The Signature: Is made up of the Header, Payload and Secret. The secret is the signature held by the server. This is the way that our server will be able to verify existing tokens and sign new ones.
      

