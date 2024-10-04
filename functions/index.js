// const { onRequest } = require('firebase-functions/v2/https')
// const admin = require('firebase-admin')
// const cors = require('cors')({ origin: true })

// admin.initializeApp()

// exports.getAllBooksAPI = onRequest((req, res) => {
//   cors(req, res, async () => {
//     try {
//       // Get all the books from the Firestore collection
//       const booksCollection = admin.firestore().collection('books')
//       const snapshot = await booksCollection.get()

//       // Map through the documents and prepare JSON data
//       const books = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }))

//       // Send the books data as JSON
//       res.status(200).json(books)
//     } catch (error) {
//       console.error('Error fetching books:', error.message)
//       res.status(500).json({ error: 'Failed to retrieve books' })
//     }
//   })
// })

// above code is for api to get book

const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

// Function to capitalize the first letter of every word
function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

// Cloud Function to capitalize book data
exports.capitalizeBookData = functions.firestore
  .document('books/{bookId}')
  .onCreate((snap, context) => {
    const data = snap.data()

    // Capitalize relevant fields
    const capitalizedData = {
      isbn: data.isbn,
      name: capitalizeWords(data.name)
    }

    // Update the Firestore document with capitalized data
    return snap.ref.set(capitalizedData, { merge: true })
  })
