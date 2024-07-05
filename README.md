# URL Management Server
This project is the backend server for a URL Shortener application built with Express.js. It handles the creation of shortened URLs, redirection to the original URLs, and fetching all stored URLs from the database.

# Features
* Create a shortened URL from a long URL
* Redirect to the original URL using the shortened URL
* Fetch all stored URLs
* Validate URLs before storing

# Technologies Used
* Express.js
* MongoDB
* Shortid
* Validator
* CORS
* Dotenv
# explanation of chosen data structure and approach to handling short URL uniqueness
For this URL Shortener project, i have chosen to use MongoDB as my data storage solution, and i employ a 'unique identifier' generation approach to ensure that each short URL is unique.
To ensure the uniqueness of each short URL, i use the 'shortid' library. The 'shortid' library generates a unique, non-sequential short ID for each URL. When a new URL is submitted for shortening, the server generates a short ID using 'shortid.generate()'. Before inserting the new document into the MongoDB collection, i ensure that the generated shortUrl does not already exist in the collection. This step is crucial to maintaining uniqueness. If a collision is detected a new short ID is generated, and the process is repeated until a unique ID is found.
I validate the original URL using the 'validator library' to ensure it is a properly formatted and valid URL before processing it. If an invalid URL is detected, an error message is returned to the user. If an invalid URL is detected, an error message is returned to the user.

By combining the 'shortid' and 'validator' library for unique ID with validate URL generation and MongoDB for storage, we achieve a reliable and efficient URL shortening service that guarantees the uniqueness of each shortened URL. That's why i am using this data structure and short URL uniqueness technique.

*** Backend code deploy on Vercel
