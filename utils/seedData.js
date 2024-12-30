// utils/seedData.js
const mongoose = require('mongoose')
const Fish = require('../models/fish')
const config = require('./config')

const initialFishes = [
  {
    name: 'Snapper',
    MaoriName: 'Tāmure',
    description: 'A popular coastal fish found throughout New Zealand waters. Known for its sweet, delicate flavor and firm white flesh. Excellent for pan-frying, grilling, or baking.',
    imageUrl: 'snapper.jpg'
  },
  {
    name: 'Blue Cod',
    MaoriName: 'Rāwaru',
    description: 'Bottom-dwelling fish found particularly around the South Island. Prized for its excellent white flesh thats moist and flaky when cooked.',
    imageUrl: 'bluecod.jpg'
  },
  {
    name: 'Kahawai',
    MaoriName: 'Kahawai',
    description: 'A strong-fighting fish thats excellent for smoking. Dark, firm flesh with a rich flavor. Popular among recreational fishers.',
    imageUrl: 'kahawai.jpg'
  },
  {
    name: 'Kingfish',
    MaoriName: 'Haku',
    description: 'A powerful game fish with firm, white flesh. Excellent for sashimi and grilling. Found in warmer waters around North Island.',
    imageUrl: 'kingfish.jpg'
  }
]

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URL)
    console.log('Connected to MongoDB')

    // Clear existing fish data
    await Fish.deleteMany({})
    console.log('Cleared existing fish data')

    // Insert new fish data
    const insertedFish = await Fish.insertMany(initialFishes)
    console.log('Database seeded successfully!')
    console.log(`Inserted ${insertedFish.length} fish species`)

    // Print the IDs of inserted fish (useful for testing)
    console.log('\nInserted fish IDs:')
    insertedFish.forEach(fish => {
      console.log(`${fish.name}: ${fish._id}`)
    })

    // Close the connection
    await mongoose.connection.close()
    console.log('\nDatabase connection closed')

  } catch (error) {
    console.error('Error seeding database:', error)
    await mongoose.connection.close()
    process.exit(1)
  }
}

// Run the seed function
seedDatabase()