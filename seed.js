// seed.js
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(DB_PATH);

// Function to add sample users
const seedDatabase = () => {
    db.serialize(() => {
        // Insert sample users
        const users = [
            { email: 'karthik@example.com', password: 'karthik123' },
            { email: 'nani@example.com', password: 'nani1234' },
            { email: 'alice.jones@example.com', password: 'password3' },
            { email: 'bob.brown@example.com', password: 'password4' },
            { email: 'charlie.green@example.com', password: 'password5' }
        ];

        users.forEach(user => {
            bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) {
                    console.error('Failed to hash password:', err);
                } else {
                    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [user.email, hash], (err) => {
                        if (err) {
                            console.error('Failed to insert user:', err);
                        } else {
                            console.log(`User ${user.email} inserted`);
                        }
                    });
                }
            });
        });

        // Insert reviews for each brewery
        const breweryIds = [
            '5128df48-79fc-4f0f-8b52-d06be54d0cec',
            '9c5a66c8-cc13-416f-a5d9-0a769c87d318',
            '34e8c68b-6146-453f-a4b9-1f6cd99a5ada',
            'ef970757-fe42-416f-931d-722451f1f59c',
            '6d14b220-8926-4521-8d19-b98a2d6ec3db',
            'e2e78bd8-80ff-4a61-a65c-3bfbd9d76ce2',
            'e432899b-7f58-455f-9c7b-9a6e2130a1e0',
            '9f1852da-c312-42da-9a31-097bac81c4c0',
            'ea4f30c0-bce6-416b-8904-fab4055a7362',
            '1988eb86-f0a2-4674-ba04-02454efa0d31'
        ];

        const userNames = users.map(user => user.email);

        breweryIds.forEach(breweryId => {
            userNames.forEach(userName => {
                const rating = getRandomRating();
                const review = {
                    rating,
                    description: generateRandomReview(rating),
                    userName,
                    postId: breweryId
                };

                db.run('INSERT INTO reviews (rating, description, userName, postId) VALUES (?, ?, ?, ?)', [review.rating, review.description, review.userName, review.postId], (err) => {
                    if (err) {
                        console.error('Failed to insert review:', err);
                    } else {
                        console.log(`Review by ${review.userName} inserted for Brewery ${breweryId}`);
                    }
                });
            });
        });

        // Function to generate random ratings (example)
        function getRandomRating() {
            return parseFloat((Math.random() * (5 - 1) + 1).toFixed(1));
        }

        // Function to generate random review text based on rating
        function generateRandomReview(rating) {
            if (rating >= 4.5) {
                const positiveReviews = [
                    'Excellent beers and great service!',
                    'The atmosphere is fantastic. Highly recommend!',
                    'Good selection of beers. Enjoyed my visit.',
                    'Friendly staff and cozy ambiance.',
                    'Perfect place to hang out with friends.',
                    'Unique flavors and a delightful tasting experience.'
                ];
                return positiveReviews[Math.floor(Math.random() * positiveReviews.length)];
            } else if (rating >= 3.0 && rating < 4.5) {
                const neutralReviews = [
                    'Nice place, decent beers.',
                    'Could improve on the beer variety, but overall a pleasant experience.',
                    'The staff was knowledgeable and helpful.'
                ];
                return neutralReviews[Math.floor(Math.random() * neutralReviews.length)];
            } else {
                const negativeReviews = [
                    'Not impressed with the selection.',
                    'Service could be better.',
                    'Would not recommend.'
                ];
                return negativeReviews[Math.floor(Math.random() * negativeReviews.length)];
            }
        }

    });
};

// Run the seed function
seedDatabase();
